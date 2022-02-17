import {Provider, inject} from '@loopback/core';
import {S3} from '@aws-sdk/client-s3';
import {AwsS3Config, AWSS3Bindings} from '../types';

export class AwsS3Provider implements Provider<S3> {
  constructor(
    @inject(AWSS3Bindings.Config)
    private readonly config: AwsS3Config,
  ) {}
  value() {
    return new S3({
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
      region: this.config.region,
    });
  }
}
