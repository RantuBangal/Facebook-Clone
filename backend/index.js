const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const { postRouter } = require("./routes/post.route");
const { friendRouter } = require("./routes/friend.route");
const { messageRouter } = require("./routes/message.route");
const { notificationRouter } = require("./routes/notification.router");
require('dotenv').config();


// initialising app
const app = express();


// using middlewares
app.use(express.json())
app.use(express.text())
app.use(cors());


// routes
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/friend", friendRouter)
app.use("/message", messageRouter)
app.use("/notifications", notificationRouter)



// listening to the server
app.listen(process.env.PORT, async () => {
    try{
        await connectToDB;
        console.log("Connected to DB");
        console.log(`Server is running on port ${process.env.PORT}`);
    }
    catch(err){
        console.log(err);
    }
})