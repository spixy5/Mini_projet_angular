<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db_connection.php';

$sql = "SELECT * FROM tickets";
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Database query failed: " . mysqli_error($conn)
    ]);
    mysqli_close($conn);
    exit;
}

$tickets = [];
while ($row = mysqli_fetch_assoc($result)) {
    $tickets[] = $row; 
}

echo json_encode([
    "success" => true,
    "tickets" => $tickets
]);

mysqli_close($conn);
?>
