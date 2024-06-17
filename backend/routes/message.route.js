const express = require('express');
const { MessageModel } = require('../models/message.schema');

const messageRouter = express.Router();

// get all messages
messageRouter.get("/", async (req, res) => {
    try{
        let messages = await MessageModel.find();
        res.status(200).json({messages});
    }
    catch(err){
        res.status(400).json({msg: "Error while getting messages", err})
    }
})


// get message by id
messageRouter.get("/:id", async (req, res) => {
    try{
        let message = await MessageModel.findById(req.params.id);
        res.status(200).json({message});
    }
    catch(err){
        res.status(400).json({msg: "Error while getting messages", err})
    }
})


// adding messages
messageRouter.post("/add", async (req, res) => {
    let { sender, receiver, content, seen } = req.body;
    try{
        const message = new MessageModel({sender, receiver, content, seen});
        await message.save();
        res.status(200).json({msg: "Message added successfully"})
    }
    catch(err){
        res.status(400).json({msg: "Error while adding messages", err})
    }
})



module.exports = {
    messageRouter
}