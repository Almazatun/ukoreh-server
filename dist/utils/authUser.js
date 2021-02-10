"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var authUser = function (context) {
    var errors = {};
    var isUser = {};
    var authHeader = context.headers["authorization"];
    if (authHeader) {
        var token = authHeader.split("Bearer ")[1];
        if (token) {
            try {
                isUser = jsonwebtoken_1.default.verify(token, config_1.default);
            }
            catch (error) {
                errors.AuthenticationError = "Invalid / Expired token";
            }
        }
        else {
            errors.AuthorizationToken =
                "Authentication token must be | 👉 Bearer [token]";
        }
    }
    else {
        errors.AuthorizationHeader = "Authorization header must be provided";
    }
    return {
        errors: errors,
        userData: isUser,
    };
};
exports.default = authUser;
//# sourceMappingURL=authUser.js.map