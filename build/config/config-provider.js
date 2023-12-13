"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const configProvider = {
    port: process.env.PORT || 3000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
};
exports.default = configProvider;
//# sourceMappingURL=config-provider.js.map