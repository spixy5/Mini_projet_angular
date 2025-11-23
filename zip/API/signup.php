<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
include 'db_connection.php';
$data = json_decode(file_get_contents("php://input"), true);
$name = isset($data['name']) ? mysqli_real_escape_string($conn, $data['name']) : '';
$email = isset($data['email']) ? mysqli_real_escape_string($conn, $data['email']) : '';
$password = isset($data['password']) ? $data['password'] : '';
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Veuillez remplir tous les champs"
    ]);
    exit();
}
$check = mysqli_query($conn, "SELECT id FROM users WHERE email='$email'");
if (mysqli_num_rows($check) > 0) {
    echo json_encode(["success" => false, "message" => "Email déjà utilisé"]);
    exit();
}
$hashed = password_hash($password, PASSWORD_DEFAULT);
$req="INSERT INTO users (name, email, password_hash) VALUES ('$name', '$email', '$hashed')";
 $insert = mysqli_query($conn, $req);
if ($insert) {
    $user_id = mysqli_insert_id($conn);
    echo json_encode([
        "success" => true,
        "message" => "Compte créé avec succès",
        "user" => [
            "id" => $user_id,
            "name" => $name,
            "email" => $email
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de la création du compte"] );
}
mysqli_close($conn);
?>
