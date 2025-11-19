<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? null;
if (!$email) {
    echo json_encode([
        "success" => false,
        "message" => "Adresse e-mail requise."
       
    ]);
    exit;
}
function generateConfirmationCode($length = 6) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $code = '';
    for ($i = 0; $i < $length; $i++) {
        $code .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $code;
}
    $confirmationCode = generateConfirmationCode();
    $subject = "Code de confirmation pour votre compte";
    $message = "Bonjour $email,\n\n";
    $message .= "Voici votre code de confirmation pour réinitialiser votre mot de passe : " . $confirmationCode . "\n\n";
    $message .= "Ce code est valide pendant 15 minutes.\n\n";
    $message .= "Si vous n'avez pas demandé cette action, ignorez cet e-mail.\n\n";
    $message .= "Merci,\nL'équipe Musées de Tunisie";
    $headers = "From: no-reply@Artvia.tn\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
if (@mail($email, $subject, $message, $headers)) {
    echo json_encode([
        "success" => true,
        "message" => "Le code de confirmation a été envoyé.",
        "code" => $confirmationCode
    ]);
} else {
    echo json_encode([
        "success" => true,
        "message" => "Erreur lors de l'envoi de l'e-mail.",
        "code" => $confirmationCode
    ]);
}

?>
