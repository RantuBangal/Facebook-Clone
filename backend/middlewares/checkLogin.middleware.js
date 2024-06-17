
const checkLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({ msg: "Not logged in !, Please login first" });
        }
        next();
    } catch (error) {
        res.status(400).json({ msg: "invalid token" });
    }
}


module.exports = {
    checkLogin
}
