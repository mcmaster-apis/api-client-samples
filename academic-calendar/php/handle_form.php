<?php

// API endpoint URL
$apiEndpoint = getenv("API_SAMPLE_API_ENDPOINT");

$apiKey = getenv("API_SAMPLE_API_KEY");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  // Retrieve the selected values from the form
  $careerFilterValue = $_GET['career-filter'] ?? '';
  $facultyFilterValue = $_GET['faculty-filter'] ?? '';

  // You can use the selected values to build your HTTP GET request URL
  $url = $apiEndpoint . '/programs?careerCode=' . urlencode($careerFilterValue) . '&facultyCode=' . urlencode($facultyFilterValue);

  // echo $url;

  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);

  $headers = array(
    "Ocp-Apim-Subscription-Key: $apiKey",
    "X-McMaster-Api-Revision: latest"
  );

  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($curl);

  require_once 'index.php';

  if ($response !== false) {
    $decodedResponse = json_decode($response);
    $programs = $decodedResponse->programs;
    echo '
    <div class="container mb-5"> 
      <div class="accordion">
      ';

    // Process the options data and generate the dropdown options
    foreach ($programs as $program) {
      $code = $program->code;
      $description = $program->description;
      $career_description = $program->career->description;
      $faculty_description = $program->faculty->description;
      echo '<div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' . $code . '" aria-expanded="true" aria-controls="' . $code . '">'
          . htmlspecialchars($code) . 
        '</button>
      </h2>
      <div class="accordion-collapse collapse" id="' . $code . '" aria-labelledby="' . $code . '">
        <div class="accordion-body">
          <h4>
          ' . $description . '
          </h4>
          <ul class="list-unstyled">
            <li>Career: ' . $career_description . '</li>
            <li>Faculty: ' . $faculty_description . '</li>
          </ul>
        </div>
      </div>
    </div>';
    }
    echo '</div></div>';
  } else {
    echo 'Failed to fetch API data.';
  }

  curl_close($curl);

  exit;
}
?>