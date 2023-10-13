<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  // Retrieve the selected values from the form
  $careerFilterValue = $_GET['career-filter'] ?? '';
  $facultyFilterValue = $_GET['faculty-filter'] ?? '';

  // Store results or necessary data in a session (or another mechanism).
  session_start();
  $_SESSION['careerFilterValue'] = $careerFilterValue;

  $_SESSION['facultyFilterValue'] = $facultyFilterValue;

  // Redirect back to index.php (or another page) to display results.
  header("Location: index.php?career-filter=$careerFilterValue&faculty-filter=$facultyFilterValue");
  exit;
}
