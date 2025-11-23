<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$sql = "SELECT * FROM museums";
$result = mysqli_query($conn, $sql);
if (!$result) {
    echo json_encode(["error" => "Query failed: " . mysqli_error($conn)]);
    exit();
}
$num_rows = mysqli_num_rows($result);
if ($num_rows > 0) {
    $museums = [];
    while($row = mysqli_fetch_assoc($result)) {
        $museums[] = $row;
    }
    echo json_encode($museums);
} else {
    echo json_encode([]);
}
mysqli_close($conn);
?>