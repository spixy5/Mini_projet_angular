<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$data = json_decode(file_get_contents('php://input'), true);
$username = isset($data['username']) ? $data['username'] : '';
$password = isset($data['password']) ? $data['password'] : '';
$sql = "SELECT id, name, password_hash, role FROM users WHERE name='$username'";
$result = mysqli_query($conn, $sql);
if (!$result || mysqli_num_rows($result)==0) {
    echo json_encode([
        "success" => false,
        "message" => "admin non trouvé"
    ]);
    exit();
}

$user = mysqli_fetch_assoc($result);

if (!password_verify($password, $user['password_hash'])) {
    echo json_encode([
        "success" => false,
        "message" => "Mot de passe incorrect"
    ]);
    exit();
}

if ($user['role']!='admin') {
    echo json_encode([
        "success" => false,
        "message" => "Accès refusé"
    ]);
    exit();
}

$update = "UPDATE users SET last_login = NOW() WHERE id = {$user['id']}";
mysqli_query($conn, $update);

echo json_encode([
    "success" => true,
    "user" => [
        "id" => $user['id'],
        "name" => $user['name'],
        "role" => $user['role'],
    ]
]);

mysqli_close($conn);
?>
