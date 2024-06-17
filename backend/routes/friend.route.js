const express = require('express');
const { PostModel } = require('../models/post.model');
const { getUser } = require('../middlewares/getUser.middleware');
const { FriendshipModel } = require('../models/friendship.model');

const friendRouter = express.Router();


// get all friends
friendRouter.get("/", async (req, res) => {
    try{
        let friends = await FriendshipModel.find();
        res.status(200).json({friends});
    }
    catch(err){
        res.status(400).json({msg: "Error while getting friends", err})
    }
})

// send friend request
friendRouter.post("/send", getUser, async (req, res) => {
    let userId = req.user._id;
    let { reciever } = req.body;
    try{
        const request = new FriendshipModel({sender: userId, reciever});
        await request.save();
        res.status(200).json({msg: "Friend request sent successfully", post});
    }
    catch(err){
        res.status(400).json({msg: "Error while sending friend request", err})
    }
})

// confirm friend request
friendRouter.post("/confirm", getUser, async (req, res) => {
    let userId = req.user._id;
    let { reciever } = req.body;
    try{
        const request = new FriendshipModel.findOne({sender: userId, reciever});
        if (request) {
            request.status = 'accepted';
        }
        await request.save();
        res.status(200).json({msg: "Friend request accepted successfully", post});
    }
    catch(err){
        res.status(400).json({msg: "Error while accepting friend request", err})
    }
})


// delete friend request
friendRouter.post("/delete", getUser, async (req, res) => {
    let userId = req.user._id;
    let { reciever } = req.body;
    try{
        const request = new FriendshipModel.findOne({sender: userId, reciever});
        if (request) {
            request.status = 'declined';
        }
        await request.save();
        res.status(200).json({msg: "Friend request declined successfully", post});
    }
    catch(err){
        res.status(400).json({msg: "Error while declining friend request", err})
    }
})



module.exports = {
    friendRouter
}