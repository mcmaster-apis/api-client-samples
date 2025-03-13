<?php
/* 
  Retrieve an access token from Azure Identity Platform using client credentials grant flow.
  Note that the identity provider (IdP) is hard-coded here to the McMaster production Azure tenant.
  
  https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow 
*/
function getAccessToken($clientId, $clientSecret, $scope) {
  $data = [
    'client_id' => $clientId,
    'client_secret' => $clientSecret,
    'scope' => $scope,
    'grant_type' => 'client_credentials'
  ];

  $options = [
    'http' => [
      'header' => "Content-type: application/x-www-form-urlencoded\r\n",
      'method' => 'POST',
      'content' => http_build_query($data)
    ]
  ];

  $context = stream_context_create($options);
  $tokenJson = @file_get_contents('https://login.microsoftonline.com/44376307-b429-42ad-8c25-28cd496f4772/oauth2/v2.0/token', false, $context);
  if ($tokenJson === false) {
    $e = error_get_last();
    $error = (isset($e) && isset($e['message']) && $e['message'] != "") ? $e['message'] : "Unknown error";
    throw new Exception("Could not get Azure Identity access token: $error");
  }
  $token = json_decode($tokenJson);
  return $token->access_token;
}

$accessToken = getAccessToken($_ENV["CLIENT_ID"], $_ENV["CLIENT_SECRET"], $_ENV["API_SCOPE"]);
$opts = [
  "http" => [
    "method" => "GET",
    "header" => "Ocp-Apim-Subscription-Key: ". $_ENV["API_SUBSCRIPTION_KEY"] . "\r\n" .
      "Authorization: Bearer " . $accessToken . "\r\n"
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
