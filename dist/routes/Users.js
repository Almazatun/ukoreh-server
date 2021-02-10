"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var registerInput_1 = __importDefault(require("../helpers/user/registerInput"));
var signInInput_1 = __importDefault(require("../helpers/user/signInInput"));
var Users_1 = __importDefault(require("../controllers/Users"));
var router = express_1.default.Router();
var SIGN_UP_USER_URL = process.env.SIGNUP || "/signUp";
var GET_USERS_URL = process.env.GETUSERS || "/";
var DELETE_USER_URL = process.env.DELETEUSER || "delete";
router.post(SIGN_UP_USER_URL, registerInput_1.default, Users_1.default.createUser);
router.get(GET_USERS_URL, Users_1.default.getUsers);
router.delete("/" + DELETE_USER_URL + "/:id", Users_1.default.deleteUser);
router.post("/signIn", signInInput_1.default, Users_1.default.SignIn);
exports.default = router;
//# sourceMappingURL=Users.js.map