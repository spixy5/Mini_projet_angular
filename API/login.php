<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = isset($data['email']) ? $data['email'] : '';
$password = isset($data['password']) ? $data['password'] : '';
$sql = "SELECT id, name, email, password_hash FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $sql);
if (!$result || mysqli_num_rows($result) == 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email non trouvé"
    ]);
    exit();
}
$user = mysqli_fetch_assoc($result);
if (password_verify($password, $user['password_hash'])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email']
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Mot de passe incorrect"
    ]);
}
mysqli_close($conn);
?>

