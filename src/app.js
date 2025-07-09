const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoDB = require('./config/database');
const User = require('./model/user');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hello, world!");
})


app.post('/signup', async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        res.send("User Added successfully");

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

})

app.get('/find/:username', async (req, res) => {

    try {
        const { username } = req.params;

        if (!username) {
            return res.status(404).json({ success: false, message: "Username is required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, data: user });

    } catch (error) {
        res.json("Error :" + error.message);
    }
});



app.get('/feed', async (req, res) => {

    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        console.error("Error fetching users:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve users"
        });
    }
});

app.delete('/user', async (req, res) => {

    try {
        const userID = req.body.userID;
        const user = await User.findByIdAndDelete({ _id: userID });
        console.log(user);
        return res.status(200).json({ success: true, message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})


mongoDB()
    .then(() => {
        console.log("✅ Database is connected");
        app.listen(3000, () => {
            console.log("🚀 Server running on port 3000");

        });
    })
    .catch((error) => {
        console.log("❌ Database is not connected: ", error);

    })