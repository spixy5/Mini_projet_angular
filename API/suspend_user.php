<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['id'];
if (!$userId) {
    echo json_encode(["success" => false, "message" => "ID utilisateur invalide"]);
    exit();
}
$sql = "SELECT suspension, banned, email, name FROM users WHERE id = $userId";
$result = mysqli_query($conn, $sql);
if (!$result || $result->num_rows==0) {
    echo json_encode(["success" => false, "message" => "Utilisateur non trouvé"]);
    exit();
}

$user = mysqli_fetch_assoc($result);
$suspension = intval($user['suspension']);
$banned = intval($user['banned']);
$userEmail = $user['email'] ?? null;
$userName = $user['name'] ?? "Utilisateur";
$suspension += 1;
if ($suspension >= 3) {
    $banned = 1;
}
$update = mysqli_query($conn, "UPDATE users SET suspension = $suspension, banned = $banned WHERE id = $userId");

if ($update) {
    if ($banned === 1 && $userEmail) {
        $subject = "Compte banni - Musées de Tunisie";
        $headers = "From: no-reply@museumtunisie.com\r\n";
        $headers .= "Reply-To: no-reply@museumtunisie.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $message = "Bonjour $userName,\n\n";
        $message .= "Votre compte a été banni suite à plusieurs suspensions. Vous ne pouvez plus accéder à ce compte.\n\n";
        $message .= "Musées de Tunisie";
        @mail($userEmail, $subject, $message, $headers);
    }

    echo json_encode([
        "success" => true,
        "suspension" => $suspension,
        "banned" => $banned
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de la mise à jour"]);
}

$conn->close();
?>
