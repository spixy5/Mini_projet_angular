<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$data = json_decode(file_get_contents("php://input"), true);
$museum_id=$data['museum_id'];
$author_name=$data['author_name'];
$author_email=$data['author_email'];
$comment = isset($data['comment']) ? mysqli_real_escape_string($conn, $data['comment']) : '';
if (!$museum_id || !$author_name || !$comment) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid input"
    ]);
    exit();
}
$sql = "INSERT INTO museum_comments (museum_id, author_name, author_email, comment, created_at)
        VALUES ($museum_id, '$author_name', '$author_email', '$comment', NOW())";
if (mysqli_query($conn, $sql)) {
    $id = mysqli_insert_id($conn); 
    echo json_encode([
        "success" => true,
        "comment" => [
            "id" => $id,
            "museum_id" => $museum_id,
            "author_name" => $author_name,
            "author_email" => $author_email,
            "comment" => $comment,
            "created_at" => date("Y-m-d H:i:s")
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to insert comment: " . mysqli_error($conn)
    ]);
}
mysqli_close($conn);
?>
