"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authUser_1 = __importDefault(require("../utils/authUser"));
var verifyUserToken = function (req, res, next) {
    var _a = authUser_1.default(req), errors = _a.errors, userData = _a.userData;
    if (Object.keys(errors).length >= 1) {
        res.status(400).json({
            errors: [__assign({}, errors)],
            message: '👉 Bad request'
        });
    }
    else {
        req.currentUser = userData;
        next();
    }
};
exports.default = verifyUserToken;
//# sourceMappingURL=verifyUserToken.js.map