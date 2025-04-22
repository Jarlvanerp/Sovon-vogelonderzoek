<?php
$dbhost = "localhost";
$dbname = $_SERVER['DB_NAME'];
$dbuser = $_SERVER['DB_USER'];
$dbpass = $_SERVER['DB_PASS'];

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

$test_result = $mysqli->query("SELECT * from birdhouse_test");
$birdhouse_result = $mysqli->query("SELECT * from birdhouses");

?>

