# Class Rosters API
## PowerShell Sample Application
A sample application showing the use of the McMaster University 
[Class Rosters API](https://developer.api.mcmaster.ca/api-details#api=class-rosters)
with a PowerShell script.  The script converts the JSON output payload to three separate
custom-purpose CSV files.  In this case, the purpose is bulk upload to create Microsoft
Teams for every class roster in a term. 

This example uses [jq](https://stedolan.github.io/jq/) for JSON payload processing.  We 
recommend you install jq on your Windows environment using [Chocolatey](https://chocolatey.org/).
Payloads for a full term of classes can be quite large, hence the specific error handling
for client-side memory issues.
