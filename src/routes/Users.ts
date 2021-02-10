import express from "express";
import registerInput from "../helpers/user/registerInput";
import signInInput from "../helpers/user/signInInput";
import UsersController from "../controllers/Users";

const router = express.Router();

//Environment variables
const SIGN_UP_USER_URL = process.env.SIGNUP || "/signUp";
const GET_USERS_URL = process.env.GETUSERS || "/";
const DELETE_USER_URL = process.env.DELETEUSER || "delete";

router.post(SIGN_UP_USER_URL, registerInput, UsersController.createUser);
router.get(GET_USERS_URL, UsersController.getUsers);
router.delete(`/${DELETE_USER_URL}/:id`, UsersController.deleteUser);
router.post(`/signIn`, signInInput, UsersController.SignIn);

export default router;
