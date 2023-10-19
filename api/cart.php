<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["setAmount"]) && isset($_POST["id"])) {
        handleSetAmount($_POST["setAmount"], $_POST["id"]);
    } else if (isset($_POST["getAmount"])) {
        handleGetAmount();
    } else if (isset($_POST["Reset"])) {
        handleReset();
    } else if (isset($_POST["getItems"])) {
        handleGetItems();
    } else if (isset($_POST["removeItem"])) {
        removeItem($_POST["removeItem"]);
    }
}

function handleSetAmount($amount, $id)
{
    $items = isset($_SESSION["cartItems"]) ? $_SESSION["cartItems"] : array();
    array_push($items, $id);
    $_SESSION["cartItems"] = $items;
    $_SESSION["cartAmount"] = $amount;
    echo "true";
}

function handleGetAmount()
{
    echo isset($_SESSION["cartAmount"]) ? $_SESSION["cartAmount"] : 0;
}

function handleReset()
{
    $_SESSION["cartAmount"] = 0;
    $_SESSION["cartItems"] = array();
    echo "true";
}

function handleGetItems()
{
    header('Content-Type: application/json; charset=utf-8');

    if (!isset($_SESSION["cartItems"]) || !is_array($_SESSION["cartItems"])) {
        $_SESSION["cartItems"] = array();
    }
    $json = json_encode($_SESSION["cartItems"]);
    header('Content-Type: application/json; charset=utf-8');
    echo $json;
}
function removeItem($id)
{
    if (isset($_SESSION["cartItems"])) {
        $key = array_search($id, $_SESSION["cartItems"]);
        if ($key !== false) {
            unset($_SESSION["cartItems"][$key]);
            $_SESSION["cartItems"] = array_values($_SESSION["cartItems"]); // Re-index the array
            $_SESSION["cartAmount"]--;
        }
    }
}

?>