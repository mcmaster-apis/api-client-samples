<!-- index.php -->
<?php
require_once './functions.php';
session_start();
$response = null;

if (isset($_SESSION['careerFilterValue']) && isset($_SESSION['facultyFilterValue'])) {
  $careerFilterValue = $_SESSION['careerFilterValue'];
  $facultyFilterValue = $_SESSION['facultyFilterValue'];

  // You can use the selected values to build your HTTP GET request URL
  $queries = 'careerCode=' . urlencode($careerFilterValue) . '&facultyCode=' . urlencode($facultyFilterValue);

  $response = fetch('programs', $queries);
}
?>
<!DOCTYPE html>
<html>

<head>
  <title>McMaster API Client Sample - PHP</title>
  <meta charset="utf-8" />
  <link rel="icon" href="public/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Academic Calendar API PHP Sample" />
  <link rel="manifest" href="public/manifest.json" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./custom.css">
</head>

<body>
  <div class="container mt-5">
    <h4 class="text-center">Academic Calendar API PHP Sample</h4>
  </div>
  <?php require_once './form.php'; ?>
  <?php
  if ($response) {
    try {
      $decodedResponse = json_decode($response);
      $programs = $decodedResponse->programs;
      // Check if the programs array is empty
      if (empty($programs)) {
        echo '<div class="container mb-5">No program found for career ' . htmlspecialchars($careerFilterValue) . ' and faculty ' . htmlspecialchars($facultyFilterValue) . '.</div>';
        exit;
      }
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
    } catch (Exception $e) {
      echo '<div class="container mb-5">Failed to fetch API data.</div>';
    }
  }
  ?>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>