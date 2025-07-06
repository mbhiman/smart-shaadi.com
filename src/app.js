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
        res.status(400).send("Error saving user " + error.message);
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