<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$sql = "SELECT * FROM users";
$result = $conn->query($sql);
$users = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode([
        "success" => true,
        "users" => $users
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Aucun utilisateur trouvé"
    ]);
}

$conn->close();
?>