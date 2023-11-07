<?php

// Function to generate dropdown options
function generateOptions($filterName, $selectedValue)
{
  try {
    $response = fetch($filterName);
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
  } catch (Exception $e) {
    echo '<li>Failed to fetch API data.</li>';
  }
}

function fetch($endpoint, $queries = '')
{
  // API endpoint URL
  $apiEndpoint = getenv('API_SAMPLE_API_ENDPOINT');

  $apiKey = getenv('API_SAMPLE_API_KEY');

  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $apiEndpoint . '/' . $endpoint . '?' . $queries);

  $headers = array(
    "Ocp-Apim-Subscription-Key: $apiKey",
    "X-McMaster-Api-Revision: latest"
  );

  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($curl);

  // Check for cURL errors
  if ($response === false) {
    $error = curl_error($curl);
    curl_close($curl);
    throw new Exception("Fetch error: $error");
  }
  // Check for HTTP errors (e.g., 404 Not Found, 500 Internal Server Error)
  $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
  if ($httpCode >= 400) {
    curl_close($curl);
    throw new Exception("HTTP error code: $httpCode");
  }

  curl_close($curl);

  return $response;
}
