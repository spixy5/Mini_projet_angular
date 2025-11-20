<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
$museumId = isset($_GET['museumId']) ? intval($_GET['museumId']) : 0;
if ($museumId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid museum ID"
    ]);
    exit();
}
$sql = "SELECT id, museum_id, author_name, author_email, comment, created_at, like_count FROM museum_comments WHERE museum_id = $museumId ORDER BY created_at DESC";
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Query failed: " . mysqli_error($conn)
    ]);
    exit();
}
$comments = [];
while ($row = mysqli_fetch_assoc($result)) {
    $comments[] = $row;
}
echo json_encode([
    "success" => true,
    "comments" => $comments
]);

mysqli_close($conn);
?>
