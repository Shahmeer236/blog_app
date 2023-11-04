const express = require('express');
const router =express.Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

// const { Schema } = mongoose;

//Register
router.post("/register",async(req, res)=>
{
    try{
        const {username,email,password}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=bcrypt.hashSync(password, salt);
        const newUser =new User({username,email,password:hashedPassword});
        const savedUser =await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})



//Login

router.post("/login",async(req,res)=>
{
    try{

        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json("user not found");

        }
        const match=await bcrypt.compare(req.body.password,user.password)
        if(!match)
        {
            return res.status(401).json("wrong Credentials");
        }
        // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        const token = jwt.sign({ _id: user._id,email:user.email,username:user.username }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Expires in 7 days

        const {password,...info}=user._doc;
        res.cookie("token",token).status(200).json(info);
        // res.status(200).json(user);
        // console.log(token);


    }
    catch(err){
        res.status(500).json(err)
    }
})



//Logout

router.get("/logout", async(req, res)=>
{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User loged out");

    }
    catch(err){
        res.status(500).json(err);
    }

})

//REFETCH USER

router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)

        // console.log(res);
    })
})


module.exports=router;