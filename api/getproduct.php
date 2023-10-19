<?php
require_once "database.php";
if (isset($_POST["categoryId"])) {
    $id = $_POST["categoryId"];
    $sql = "SELECT product.name, product.subtitle, product.imgPath, product.price, product.id, categories.name as categoryName FROM product INNER JOIN categories ON product.categoryId = categories.id WHERE categories.id like $id";

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
if (isset($_POST["id"])) {
    $id = $_POST["id"];
    $sql = "SELECT * FROM product WHERE id like $id";

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