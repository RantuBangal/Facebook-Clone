const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendshipSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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