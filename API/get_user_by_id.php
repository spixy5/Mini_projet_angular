<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$userId =$_GET['id'];
if (!$userId ) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid user ID"
    ]);
    exit();
}

$sql = "SELECT * FROM users WHERE id = $userId";
$result = $conn->query($sql);
if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "user" => $user
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Utilisateur non trouvé"
    ]);
}

$conn->close();
?>
