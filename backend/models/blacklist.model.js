const mongoose = require("mongoose")

const tokenSchema = mongoose.Schema({
	token: String
},{
	versionKey: false
})

const BlackListTokenModel = mongoose.model("blacklistedTokens", tokenSchema)

module.exports = {
	BlackListTokenModel,
}