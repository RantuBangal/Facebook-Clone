const express = require('express');
const { PostModel } = require('../models/post.model');

const postRouter = express.Router();


// get all post routes
postRouter.get("/", async (req, res) => {
    try{
        let posts = await PostModel.find();
        res.status(200).json({posts});
    }
    catch(err){
        res.status(400).json({msg: "Error while getting posts", err})
    }
})


// get post by id
postRouter.get("/:id", async (req, res) => {
    try{
        let post = await PostModel.findById(req.params.id);
        res.status(200).json({post});
    }
    catch(err){
        res.status(400).json({msg: "Error while getting posts", err})
    }
})


// adding posts
postRouter.post("/add", async (req, res) => {
    let user = req.userID;
    let { content, imageUrl, likes, comments, createdAt } = req.body;
    try{
        const post = new PostModel({user: user, content, imageUrl, likes, comments, createdAt});
        await post.save();
        res.status(200).json({msg: "Post added successfully"})
    }
    catch(err){
        res.status(400).json({msg: "Error while adding posts", err})
    }
})


module.exports = {
    postRouter
}