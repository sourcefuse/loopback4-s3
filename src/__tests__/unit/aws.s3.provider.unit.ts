import {expect} from '@loopback/testlab';
import {AwsS3Provider} from '../../providers/aws-s3.provider';

describe('AWS S3 Unit Tests', () => {
  describe('AWS S3 Configration tests', () => {
    const awsConfig = {
      accessKeyId: 'test_access_key_id',
      secretAccessKey: 'test_secret_access_key',
    };
    const awsS3Provider = new AwsS3Provider(awsConfig);

    it('check if the class instance contains the property config', async () => {
      const result = awsS3Provider.value();
      expect(result).to.have.property('config');
    });

    it('check if the object of config contains the correct config as provided', async () => {
      const serviceDetails = awsS3Provider.value();
      const result = serviceDetails.config;
      expect(result).to.have.properties(['credentials', 'region']);
    });

    it('check if the credentials contains the correct access key as provided', async () => {
      const serviceDetails = awsS3Provider.value();
      const result = serviceDetails.config;
      expect((await result.credentials()).accessKeyId).to.eql(
        'test_access_key_id',
      );
    });
  });
});
