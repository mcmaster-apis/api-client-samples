<?php
/* 
  Use a subscription key to access a McMaster API.
*/
$opts = [
  "http" => [
    "method" => "GET",
    "header" => "Ocp-Apim-Subscription-Key: ". $_ENV["API_SUBSCRIPTION_KEY"] . "\r\n"
  ]
];
$context = stream_context_create($opts);

$resource = @file_get_contents($_ENV["API_ENDPOINT_URL"], false, $context);
if ($resource === false) {
  $e = error_get_last();
  $error = (isset($e) && isset($e['message']) && $e['message'] != "") ? $e['message'] : "Unknown error";
  throw new Exception("Could not get API resource: $error");
}
var_dump(json_decode($resource));
?>
