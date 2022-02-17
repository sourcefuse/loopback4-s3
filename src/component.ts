import {Component, ProviderMap} from '@loopback/core';
import {AWSS3Bindings} from './types';
import {AwsS3Provider} from './providers';

export class AwsS3Component implements Component {
  constructor() {
    this.providers = {
      [AWSS3Bindings.AwsS3Provider.key]: AwsS3Provider,
    };
  }

  providers?: ProviderMap = {};
}
