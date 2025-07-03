const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoDB = require('./config/database');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hello, world!");
})

mongoDB()
    .then(() => {
        console.log("✅ Database is connected");
        app.listen(3000, ()=>{
            console.log("🚀 Server running on port 3000");
            
        });
    })
    .catch((error) => {
        console.log("❌ Database is not connected: ", error );
        
    })