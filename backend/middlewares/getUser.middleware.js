const { UserModel } = require('../models/user.model');

require('dotenv').config();


const getUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({ msg: "Not logged in !, Please login first" });
        }
        const decoded = jwt.verify(token, process.env.tokenKey);
        const user = await UserModel.findById(decoded.userId);
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ msg: "Not logged in !, Please login first" });
    }
}


module.exports = {
    getUser
}
