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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Users_1 = __importDefault(require("../models/Users"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var generateTokken_1 = __importDefault(require("../utils/generateTokken"));
var UsersCTR = (function () {
    function UsersCTR() {
    }
    UsersCTR.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, email, password, user, userEmail, bcryptPassword, newUser, saveUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userName = _a.userName, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4, Users_1.default.findOne({ userName: userName }).exec()];
                    case 2:
                        user = _b.sent();
                        return [4, Users_1.default.findOne({ email: email }).exec()];
                    case 3:
                        userEmail = _b.sent();
                        if (!user) return [3, 4];
                        res.status(400).json({
                            errors: ['This is userName already exist 🔒'],
                            message: 'Try to use other userName'
                        });
                        return [3, 8];
                    case 4:
                        if (!userEmail) return [3, 5];
                        res.status(400).json({
                            errors: ['This is email already exist 🔒'],
                            message: 'Try to use other email'
                        });
                        return [3, 8];
                    case 5: return [4, bcrypt_1.default.hash(password, 12)];
                    case 6:
                        bcryptPassword = _b.sent();
                        newUser = new Users_1.default({
                            userName: userName,
                            email: email,
                            password: bcryptPassword,
                            createdAt: new Date().toISOString()
                        });
                        return [4, newUser.save()];
                    case 7:
                        saveUser = _b.sent();
                        res.json({
                            message: 'User created successfully 👍',
                        });
                        _b.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        error_1 = _b.sent();
                        res.status(500).json({
                            errors: __assign({}, error_1),
                            message: "Some error ❌"
                        });
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    };
    UsersCTR.prototype.getUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Users_1.default.find()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2];
                }
            });
        });
    };
    UsersCTR.prototype.SignIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, password, user, match, token, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userName = _a.userName, password = _a.password;
                        return [4, Users_1.default.findOne({ userName: userName })];
                    case 1:
                        user = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 7]);
                        if (!!user) return [3, 3];
                        res.status(404).json({
                            errors: ['User not found 👥'],
                            message: 'Please check your user name or password and try again',
                        });
                        return [3, 5];
                    case 3: return [4, bcrypt_1.default.compare(password, user.password)];
                    case 4:
                        match = _b.sent();
                        if (!match) {
                            res.status(401).json({
                                errors: ["Wrong credentials 🆘"],
                            });
                        }
                        else {
                            token = generateTokken_1.default(user);
                            res.json(__assign(__assign({}, user._doc), { token: token }));
                        }
                        _b.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        error_2 = _b.sent();
                        res.status(500).json({
                            errors: __assign({}, error_2),
                            message: "Some error ❌"
                        });
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    UsersCTR.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, Users_1.default.findByIdAndDelete({ _id: req.params.id })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            res.json({
                                message: "User successfully deleted ✔"
                            });
                        }
                        else {
                            res.json({
                                errors: ["Sorry, User does not exist 👽"]
                            });
                        }
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json({
                            errors: __assign({}, error_3),
                            message: "Some error ❌"
                        });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return UsersCTR;
}());
var UsersController = new UsersCTR;
exports.default = UsersController;
//# sourceMappingURL=Users.js.map