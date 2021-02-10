"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = __importDefault(require("../../utils/validators"));
var signInInput = function (req, res, next) {
    var _a = req.body, userName = _a.userName, password = _a.password;
    var _b = validators_1.default.validationRulesSignIn(userName, password), errors = _b.errors, valid = _b.valid;
    if (!errors || !valid) {
        res.status(422).json({
            errors: [errors],
            message: '👉 Please check it out your userName or password'
        });
    }
    else {
        return next();
    }
};
exports.default = signInInput;
//# sourceMappingURL=signInInput.js.map