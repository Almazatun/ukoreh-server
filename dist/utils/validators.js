"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationRulesSignIn = exports.validationRules = void 0;
var emailRegularExpressions_1 = __importDefault(require("./other/emailRegularExpressions"));
var validationRules = function (userName, email, password, confirmPassword) {
    var errors = {};
    if (userName.trim() === '') {
        errors.userName = 'Username must not be empty 🤬';
    }
    if (!email) {
        errors.email = 'Email can not be empty 🤬';
    }
    else if (!emailRegularExpressions_1.default.test(email)) {
        errors.email = 'Invalid email address 🤡';
    }
    if (!password) {
        errors.password = 'Password can not be empty 🤬';
    }
    else if (password.length < 6) {
        errors.password = "Password must be 6 characters or more 🤬";
    }
    if (!confirmPassword) {
        errors.confirmPassword = 'Confirm password can not be empty 🤬';
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password do not match 💥';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.validationRules = validationRules;
var validationRulesSignIn = function (userName, password) {
    var errors = {};
    if (userName.trim() === '') {
        errors.userName = 'User name can not be empty 🤬';
    }
    if (!password) {
        errors.password = 'Password can not be empty 🤬';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.validationRulesSignIn = validationRulesSignIn;
exports.default = {
    validationRules: exports.validationRules,
    validationRulesSignIn: exports.validationRulesSignIn
};
//# sourceMappingURL=validators.js.map