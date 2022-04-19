"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const aws_s3_provider_1 = require("../../providers/aws-s3.provider");
describe('AWS S3 Unit Tests', () => {
    describe('AWS S3 Configration tests', () => {
        const awsConfig = {
            accessKeyId: 'test_access_key_id',
            secretAccessKey: 'test_secret_access_key',
        };
        const awsS3Provider = new aws_s3_provider_1.AwsS3Provider(awsConfig);
        it('check if the class instance contains the property config', () => {
            const result = awsS3Provider.value();
            (0, testlab_1.expect)(result).to.have.property('config');
        });
        it('check if the object of config contains the correct config as provided', () => {
            const serviceDetails = awsS3Provider.value();
            const result = serviceDetails.config;
            (0, testlab_1.expect)(result).to.have.properties(['credentials', 'region']);
        });
        it('check if the credentials contains the correct access key as provided', async () => {
            const serviceDetails = awsS3Provider.value();
            const result = serviceDetails.config;
            (0, testlab_1.expect)((await result.credentials()).accessKeyId).to.eql('test_access_key_id');
        });
    });
});
//# sourceMappingURL=aws.s3.provider.unit.js.map