import {Request, Response} from "express";
import Post from '../models/Posts'


//Posts Controller class
class PostsCTR {
    async getPosts(req: Request, res: Response) {
        const quotes = await Post.find()
        res.json(quotes)
    }

    async createPost(req: Request, res: Response) {
        //Data from helpers function VerifyUserToken
        const userData = req.currentUser

        const {body, postTitle} = req.body


        const newPost = new Post({
            body: body,
            userName: userData.userName,
            postTitle: postTitle,
            createdAt: new Date().toISOString(),
            user: userData.id
        })

        const savePost = await newPost.save()

        res.json(savePost)
    }

    async getSpecificPost(req: Request, res: Response) {

        const post = await Post.findById({_id: req.params.id})

        res.json(post)
    }

    async deletePost(req: Request, res: Response) {
        //Data from helpers function VerifyUserToken
        const userData = req.currentUser

        try {
            //Before delete each of the quote the case to check and allow delete action,
            //only if the user want to delete own post not to another
            const findPostData = await Post.findById({_id: req.params.id})

            // Each of the user can delete only own post
            if (userData.userName === findPostData!.userName) {
                const result = await Post.findByIdAndDelete({_id: req.params.id})
                res.json(result)
            } else {
                res.json ({
                    errors: [{
                        AuthenticationError: 'Action not allowed 🔒',
                    }],
                    message: '👉 Bad request'
                })
            }
        } catch (error) {
            res.json({
                errors: [{...error}],
                message: 'Post ID not valid 🤬'
            })
        }
    }

    async updatePost(req: Request, res: Response) {
        //Data from helpers function VerifyUserToken
        const middlewareUserData = req.currentUser

        try {
            const findPostData = await Post.findById({_id: req.params.id})
            if (findPostData) {
                if (middlewareUserData.id === findPostData.user) {
                    const updatedPostData = {
                        postTitle: req.body.postTitle || findPostData.postTitle,
                        body: req.body.body || findPostData.body
                    }
                    const post = await Post.findByIdAndUpdate(req.params.id, updatedPostData, {new: true})

                    res.json(post)
                } else {
                    res.json ({
                        errors: [{
                            AuthenticationError: 'Action not allowed 🔒',
                        }],
                        message: '👉 Bad request'
                    })
                }
            } else {
                res.json({
                    errors: ['Post ID not valid 🤬'],
                    message: '👉 Bad request'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: {
                    ...error
                },
                message: 'Bad request 🤬'
            })
        }
    }
}
const PostsController = new PostsCTR
export default PostsController