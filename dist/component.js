"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Component = void 0;
const types_1 = require("./types");
const providers_1 = require("./providers");
class AwsS3Component {
    constructor() {
        this.providers = {};
        this.providers = {
            [types_1.AWSS3Bindings.AwsS3Provider.key]: providers_1.AwsS3Provider,
        };
    }
}
exports.AwsS3Component = AwsS3Component;
//# sourceMappingURL=component.js.map