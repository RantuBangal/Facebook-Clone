const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// creating post schema
const postSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  likes: { 
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    default: [] 
  },
  comments: { 
    type: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }],
    default: []
  },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});
  

const PostModel = mongoose.model("posts", postSchema);

module.exports = {
    PostModel
};
