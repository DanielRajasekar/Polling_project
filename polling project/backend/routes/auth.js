const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // Use bcrypt.hash instead of hashSync for async

        const newUser  = new User({ username, password: hashedPassword });
        const savedUser  = await newUser.save(); // Call save() as a function

        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login
router.post('/login', async(req,res)=>{
    try{
        // const {email,password}=req.body;
        const user= await User.findOne({username:req.body.username});
        if(!user) {
            return res.status(404).json('User not found')
        }

        const match = await bcrypt.compare(req.body.password,user.password);

        if(!match){
            return res.status(404).json('Wrong password')
        }
        const token = jwt.sign({_id:user._id,username:user.username},
            "Daniel",{expiresIn:"3d"})
            const {password, ...info}= user._doc

            res.cookie("token",token,{
                httpOnly:true,
                secure:true,
                sameSite:"none",
            }).status(200).json(info)

}
catch(err){
    res.status(500).json(err)
}

});


// Logout
router.get('/logout', async(req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none", secure:true})
        .status(200).send("User logout success");
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;