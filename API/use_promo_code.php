<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db_connection.php';
$data = json_decode(file_get_contents('php://input'), true);
$code = $data['code'] ?? null;
if (empty($code)) {
    echo json_encode([
        "success" => false,
        "message" => "Code promo requis."
    ]);
    exit;
}
$sql = "UPDATE promo_codes SET used = 1 WHERE code = '$code'";
if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "success" => true,
        "message" => "Code promo marqué comme utilisé."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la mise à jour du code promo."
    ]);
}

$conn->close();
?>
