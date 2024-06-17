const express = require('express');
const { PostModel } = require('../models/post.model');
const { getUser } = require('../middlewares/getUser.middleware');
const { checkLogin } = require('../middlewares/checkLogin.middleware');

const postRouter = express.Router();


// get all post routes
postRouter.get("/all", async (req, res) => {
    try{
        let posts = await PostModel.find();
        res.status(200).json({posts});
    } catch (err) {
        res.status(400).json({msg: "Error while getting posts", err})
    }
})


// adding posts
postRouter.post("/create", getUser, async (req, res) => {
    let userId = req.user._id;
    let { content, imageUrl } = req.body;
    try{
        const post = new PostModel({userId, content, imageUrl});
        await post.save();
        res.status(200).json({msg: "Post added successfully", post});
    } catch (err) {
        res.status(400).json({msg: "Error while creating posts", err})
    }
})


// get post by id
postRouter.get("/:id", async (req, res) => {
    try{
        let post = await PostModel.findById(req.params.id);
        res.status(200).json({msg: "Post found", post});
    } catch (err) {
        res.status(400).json({msg: "Error while getting post by id", err})
    }
})

// update posts
postRouter.post("/update/:id", getUser, async (req, res) => {
    let userId = req.user._id;
    let _id = req.params.id;
    let { content, imageUrl } = req.body;
    try{
        const postToUpdate = await PostModel.findOne({_id});
        if (postToUpdate) {
            if (userId !== postToUpdate.userId) {
                res.status(400).json({msg: "Not authorized to update this post"});
                return;
            } else if (userId === postToUpdate.userId) {
                postToUpdate.content = content;
                postToUpdate.imageUrl = imageUrl;
                await postToUpdate.save();
                res.status(200).json({msg: "Post updated successfully", post: postToUpdate});
            } 
        } else {
            res.status(400).json({msg: "Post does not exist"});
        }
    } catch (err) {
        res.status(400).json({msg: "Error while updating posts", err})
    }
})


// delete posts
postRouter.post("/update/:id/delete", getUser, async (req, res) => {
    let userId = req.user._id;
    let _id = req.params.id;
    try{
        const postToDelete = await PostModel.findOneAndDelete({ _id, userId });
        res.json({ msg: "Post deleted successfully", post: postToDelete });
    } catch (err) {
        res.status(400).json({msg: "Error while deleting posts", err})
    }
})



//----------------------- comments ----------------------//

// add comments in post
postRouter.post("/update/:id/comment/add", getUser, async (req, res) => {
    let userId = req.user._id;
    let _id = req.params.id;
    let { content } = req.body;
    try{
        const postToUpdate = await PostModel.findOne({_id});
        if (postToUpdate) {
            commentsArr = postToUpdate.comments
            commentsArr.push({userId, content})
            postToUpdate.comments = commentsArr
            await postToUpdate.save();
            res.status(200).json({msg: "comment added successfully", post: postToUpdate});
        } else {
            res.status(400).json({msg: "Post does not exist"});
        }
    } catch (err) {
        res.status(400).json({msg: "Error while creating comment", err})
    }
})


// update comments in post
postRouter.post("/update/:id/comment/update", getUser, async (req, res) => {
    let userId = req.user._id;
    let _id = req.params.id;
    let { content } = req.body;
    try{
        const postToUpdate = await PostModel.findOne({_id});
        if (postToUpdate) {
            commentsArr = postToUpdate.comments
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].userId === userId) {
                    commentsArr[i].content = content
                }
            }
            postToUpdate.comments = commentsArr
            await postToUpdate.save();
            res.status(200).json({msg: "comment updated successfully", post: postToUpdate});
        } else {
            res.status(400).json({msg: "Post does not exist"});
        }
    } catch (err) {
        res.status(400).json({msg: "Error while updating comment", err})
    }
})


// delete comments in post
postRouter.post("/update/:id/comment/delete", getUser, async (req, res) => {
    let userId = req.user._id;
    let _id = req.params.id;
    let { content } = req.body;
    try{
        const postToUpdate = await PostModel.findOne({_id});
        if (postToUpdate) {
            commentsArr = postToUpdate.comments
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].userId === userId) {
                    commentsArr.splice(i, 1)
                }
            }
            postToUpdate.comments = commentsArr
            await postToUpdate.save();
            res.status(200).json({msg: "comment deleted successfully", post: postToUpdate});
        } else {
            res.status(400).json({msg: "Post does not exist"});
        }
    } catch (err) {
        res.status(400).json({msg: "Error while deleting comment", err})
    }
})



module.exports = {
    postRouter
}