<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$sql = "SELECT id, code, percentage, used FROM promo_codes";
$result = mysqli_query($conn, $sql);
if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la récupération des codes promo"
    ]);
    exit();
}
$promoCodes = [];
while ($row = mysqli_fetch_assoc($result)) {
    $promoCodes[] = $row;
}

echo json_encode([
    "success" => true,
    "promoCodes" => $promoCodes
]);

mysqli_close($conn);
?>
