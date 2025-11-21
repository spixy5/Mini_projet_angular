<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db_connection.php';
$data = json_decode(file_get_contents("php://input"), true);
$user_id=$data['user_id'];
$comment_id=$data['comment_id'];
if (!$user_id || !$comment_id) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid input"
    ]);
    exit();
}
$liked=false;
$check_sql = "SELECT * FROM likes WHERE user_id=$user_id AND comment_id=$comment_id";
$check_result=mysqli_query($conn, $check_sql);
if ($check_result && mysqli_num_rows($check_result)==0) {
     mysqli_query($conn, "INSERT INTO likes (user_id, comment_id) VALUES ($user_id, $comment_id)");
    $liked = true;
    mysqli_query($conn, "UPDATE museum_comments SET like_count=like_count+1 WHERE id = $comment_id");
} else {
    mysqli_query($conn, "DELETE FROM likes WHERE user_id = $user_id AND comment_id = $comment_id");
    $liked=false;
    mysqli_query($conn, "UPDATE museum_comments SET like_count=like_count-1 WHERE id=$comment_id"); 
}
$count_sql = "SELECT like_count FROM museum_comments WHERE id = $comment_id";
$count_result = mysqli_query($conn, $count_sql);
$like_count = 0;
if ($count_result) {
    $row = mysqli_fetch_assoc($count_result);
    $like_count=$row['like_count'];
}
echo json_encode([
    "success" => true,
    "liked" => $liked,
    "like_count" => $like_count
]);

mysqli_close($conn);
?>
