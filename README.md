# loopback4-s3

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

A simple loopback-next extension for AWS S3 integration in loopback applications.

# <span style="color:#0C0200; background-color:#852D1A">DEPCRECATION NOTICE</span>

<p style="color: #1C1A02;background-color:#F3EB89">This is to bring to your notice that v4.x.x of the loopback4-s3 is deprecated. We have stopped support for the same. We strongly recommend to migrate to v6.x.x and above.
Follow <a href="https://github.com/sourcefuse/loopback4-s3/blob/master/README.md#migration-to-a-version-after-400">this</a> to check the migration steps.</p>

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
