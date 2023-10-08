<?php
session_start();
$_SESSION["isLogined"] = false;
$_SESSION["username"] = "";
header('Location: http://webshop10.nhely.hu/');

?>