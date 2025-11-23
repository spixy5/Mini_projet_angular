<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db_connection.php';

$userEmail = $_GET['userEmail'];

if (!$userEmail) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid user email"
    ]);
    exit();
}

$sql = "SELECT * FROM museum_comments WHERE author_email='$userEmail'";

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
    unset($row['museum_name']);  
    $comments[] = $row;
}

echo json_encode([
    "success" => true,
    "comments" => $comments,
]);

mysqli_close($conn);
?>

