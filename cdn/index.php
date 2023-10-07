<?php
if (!isset($_GET["path"])) {
    echo "Error while getting image path!";
} else {
    $path = $_GET["path"];
    echo '<script>window.location.href = "http://webshop10.nhely.hu/' . $path . '";</script>';
}
?>