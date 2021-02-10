import {Request, Response} from "express";
import Users from '../models/Users'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateTokken'

//Users Controller class
class UsersCTR  {
    async createUser(req: Request, res: Response) {
        const {userName, email, password} = req.body
        try {
            // Make sure the user does not already exist in database storage
            const user = await Users.findOne({userName}).exec() //Promise
            const userEmail = await Users.findOne({email}).exec()

            if (user) {
                res.status(400).json({
                    errors: ['This is userName already exist 🔒'],
                    message: 'Try to use other userName'
                })
            } else if (userEmail) {
                res.status(400).json({
                    errors: ['This is email already exist 🔒'],
                    message: 'Try to use other email'
                })
            } else {
                //Hashing password
                const bcryptPassword = await bcrypt.hash(password, 12)

                //Create new user
                const newUser = new Users({
                    userName: userName,
                    email: email,
                    password: bcryptPassword,
                    createdAt: new Date().toISOString()
                })

                const saveUser = await newUser.save()

                res.json({
                    message: 'User created successfully 👍',
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: {...error},
                message: "Some error ❌"
            })
        }
    }

    async getUsers(req: Request, res: Response) {
        const users = await Users.find()
        res.json(users)
    }

    async SignIn(req: Request, res: Response) {
        const {userName, password} = req.body

        //Make sure the user existed in the database
        const user = await Users.findOne({userName})

        try {
            if (!user) {
                res.status(404).json({
                    errors: ['User not found 👥'],
                    message: 'Please check your user name or password and try again',
                })
            } else {
                //Make sure the user typed correct password
                const match = await bcrypt.compare(password, user.password)

                //Unless the user password incorrect the user get error message
                if (!match) {
                    res.status(401).json({
                        errors: ["Wrong credentials 🆘"],
                    })
                } else {
                    const token = generateToken(user)
                    res.json({
                        ...user._doc,
                        token
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                errors: {...error},
                message: "Some error ❌"
            })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await Users.findByIdAndDelete({_id: req.params.id})
            if (user) {
                res.json({
                    message: "User successfully deleted ✔"
                })
            } else {
                res.json({
                    errors: ["Sorry, User does not exist 👽"]
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: {...error},
                message: "Some error ❌"
            })
        }
    }
}
const UsersController = new UsersCTR
export default UsersController
