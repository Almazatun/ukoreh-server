import authUser from '../utils/authUser'
import {Request, Response, NextFunction} from "express";

const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {

    const {errors, userData} = authUser(req)

    /* Unless counts of errors greater then 1 or equal to one => */
    /* => will be send error message of the */
    if (Object.keys(errors!).length >= 1) {
        res.status(400).json({
            errors: [{
                ...errors
            }],
            message: '👉 Bad request'
        })
    } else {
        //Custom middleware data the currentUser
        req.currentUser = userData
        next()
    }
}

export default verifyUserToken