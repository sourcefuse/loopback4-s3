import { S3, ServiceInputTypes } from '@aws-sdk/client-s3';
import { Command } from '@aws-sdk/smithy-client';
import { MetadataBearer, RequestPresigningArguments } from '@aws-sdk/types';
import { BindingKey } from '@loopback/core';
export declare namespace AWSS3Bindings {
    const AwsS3Provider: BindingKey<S3>;
    const Config: BindingKey<AwsS3Config>;
}
export interface AwsS3Config {
    accessKeyId: string;
    secretAccessKey: string;
    region?: string;
}
export declare class S3WithSigner extends S3 {
    getSignedUrl<InputType extends ServiceInputTypes, OutputType extends MetadataBearer = MetadataBearer>(command: Command<InputType, OutputType, any, //NOSONAR
    ServiceInputTypes, MetadataBearer>, options?: RequestPresigningArguments): Promise<string>;
}
