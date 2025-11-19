<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? null;
$newPassword = $data['newPassword'] ?? null;
if (!$newPassword) {
    echo json_encode([
        "success" => false,
        "message" => "mot de passe requis."
    ]);
    exit;
}

$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
$sql = "UPDATE users SET password_hash = '$hashedPassword' WHERE email = '$email'";
if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "success" => true,
        "message" => "Mot de passe mis à jour avec succès."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la mise à jour du mot de passe."
    ]);
}

$conn->close();
?>
