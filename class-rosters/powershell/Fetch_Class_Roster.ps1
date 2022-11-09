Function GetAccessToken([string]$ClientId, [string]$ClientSecret) {
  $Body = @{
    'Accept' = 'application/json'
    'client_id' = $ClientId
    'client_secret' = $ClientSecret
    'grant_type'='client_credentials'
    'scope' = 'https://mcmaster.ca/rosters/.default'
  }
  $Response = Invoke-RestMethod -Uri https://login.microsoftonline.com/44376307-b429-42ad-8c25-28cd496f4772/oauth2/v2.0/token -Method Post -Body $Body -WebSession $websession
  Return $Response.access_token
}

$EXEC_DIR = $PSScriptRoot
$RESOURCE_DIR = Join-Path -Path $EXEC_DIR -ChildPath 'Resources'
$OUTPUT_DIR = Join-Path -Path $EXEC_DIR -ChildPath 'Output'
$LOG_DIR = Join-Path -Path $EXEC_DIR -ChildPath 'Logs'

$LogFilePath = Join-Path -Path $LOG_DIR -ChildPath ('script_transcript_' + (Get-Date -f yyyy-MM-dd_HHmm) + '.log')
$SettingsFilePath = Join-Path -Path $RESOURCE_DIR -ChildPath settings.json

$ClassFilterPath = Join-Path -Path $RESOURCE_DIR -ChildPath classfilter.jq
$UserFilterPath = Join-Path -Path $RESOURCE_DIR -ChildPath userfilter.jq
$EnrolmentFilterPath = Join-Path -Path $RESOURCE_DIR -ChildPath enrolmentfilter.jq

$ClassOutputPath = Join-Path -Path $OUTPUT_DIR -ChildPath classes.csv
$UserOutputPath = Join-Path -Path $OUTPUT_DIR -ChildPath users.csv
$EnrolmentOutputPath = Join-Path -Path $OUTPUT_DIR -ChildPath enrolments.csv

Start-Transcript -Path $LogFilePath

$SettingsObject = Get-Content -Path $SettingsFilePath | ConvertFrom-Json
$TERM = $SettingsObject.term
$CLIENTID = $SettingsObject.clientId
$CLIENTSECRET = $SettingsObject.clientSecret

Write-Host "EXEC_DIR = $EXEC_DIR" -ForegroundColor Yellow
Write-Host "TERM = $TERM" -ForegroundColor Yellow
Write-Host "Fetching Content" -ForegroundColor Yellow

$access_token = GetAccessToken -ClientId $CLIENTID -ClientSecret $CLIENTSECRET

Measure-Command {
  Try {
	$headers = @{'Authorization' = "Bearer $access_token"}
    $Response = Invoke-RestMethod -Uri https://rosters-stable.apps.ocpprd01.mcmaster.ca/rosters/$TERM -Method Get -Headers $headers
    $jsonResponse = $Response.rosters | ConvertTo-Json -Depth 100
    Write-Host "Data fetched successfully." -ForegroundColor Yellow
  } Catch [System.OutOfMemoryException] {
    Write-Host "System out of memory exception thrown." -ForegroundColor Yellow
    Write-Host "$_" -ForegroundColor Red
  } Catch {
    $ErrorMessage = $_.Exception.Message
    $FailedItem = $_.Exception.ItemName
    Write-Host "Error: $FailedItem. The error message was $ErrorMessage"
  }

  if ($Response.rosters.Length){
    $jsonResponse | & jq -r -f $ClassFilterPath > $ClassOutputPath
    $jsonResponse | & jq -r -f $UserFilterPath > $UserOutputPath
    $jsonResponse | & jq -r -f $EnrolmentFilterPath > $EnrolmentOutputPath
    Write-Host "Script completed successfully" -ForegroundColor Yellow
  } else {
    Write-Host "0 rows returned. Please confirm $TERM is a valid term" -ForegroundColor Red
  }
}
Stop-Transcript