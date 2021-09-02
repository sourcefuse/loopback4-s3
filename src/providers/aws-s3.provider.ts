/* eslint-disable @typescript-eslint/no-explicit-any */
import {Provider, inject} from '@loopback/core';
import * as AWS from '@aws-sdk/client-s3';
import {AwsS3Config, AWSS3Bindings} from '../types';

export class AwsS3Provider implements Provider<AWS.S3> {
  client: any;
  constructor(
    @inject(AWSS3Bindings.Config)
    private readonly config: AwsS3Config,
  ) {
    this.client = new AWS.S3Client(this.config);
  }
  value() {
    return new AWS.S3(this.client);
  }
}
