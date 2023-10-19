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

    $sql = "INSERT INTO service (name, phone, email, problem, state)
            VALUES ('$name', '$phone', '$email', '$problem', 0)";

    if ($conn->query($sql) === TRUE) {
        echo "true";
    } else {
        echo "false";
    }
}
if (isset($_POST["getMessages"])) {
    $sql = "SELECT * FROM service";

    $stmt = $conn->prepare($sql);

    $stmt->execute();
    $result = $stmt->get_result();

    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}
if (isset($_POST["deleteMessage"])) {
    $item_id = $_POST["deleteMessage"];

    $sql = "DELETE FROM service WHERE id = $item_id";

    if ($conn->query($sql) === TRUE) {
        echo "true";
    } else {
        echo "Error deleting record: " . $conn->error;
    }
}
if (isset($_POST["getMessagesID"])) {
    $azonosito = $_POST["getMessagesID"];
    $sql = "SELECT * FROM service where id like '$azonosito'";

    $stmt = $conn->prepare($sql);

    $stmt->execute();
    $result = $stmt->get_result();

    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

?>