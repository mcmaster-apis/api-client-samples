# McMaster APIs PHP Client Credentials Flow Example

Some McMaster APIs require a JSON web token (JWT) access token in addition to a subscription key.  This sample demonstrates how to acquire an Azure Identity Platform [client credentials flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow) access token and use it along with your subscription key to retrieve an API resource.  Assumes your php.ini variables_order is "EGPCS" or similar.  Requires these environment variable values:

- **CLIENT_ID**: Provided by UTS after you complete an API approval process request form in the [developer portal](https://developer.api.mcmaster.ca/apis).
- **CLIENT_SECRET**: Provided by UTS after you complete an API approval process request form in the [developer portal](https://developer.api.mcmaster.ca/apis).
- **API_SCOPE**: Available in the [developer portal](https://developer.api.mcmaster.ca) on a per-API basis.  It is noted near the top of the documentation and labelled "Client credentials OAuth 2.0 scope".  For more details see Microsoft's [documentation](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow#first-case-access-token-request-with-a-shared-secret) for "scope".
- **API_SUBSCRIPTION_KEY**: Provided by UTS after you complete an API approval process request form in the [developer portal](https://developer.api.mcmaster.ca/apis).
- **API_ENDPOINT_URL**: Available in the [developer portal](https://developer.api.mcmaster.ca) on a per-API operation basis.

The access token drives function-level and object-level authorization controls within our APIs to determine what specific operations your application can perform and on what specific objects it can operate.  Do not share your client ID or client secret.  Your subscription keys identify your application to our API gateway and is also used to enforce rate limits.  Do not share your subscription keys.
