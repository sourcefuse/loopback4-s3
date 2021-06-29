import {Provider, inject} from '@loopback/core';
import * as AWS from 'aws-sdk';
import {AwsS3Config, AWSS3Bindings} from '../types';

export class AwsS3Provider implements Provider<AWS.S3> {
  constructor(
    @inject(AWSS3Bindings.Config)
    private readonly config: AwsS3Config,
  ) {
    AWS.config.update(Object.assign({}, {signatureVersion: this.config.signatureVersion}, this.config));
  }
  value() {
    return new AWS.S3();
  }
}
