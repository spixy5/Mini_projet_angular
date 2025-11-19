<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['name'], $data['photo'], $data['description'], $data['is_open'], 
          $data['entry_price'], $data['location'], $data['category'], 
          $data['opening_hour'], $data['closing_hour'], $data['created_at'])
) {
    $sql = "INSERT INTO museums 
        (name, photo, description, is_open, entry_price, location, created_at, category, opening_hour, closing_hour)
        VALUES 
        ('{$data['name']}', '{$data['photo']}', '{$data['description']}', {$data['is_open']}, {$data['entry_price']}, '{$data['location']}',{$data['created_at']}, '{$data['category']}', '{$data['opening_hour']}', '{$data['closing_hour']}')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode([
            "success" => true,
            "message" => "Museum added successfully",
            "id" => mysqli_insert_id($conn)
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Insertion failed: " . mysqli_error($conn)
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
}

mysqli_close($conn);
?>
