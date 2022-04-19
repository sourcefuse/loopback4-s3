"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Provider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const types_1 = require("../types");
const __1 = require("..");
let AwsS3Provider = class AwsS3Provider {
    constructor(config) {
        this.config = config;
    }
    value() {
        return new __1.S3WithSigner({
            credentials: {
                accessKeyId: this.config.accessKeyId,
                secretAccessKey: this.config.secretAccessKey,
            },
            region: this.config.region,
            ...this.config,
        });
    }
};
AwsS3Provider = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(types_1.AWSS3Bindings.Config)),
    tslib_1.__metadata("design:paramtypes", [Object])
], AwsS3Provider);
exports.AwsS3Provider = AwsS3Provider;
//# sourceMappingURL=aws-s3.provider.js.map