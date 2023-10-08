<?php
require_once "database.php";

if (isset($_POST["link"]) && $_POST["link"] === "insertCategory") {
    if (isset($_POST['name']) && isset($_POST['svg'])) {
        $name = $conn->real_escape_string($_POST['name']);
        $svg = $conn->real_escape_string($_POST['svg']);

        $sql = "INSERT INTO categories (name, icon) VALUES ('$name', '$svg')";

        if ($conn->query($sql) === TRUE) {
            echo "true";
        } else {
            echo "false";
        }
    } else {
        echo "false";
    }
}


?>