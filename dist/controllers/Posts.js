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
var Posts_1 = __importDefault(require("../models/Posts"));
var PostsCTR = (function () {
    function PostsCTR() {
    }
    PostsCTR.prototype.getPosts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var quotes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Posts_1.default.find()];
                    case 1:
                        quotes = _a.sent();
                        res.json(quotes);
                        return [2];
                }
            });
        });
    };
    PostsCTR.prototype.createPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, _a, body, postTitle, newPost, savePost;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userData = req.currentUser;
                        _a = req.body, body = _a.body, postTitle = _a.postTitle;
                        newPost = new Posts_1.default({
                            body: body,
                            userName: userData.userName,
                            postTitle: postTitle,
                            createdAt: new Date().toISOString(),
                            user: userData.id
                        });
                        return [4, newPost.save()];
                    case 1:
                        savePost = _b.sent();
                        res.json(savePost);
                        return [2];
                }
            });
        });
    };
    PostsCTR.prototype.getSpecificPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Posts_1.default.findById({ _id: req.params.id })];
                    case 1:
                        post = _a.sent();
                        res.json(post);
                        return [2];
                }
            });
        });
    };
    PostsCTR.prototype.deletePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, findPostData, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = req.currentUser;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4, Posts_1.default.findById({ _id: req.params.id })];
                    case 2:
                        findPostData = _a.sent();
                        if (!(userData.userName === findPostData.userName)) return [3, 4];
                        return [4, Posts_1.default.findByIdAndDelete({ _id: req.params.id })];
                    case 3:
                        result = _a.sent();
                        res.json(result);
                        return [3, 5];
                    case 4:
                        res.json({
                            errors: [{
                                    AuthenticationError: 'Action not allowed 🔒',
                                }],
                            message: '👉 Bad request'
                        });
                        _a.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        error_1 = _a.sent();
                        res.json({
                            errors: [__assign({}, error_1)],
                            message: 'Post ID not valid 🤬'
                        });
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    PostsCTR.prototype.updatePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var middlewareUserData, findPostData, updatedPostData, post, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        middlewareUserData = req.currentUser;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4, Posts_1.default.findById({ _id: req.params.id })];
                    case 2:
                        findPostData = _a.sent();
                        if (!findPostData) return [3, 6];
                        if (!(middlewareUserData.id === findPostData.user)) return [3, 4];
                        updatedPostData = {
                            postTitle: req.body.postTitle || findPostData.postTitle,
                            body: req.body.body || findPostData.body
                        };
                        return [4, Posts_1.default.findByIdAndUpdate(req.params.id, updatedPostData, { new: true })];
                    case 3:
                        post = _a.sent();
                        res.json(post);
                        return [3, 5];
                    case 4:
                        res.json({
                            errors: [{
                                    AuthenticationError: 'Action not allowed 🔒',
                                }],
                            message: '👉 Bad request'
                        });
                        _a.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        res.json({
                            errors: ['Post ID not valid 🤬'],
                            message: '👉 Bad request'
                        });
                        _a.label = 7;
                    case 7: return [3, 9];
                    case 8:
                        error_2 = _a.sent();
                        res.status(500).json({
                            errors: __assign({}, error_2),
                            message: 'Bad request 🤬'
                        });
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    return PostsCTR;
}());
var PostsController = new PostsCTR;
exports.default = PostsController;
//# sourceMappingURL=Posts.js.map