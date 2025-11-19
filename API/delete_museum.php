<?php
// delete_museum.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'db_connection.php';
if (isset($_GET['id'])) {
    $id=$_GET['id'];
    $checkSql = "SELECT * FROM museums WHERE id='$id'";
    $checkResult = mysqli_query($conn, $checkSql);
    if (mysqli_num_rows($checkResult)==0) {
        echo json_encode(["success" => false, "message" => "Query failed:".mysqli_error($conn)]);
        exit();
    }
    if (mysqli_num_rows($checkResult)>0) {
        $deleteSql="DELETE FROM museums WHERE id = '$id'";
        $deleteResult = mysqli_query($conn, $deleteSql);
        if ($deleteResult) {
            echo json_encode(["success" => true, "message" => "Museum deleted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Deletion failed: " . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Museum not found"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID parameter is required"]);
}

mysqli_close($conn);
?>
