const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../models/User');
const Post=require('../models/Post');
const Comment=require('../models/Comment');
const verifyToken = require('../verifyToken');


// updateUser
router.put("/:id",verifyToken,async (req,res) => { 

    try{
        if(req.body.password)
        {
            const salt=await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password,salt);
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);
    }

    catch(err)
    {
        res.status(500).json(err);
    }
  }
)


//deleteUser

router.delete("/:id",verifyToken,async (req,res) => { 

    try{
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({userId:req.params.id});
        await Comment.deleteMany({userId:req.params.id});
        res.status(200).json("user has been deleted");

    }

    catch(err)
    {
        res.status(500).json(err);
    }
  }
)

//getUser
// router.get("/:id",async (req,res) => { 

//     try{
        
//         await User.findById(req.params.id);
//         res.status(200).json(User);
//     }

//     catch(err)
//     {
//         res.status(500).json(err);
//     }
//   }
// )




//getUser
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User not found");
      }
      const { password, ...userInfo } = user._doc;
      res.status(200).json(userInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports =router;




