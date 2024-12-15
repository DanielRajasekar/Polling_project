const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express();
const authRoute = require('./routes/auth');
const pollRoute = require('./models/Poll');


app.use(cors())
const corsOptions = {
    origin: '*',
    credential: true
};
app.use(cors(corsOptions));

//middleware
dotenv.config()
app.use(express.json());

app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/polls",pollRoute);


const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://admin:admin@cluster0.r8psb.mongodb.net/")
        console.log("database is connected sucsessfully!")
    }
    catch(err) {
        console.log("erro in database" + err)
    }
}
app.listen(8000, () => {
    
connectDB()
    console.log("app is running on port " + 8000)
})