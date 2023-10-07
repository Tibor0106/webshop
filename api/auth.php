<?php
if (isset($_POST["auth"])) {
    if ($_POST["auth"] == "isLogined") {
        echo isLogined();
    } else if ($_POST["auth"] == "login") {
        if (isset($_POST["username"]) && isset($_POST["password"])) {
            login();
        } else {
            echo "api error!";
        }
    }
}
function isLogined()
{
    session_start();
    return (isset($_SESSION["isLogined"]) && $_SESSION["isLogined"] == true);
}
function login()
{
    require_once "database.php";
    $username = $_POST['username'];
    $password = $_POST['password'];


    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            echo "true";
            session_start();
            $_SESSION["isLogined"] = true;
            $_SESSION["username"] = $username;

        } else {
            echo "false";
        }
    } else {
        echo "false";
    }
}

?>