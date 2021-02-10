"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = __importDefault(require("../../utils/validators"));
var registerInput = function (req, res, next) {
    var _a = req.body, userName = _a.userName, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
    var _b = validators_1.default.validationRules(userName, email, password, confirmPassword), errors = _b.errors, valid = _b.valid;
    if (!errors || !valid) {
        res.status(422).json({
            errors: [errors],
            message: '👉 Please check it out your email or password'
        });
    }
    else {
        return next();
    }
};
exports.default = registerInput;
//# sourceMappingURL=registerInput.js.map