"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateToken = function (user) {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        userName: user.userName
    }, config_1.default, { expiresIn: '1h' });
};
exports.default = generateToken;
//# sourceMappingURL=generateTokken.js.map