<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "No payload received"]);
    exit;
}
if (
    isset($data['id'], $data['name'], $data['photo'], $data['description'], $data['is_open'], 
          $data['entry_price'], $data['location'], $data['category'], 
          $data['opening_hour'], $data['closing_hour'], $data['created_at'])
) {
  
$name = addslashes($data['name']);
$photo = $data['photo'];
$description = addslashes($data['description']);
$is_open = $data['is_open'];
$entry_price = $data['entry_price'];
$location = addslashes($data['location']);
$created_at = $data['created_at'];
$category = $data['category'];
$opening_hour = $data['opening_hour'];
$closing_hour = $data['closing_hour'];
$id = $data['id'];
$sql = "UPDATE museums SET 
        name = '$name',
        photo = '$photo',
        description = '$description',
        is_open = $is_open,
        entry_price = $entry_price,
        location = '$location',
        created_at = '$created_at',
        category = '$category',
        opening_hour = '$opening_hour',
        closing_hour = '$closing_hour'
        WHERE id = $id";
       $res= mysqli_query($conn, $sql);

    if ($res) {
        echo json_encode([
            "success" => true,
            "message" => "Museum updated successfully",
            "museum" => [ "id" => $data['id'],
    "name" => $name,
    "photo" => $photo,
    "description" => $description,
    "is_open" => $is_open,
    "entry_price" => $entry_price,
    "location" => $location,
    "created_at" => $created_at,
    "category" => $category,
    "opening_hour" => $opening_hour,
    "closing_hour" => $closing_hour]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Update failed: " . mysqli_error($conn)
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
}

mysqli_close($conn);
?>
