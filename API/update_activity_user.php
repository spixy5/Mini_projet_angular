<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data['id']) ? (int)$data['id'] : 0;

if ($id > 0) {
    $update = "UPDATE users SET activity_count = activity_count + 1 WHERE id = $id";
    $res = mysqli_query($conn, $update);

    if ($res) {
        echo json_encode([
            "success" => true,
            "message" => "Activity count updated"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Update failed: " . mysqli_error($conn)
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid user ID"
    ]);
}

mysqli_close($conn);
?>
