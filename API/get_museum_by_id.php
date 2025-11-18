<?php
// get_museum_by_id.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db_connection.php';
if (isset($_GET['id'])) {
        $id = mysqli_real_escape_string($conn, $_GET['id']);
        $sql = "SELECT * FROM museums WHERE id = '$id'";
        $result = mysqli_query($conn, $sql);
        if (!$result) {
            echo json_encode(["error" => "Query failed: " . mysqli_error($conn)]);
            exit();
        }   
        if (mysqli_num_rows($result) > 0) {
            $museum = mysqli_fetch_assoc($result);
            echo json_encode($museum);
        } else {
            echo json_encode(["error" => "Museum not found"]);
        }
    } else {
        echo json_encode(["error" => "ID parameter is required"]);
    }


mysqli_close($conn);
?>