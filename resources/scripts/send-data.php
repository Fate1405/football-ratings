<?php

$q = $_REQUEST["q"];

$data = explode("_", $q);

$servername = "localhost";
$username = "fate1405";
$password = ")qvIfQ(z1u?l";
$dbname = "worms";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "fail";
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE player_ratings SET {$data[4]} = {$data[0]}, Appearances = {$data[2]} WHERE Player = {$data[5]}";
$conn->query($sql);

$sql = "UPDATE player_ratings SET {$data[4]} = {$data[1]}, Appearances = {$data[3]} WHERE Player = {$data[6]}";
$conn->query($sql);

?>