<?php
include("dbconnect.php");

// EXAMPLE
echo "<table border='1' cell-padding='2'>";
echo "<tr>";
echo " <th>id</th>";
echo " <th>house number</th>";
echo " <th>species</th>";
echo " <th>status</th>";
echo " <th>week number</th>";
echo " <th>date observed</th>";
echo " <th>occupied</th>";
echo "</tr>";
foreach ($birdhouse_result as $row) {
    echo "<tr>";
    echo " <td>" . $row['id'] . "</td>";
    echo " <td>" . $row['house_number'] . "</td>";
    echo " <td>" . $row['species'] . "</td>";
    echo " <td>" . $row['status'] . "</td>";
    echo " <td>" . $row['week_number'] . "</td>";
    echo " <td>" . $row['date_observed'] . "</td>";
    echo " <td>" . $row['occupied'] . "</td>";
    echo "</tr>";
}
echo "</table>";
?>
