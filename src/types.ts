import {S3} from '@aws-sdk/client-s3';
import {BindingKey} from '@loopback/core';

export namespace AWSS3Bindings {
  export const AwsS3Provider = BindingKey.create<S3>('sf.aws.s3');
  export const Config = BindingKey.create<AwsS3Config>('sf.aws.s3.config');
}

export interface AwsS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
}
