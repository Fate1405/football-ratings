<?php

$q = $_REQUEST["q"];

$servername = "localhost";
$username = "fate1405";
$password = ")qvIfQ(z1u?l";
$dbname = "worms";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "fail";
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE player_ratings SET  ";



?>