const express = require('express');
const { PostModel } = require('../models/post.model');
const { getUser } = require('../middlewares/getUser.middleware');
const { FriendshipModel } = require('../models/friendship.model');

const notificationRouter = express.Router();




module.exports = {
    notificationRouter
}