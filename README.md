# loopback4-s3

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

A simple loopback-next extension for AWS S3 integration in loopback applications.

## Install

```sh
npm install loopback4-s3
```

## Usage

In order to use this component into your LoopBack application, please follow below steps.

- Add component to application and provide access keys and other s3 initialization configuration details via AWSS3Bindings.Config binding as mentioned below. You can add any of the options mentioned [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property).

```ts
this.bind(AWSS3Bindings.Config).to({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: process.env.AWS_SIGNATURE,
} as AwsS3Config);
this.component(AwsS3Component);
```

- After this, you can just inject the S3 provider across application.

```ts
import * as AWS from 'aws-sdk';

@inject(AWSS3Bindings.AwsS3Provider) s3: AWS.S3,
```

## Migration to a version after 4.0.0

`loopback4-s3@4.0.0` is the last version that would be using aws-sdk v2, after that all the versions are going to be based on [`aws-sdk v3`](https://github.com/aws/aws-sdk-js-v3).

You can follow [this](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/migrating-to-v3.html) guide to migrate your code to `aws-sdk-js-v3`.

The `getPresignedUrl` method is also missing in `aws-sdk/client-s3` client, so it is provided in the extended client returned by the provider. The documentation for this new `getPresignedUrl` are provided [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_request_presigner.html)

## Feedback

If you've noticed a bug or have a question or have a feature request, [search the issue tracker](https://github.com/sourcefuse/loopback4-s3/issues) to see if someone else in the community has already created a ticket.
If not, go ahead and [make one](https://github.com/sourcefuse/loopback4-s3/issues/new/choose)!
All feature requests are welcome. Implementation time may vary. Feel free to contribute the same, if you can.
If you think this extension is useful, please [star](https://help.github.com/en/articles/about-stars) it. Appreciation really helps in keeping this project alive.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/sourcefuse/loopback4-s3/blob/master/.github/CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Developing

For development guidelines, refer [here](https://github.com/sourcefuse/rakuten-pms-api/tree/master/DEVELOPING.md)

## Code of conduct

Code of conduct guidelines [here](https://github.com/sourcefuse/loopback4-s3/blob/master/.github/CODE_OF_CONDUCT.md).

## License

[MIT](https://github.com/sourcefuse/loopback4-s3/blob/master/LICENSE)
