<?php
include("dbconnect.php");

// takes raw data from the request 
$json = file_get_contents('php://input');
// Converts it into a PHP object 
echo 'the json: '.$json;
$data = json_decode($json, true);

$house_number = $data['house_number'] ?? '';
$species = $data['species'] ?? '';
$status = json_encode($data['status']) ?? '';
$week_number = $data['week_number'] ?? '';
$date_observed = $data['date_observed'] ?? '';
$occupied = $data['occupied'] ?? '';

// $insert_into_birdhouse_test = "INSERT INTO birdhouse_test(house_number, species, status, week_number, date_observed, occupied)
//     VALUES ('$house_number', '$species', '$status', '$week_number', '$date_observed', '$occupied')";
    
$insert_into_birdhouse = "INSERT INTO birdhouses(house_number, species, status, week_number, date_observed, occupied)
    VALUES ('$house_number', '$species', '$status', '$week_number', '$date_observed', '$occupied')";

// insert into the database
$resp = $mysqli->query($insert_into_birdhouse);
// $resp = $mysqli->query($insert_into_birdhouse_test);


// Notify
if ($resp === TRUE) {
  echo json_encode(['message' => 'New record created successfully']);
} else {
  echo json_encode(['error' => 'Error: <br>' . $mysqli->error]);
}

?>