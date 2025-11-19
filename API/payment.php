<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'] ?? null;
$user_email = $data['email'] ?? null;
$museum_id = $data['museum_id'] ?? null;
$museumName = $data['museumName'] ?? null;
$totalAmount = $data['totalAmount'] ?? null;
$numberOfTickets = $data['numberOfTickets'] ?? null;
$visitDate = $data['visitDate'] ?? null;
$ticketType = $data['ticketType'] ?? null;
$promoCode = $data['promoCode'] ?? null;
if (empty($user_id) || empty($user_email) || empty($museum_id) || empty($museumName) || empty($totalAmount) || empty($numberOfTickets) || empty($visitDate) || empty($ticketType)) {
    echo json_encode([
        "success" => false,
        "message" => "Tous les champs obligatoires doivent être remplis."
    ]);
    exit;
}

$sql = "INSERT INTO tickets 
        (user_id, museum_id, museum_name, user_email, totalAmount, numberOfTickets, visit_date, ticket_type, promo_code)
        VALUES
        ('$user_id', '$museum_id', '$museumName', '$user_email', '$totalAmount', '$numberOfTickets', '$visitDate', '$ticketType', '$promoCode')";

if (mysqli_query($conn, $sql)) {

    $subject = "Confirmation de votre réservation - Musée de Tunisie";
    $headers = "From: no-reply@museumtunisie.com\r\n";
    $headers .= "Reply-To: no-reply@museumtunisie.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message = "Bonjour $user_email,\n\n";
    $message .= "Merci pour votre réservation. Voici le récapitulatif de votre billet :\n";
    $message .= "Musée : $museumName\n";
    $message .= "Date de visite : $visitDate\n";
    $message .= "Type de billet : $ticketType\n";
    $message .= "Nombre de billets : $numberOfTickets\n";
    $message .= "Code promo : " . ($promoCode ?: "Aucun") . "\n";
    $message .= "Montant total : $totalAmount DT\n\n";
    $message .= "Nous vous remercions pour votre confiance.\nMusées de Tunisie";

    if (@mail($user_email, $subject, $message, $headers)) {
        echo json_encode([
            "success" => true,
            "message" => "Ticket créé et email envoyé."
        ]);
    } else {
        echo json_encode([
            "success" => true,
            "message" => "Ticket créé, mais l'email n'a pas pu être envoyé."
        ]);
    }

} else {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la création du ticket."
    ]);
}

$conn->close();
?>

