const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = mongoose.connect(process.env.mongoURL);


module.exports = {
    connectToDB
}


