<?php
require_once "database.php";
require_once "cart.php";
$fullname = $_POST["fullname"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$address = $_POST["address"];
$deliverMode = $_POST["deliveryMode"];
$price = $_POST["price"];

session_start();

$sql = "INSERT INTO address (fullName, phone, email, address) VALUES ('$fullname', $phone, '$email', '$address')";

if ($conn->query($sql) === TRUE) {
    $last_insert_id = $conn->insert_id;
    $oreserId = $last_insert_id;
    $sql = "INSERT INTO orders (addressId, state, price, deliveryMode) VALUES ('$last_insert_id', 'active', $price, '$deliverMode')";

    if ($conn->query($sql) === TRUE) {
        $last_insert_id = $conn->insert_id;
        $id = $last_insert_id;
        foreach ($_SESSION["cartItems"] as $item) {

            $sql = "INSERT INTO orderedItems (orderId, productId, amount) VALUES ('$id','$item','1')";
            if ($conn->query($sql) === TRUE) {
                $last_insert_id = $conn->insert_id;
                session_start();
                $_SESSION["cartAmount"] = 0;
                $_SESSION["cartItems"] = array();

            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
                echo false;
            }

        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
        echo false;
    }
    echo $oreserId;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
    echo false;
}