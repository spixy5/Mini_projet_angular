<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$data = json_decode(file_get_contents("php://input"), true);
$museum_id = $data['museum_id'];
$author_name = $data['author_name'];
$author_email = $data['author_email'];
$message = isset($data['message']) ? mysqli_real_escape_string($conn, $data['message']) : '';
if (!$museum_id || !$author_name || !$message) {
    echo json_encode([
        "success" => false,
        "message" => "Veuillez écrire un commentaire avant de publier."
    ]);
    exit();
}

$sql = "INSERT INTO museum_comments (museum_id, author_name, author_email, message, created_at)
        VALUES ($museum_id, '$author_name', '$author_email', '$message', NOW())";
if (mysqli_query($conn, $sql)) {
    $last_id = mysqli_insert_id($conn);
    $result = mysqli_query($conn, "SELECT * FROM museum_comments WHERE id = $last_id");
    $row = mysqli_fetch_assoc($result);

    echo json_encode([
        "success" => true,
        "comment" => $row
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Échec de l'insertion du commentaire: " . mysqli_error($conn)
    ]);
}

mysqli_close($conn);
?>
