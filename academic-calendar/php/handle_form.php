<?php

require_once 'fetch.php';  // Include your fetch function

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  $careerFilterValue = $_GET['career-filter'] ?? '';
  $facultyFilterValue = $_GET['faculty-filter'] ?? '';

  $queries = 'careerCode=' . urlencode($careerFilterValue) . '&facultyCode=' . urlencode($facultyFilterValue);

  try {
    // Call the fetch function
    $response = fetch('programs', $queries);
    echo json_encode(['success' => true, 'data' => json_decode($response)]);
  } catch (Exception $e) {
    http_response_code(500);  // Internal server error
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
  }

  exit;
}
