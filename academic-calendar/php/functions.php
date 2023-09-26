<?php

// Function to generate dropdown options
function generateOptions($filterName, $selectedValue)
{
  // API endpoint URL
  $apiEndpoint = getenv('API_SAMPLE_API_ENDPOINT');

  $apiKey = getenv('API_SAMPLE_API_KEY');

  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $apiEndpoint . '/' . $filterName);

  $headers = array(
    "Ocp-Apim-Subscription-Key: $apiKey",
    "X-McMaster-Api-Revision: latest"
  );

  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($curl);

  if ($response !== false) {
    $decodedResponse = json_decode($response);
    // var_dump($decodedResponse);
    $valueSet = $decodedResponse->$filterName;

    // Process the options data and generate the dropdown options
    foreach ($valueSet as $value) {
      $code = $value->code;
      $selected = ($selectedValue === $code) ? "active" : "";
      $description = $value->description;
      echo '<li><a class="dropdown-item ' . $selected . '" href="#" data-value="' . htmlspecialchars($code) . '">' . htmlspecialchars($description) . '</a></li>';
    }
  } else {
    echo 'Failed to fetch API data.';
  }

  curl_close($curl);
}
?>
