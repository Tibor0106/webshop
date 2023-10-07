<?php

$servername = "localhost";
$username = "webshop10";
$password = "tibor@200616";
$dbname = "webshop10";


$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");


if ($conn->connect_error) {
    die("Hiba a kapcsolódás során: " . $conn->connect_error);
}


// database: lxMjfYHYkRhvmoB

//ftp: DG8NheAeVm3Ve7T