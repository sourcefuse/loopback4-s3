"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3WithSigner = exports.AWSS3Bindings = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const core_1 = require("@loopback/core");
var AWSS3Bindings;
(function (AWSS3Bindings) {
    AWSS3Bindings.AwsS3Provider = core_1.BindingKey.create('sf.aws.s3');
    AWSS3Bindings.Config = core_1.BindingKey.create('sf.aws.s3.config');
})(AWSS3Bindings = exports.AWSS3Bindings || (exports.AWSS3Bindings = {}));
class S3WithSigner extends client_s3_1.S3 {
    getSignedUrl(command, options) {
        return (0, s3_request_presigner_1.getSignedUrl)(this, command, options);
    }
}
exports.S3WithSigner = S3WithSigner;
//# sourceMappingURL=types.js.map