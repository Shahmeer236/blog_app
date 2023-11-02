const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const multer=require('multer');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const path=require("path");

const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");
const commentRoute=require("./routes/comments");

const User = require('./models/User');

dotenv.config();




//database connection
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db is connected")
    }
    catch(err)
    {
        console.log(err);
    }
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);
app.use("/images",express.static(path.join(__dirname,"/images")))



//Image Upload

// const storage=multer.diskStorage({
//     destination:(req,file,fn)=>
//     {
//         fn(null,"images")
//     },
//     filename:(req,file,fn)=>
//     {
//         fn(null,"222.jpg")
//     }
// })

// const upload=multer({storage:storage})
// app.post("/api/upload",upload.single("file"),(req,res)=>
// {
//     res.status(200).json("image has been uploaded successfuly")
// })




const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        // fn(null,"images")
        // fn(null,"222.jpg")
        fn(null,req.body.img)
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})




app.listen(5000,()=>
{
    connectDB();
    console.log("listening on port 5000")
});

app.get('/test', (req, res) => {
    res.send('Hello from the /test route!');
  });
  
