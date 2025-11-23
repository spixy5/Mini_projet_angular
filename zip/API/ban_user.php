<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$data = json_decode(file_get_contents('php://input'), true);
$userId =$data['id'];
if (!$userId) {
    echo json_encode(["success" => false, "message" => "ID utilisateur invalide"]);
    exit();
}
$userResult = mysqli_query($conn, "SELECT email, name FROM users WHERE id = $userId");
$user = mysqli_fetch_assoc($userResult);
$userEmail = $user['email'] ?? null;
$userName = $user['name'] ?? "Utilisateur";
$update = mysqli_query($conn,"UPDATE users SET banned = 1 WHERE id = $userId");
if ($update) {
    if ($userEmail) {
        $subject = "Compte banni - Musées de Tunisie";
        $headers = "From: no-reply@Artevia.com\r\n";
        $headers .= "Reply-To: no-reply@Artevia.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $message = "Bonjour $userName,\n\n";
        $message .= "Votre compte a été banni. Vous ne pouvez plus accéder à ce compte.\n\n";
        $message .= "Musées de Tunisie";

        @mail($userEmail, $subject, $message, $headers);
    }

    echo json_encode(["success" => true, "banned" => 1]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de la mise à jour"]);
}

$conn->close();
?>

