<?php

function activeOrders()
{
    require_once "database.php"; // Assumed to contain the database connection logic


    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT COUNT(id) as amount FROM `orders`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo $row["amount"];
        }
    } else {
        echo "0";
    }

}

function serviceMessages()
{
    require_once "database.php";


    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT COUNT(id) as amount FROM `service`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo $row["amount"];
        }
    } else {
        echo "0";
    }


}

function income()
{
    // TODO: Implement income function
}

function allProduct()
{
    require_once "database.php"; // Assumed to contain the database connection logic


    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT COUNT(id) as amount FROM `product`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo $row["amount"];
        }
    } else {
        echo "0";
    }
}

if (isset($_POST["query"])) {
    if ($_POST['query'] == "activeOrders") {
        activeOrders();
    } else if ($_POST['query'] == "serviceMessages") {
        serviceMessages();
    } else if ($_POST['query'] == "income") {
        income();
    } else if ($_POST['query'] == "allProduct") {
        allProduct();
    }
}

?>