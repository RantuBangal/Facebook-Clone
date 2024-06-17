const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
require('dotenv').config();

const userRouter = express.Router() ;


// signup route
userRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password, profilePicture, coverPhoto, dateOfBirth } = req.body;
        const user = await UserModel.findOne({email});
        if (user) {
            res.status(201).json({msg: 'User already exists, Please signin'});
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(500).json({msg: "Password Hashing Failed", err});
                } else {
                    const user = {
                        username,
                        email,
                        password: hash,
                        profilePicture,
                        coverPhoto,
                        dateOfBirth
                    }
                    const userToAdd = new UserModel(user);
                    await userToAdd.save();
                    res.status(200).json({msg: "User Added to Database", user: userToAdd});
                }
            });
        }
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err});
    }
})

// login route
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body ;
    try {
        const userTryingToLogin = await UserModel.findOne({email});
        if (userTryingToLogin) {
            bcrypt.compare(password, userTryingToLogin.password, async (err, result) => {
                if (err) {
                    res.status(500).json({"Password DeHashing Failed": err});
                } else {
                    const token = jwt.sign({ userId: userTryingToLogin._id, username: userTryingToLogin.username }, process.env.tokenKey);
                    res.status(200).json({msg:"Login Successful", user: userTryingToLogin, token: token});
                }
            })
        } else {
            res.status(400).json({msg: "User does not exist"});
        }
    } catch (err) {
        res.status(400).json({ msg: "Error while logging in!" , err });
    }
})


// route for getting a user by their ID
userRouter.get("/:id", async (req, res) => {
	const userId = req.params.id;
	try {
		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Internal server error", err });
	}
});



// logout route
userRouter.get("/logout", (req, res) => {
	const token = req.headers.authorization;
	try {
		blacklist.push(token)
		res.status(200).json({ msg: "You have been logged out!" })
	}
	catch (err) {
		res.status(400).json({ msg: "Error while logging out!" , err })
	}

});




module.exports = {
    userRouter,
}
