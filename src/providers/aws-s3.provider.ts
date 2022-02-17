import {Provider, inject} from '@loopback/core';
import {AwsS3Config, AWSS3Bindings} from '../types';
import {S3WithSigner} from '..';

export class AwsS3Provider implements Provider<S3WithSigner> {
  constructor(
    @inject(AWSS3Bindings.Config)
    private readonly config: AwsS3Config,
  ) {}
  value(): S3WithSigner {
    return new S3WithSigner({
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
      region: this.config.region,
    });
  }
}
