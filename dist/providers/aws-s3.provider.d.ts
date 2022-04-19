import { Provider } from '@loopback/core';
import { AwsS3Config } from '../types';
import { S3WithSigner } from '..';
export declare class AwsS3Provider implements Provider<S3WithSigner> {
    private readonly config;
    constructor(config: AwsS3Config);
    value(): S3WithSigner;
}
