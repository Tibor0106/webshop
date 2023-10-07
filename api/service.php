<?php
require_once "database.php";

if (
    isset($_POST["name"]) && isset($_POST["phone"])
    && isset($_POST["email"]) && isset($_POST["problem"])
) {
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $problem = $_POST["problem"];

    $sql = "INSERT INTO service (name, phone, email, problem)
            VALUES ('$name', '$phone', '$email', '$problem')";

    if ($conn->query($sql) === TRUE) {
        echo "true";
    } else {
        echo "false";
    }
}

?>