"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_s3_1 = require("@aws-sdk/client-s3");
const testlab_1 = require("@loopback/testlab");
const crypto_1 = require("crypto");
const dotenv = tslib_1.__importStar(require("dotenv"));
const providers_1 = require("../../providers");
dotenv.config();
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_REGION;
const testBucket = (_a = process.env.AWS_TEST_BUCKET) !== null && _a !== void 0 ? _a : 'loopback4-test-bucket';
describe('AWS S3 Acceptance Tests', function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(20000);
    let client;
    before(function () {
        if (!accessKey || !secretKey || !region) {
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.skip();
        }
    });
    before(initClient);
    describe('Bucket operations', () => {
        it('should create bucket', createBucket);
        it('should list all buckets', async () => {
            const { Buckets } = await client.listBuckets({});
            (0, testlab_1.expect)(Buckets).to.have.length(1);
        });
        it('should delete a bucket', async () => {
            await client.deleteBucket({ Bucket: testBucket });
        });
    });
    describe('Object operations', () => {
        beforeEach(createBucket);
        afterEach(clearBucket);
        it('should upload a single file', async () => {
            const Key = (0, crypto_1.randomBytes)(48).toString('hex');
            const Body = (0, crypto_1.randomBytes)(128).toString('hex');
            const data = await client.putObject({
                Bucket: testBucket,
                Key,
                Body,
            });
            (0, testlab_1.expect)(data).to.have.property('$metadata');
        });
        it('should list all objects', async () => {
            const Key = (0, crypto_1.randomBytes)(48).toString('hex');
            const Body = (0, crypto_1.randomBytes)(128).toString('hex');
            await client.putObject({
                Bucket: testBucket,
                Key,
                Body,
            });
            const { Contents } = await client.listObjects({ Bucket: testBucket });
            (0, testlab_1.expect)(Contents).to.have.length(1);
        });
        it('should create a signed url for an object', async () => {
            const Key = (0, crypto_1.randomBytes)(48).toString('hex');
            const Body = (0, crypto_1.randomBytes)(128).toString('hex');
            const command = new client_s3_1.PutObjectCommand({
                Bucket: testBucket,
                Key,
                Body,
            });
            const signedUrl = await client.getSignedUrl(command, {
                expiresIn: 1000,
            });
            (0, testlab_1.expect)(signedUrl).to.be.a.String();
        });
    });
    async function clearBucket() {
        const { Contents } = await client.listObjects({ Bucket: testBucket });
        if (Contents && Contents.length > 0) {
            await client.deleteObjects({
                Bucket: testBucket,
                Delete: {
                    Objects: Contents.map((content) => ({ Key: content.Key })),
                },
            });
        }
        await client.deleteBucket({
            Bucket: testBucket,
        });
    }
    async function createBucket() {
        await client.createBucket({
            Bucket: testBucket,
        });
    }
    async function initClient() {
        const provider = new providers_1.AwsS3Provider({
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
            region,
        });
        client = provider.value();
    }
});
//# sourceMappingURL=aws-s3.provider.acceptance.js.map