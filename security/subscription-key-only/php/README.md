# McMaster APIs PHP Subscription Key Only Example

Some McMaster APIs require only a subscription key.  This sample demonstrates how to use your subscription key to retrieve an API resource.  Assumes your php.ini variables_order is "EGPCS" or similar.  Requires these environment variable values:

- **API_SUBSCRIPTION_KEY**: Provided by UTS after you complete an API approval process request form in the [developer portal](https://developer.api.mcmaster.ca/apis).
- **API_ENDPOINT_URL**: Available in the [developer portal](https://developer.api.mcmaster.ca) on a per-API operation basis.

Your subscription keys identify your application to our API gateway and is also used to enforce rate limits.  Do not share your subscription keys.
