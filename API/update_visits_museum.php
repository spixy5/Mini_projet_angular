<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$data=file_get_contents('php://input');
$id = intval($data); 
if ($id > 0) {
    $sql = "UPDATE museums SET visits = visits + 1 WHERE id = $id";
    $res = mysqli_query($conn, $sql);

    if ($res) {
        echo json_encode([
            "success" => true,
            "message" => "Visits incremented successfully",
            "museum_id" => $id
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Update failed: " . mysqli_error($conn)
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid museum ID"]);
}

mysqli_close($conn);
?>
