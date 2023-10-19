<?php
require_once "database.php";
if (isset($_POST["query"])) {
    $query = $_POST['query'];
    if ($query == "getTable") {
        $sql = "SELECT orders.id, orders.state, orders.price, orders.deliveryMode, address.fullName,  address.phone, address.email, address.address FROM orders INNER JOIN address ON address.id = orders.id";

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
    } else if ($query == "deleteOrder" && isset($_POST["id"])) {
        $id = $_POST["id"];
        $sql = "DELETE FROM orders WHERE id = $id";

        if ($conn->query($sql) === TRUE) {
            echo "true";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
        $sql = "DELETE FROM orderedItems WHERE orderId = $id";

        if ($conn->query($sql) === TRUE) {
            echo "true";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
    } else if ($query == "viewOrder" && isset($_POST["id"])) {
        $id = $_POST["id"];
        $sql = "SELECT orders.id, orders.state, orders.price, orders.deliveryMode, address.fullName, address.phone, address.email, address.address, product.name, product.subtitle, product.price, orderedItems.amount FROM orders INNER JOIN address ON address.id = orders.id INNER JOIN orderedItems ON orderedItems.orderId = orders.id INNER JOIN product ON product.id = orderedItems.productId WHERE orders.id like $id";
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
}

?>