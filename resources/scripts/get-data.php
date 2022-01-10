<?php

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "fate1405";
$password = ")qvIfQ(z1u?l";
$dbname = "worms";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "fail";
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM player_ratings";

if ($result = $conn->query($sql)) {

    $emparray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }

    echo json_encode($emparray);

  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

$mysqli -> close();
?>