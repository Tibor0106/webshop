<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    require_once "database.php";

    $name = $_POST["name"];
    $subtitle = $_POST["subtitle"];
    $price = $_POST["price"];
    $catergoryId = $_POST["categoryId"];
    $filename = $_POST["filename"];


    $uploadDirectory = "../products/";

    if (!file_exists($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }


    $fileExtension = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
    $uniqueFilename = '' . $filename . '.' . $fileExtension;

    $targetFile = $uploadDirectory . $uniqueFilename;

    if (strlen($uniqueFilename) > 255) {
        $uniqueFilename = substr($uniqueFilename, 0, 255);
    }

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $sql = "INSERT INTO product (categoryId, name, subtitle, imgPath, price)
            VALUES ($catergoryId,'$name','$subtitle','$uniqueFilename', $price)";

        if ($conn->query($sql) === TRUE) {
            echo "true";
        } else {
            echo "false";
        }

    } else {
        echo "false";
    }
} else {
    echo "Invalid request.";
}
?>