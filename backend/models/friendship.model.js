const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendshipSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reciever: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
},{
    versionKey: false
});



const FriendshipModel = mongoose.model("friendships", friendshipSchema);


module.exports = {
    FriendshipModel
}