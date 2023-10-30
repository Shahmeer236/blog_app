const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema=new Schema({

    comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

},{timestamps:true}
)

module.exports=mongoose.model('Comment',CommentSchema); 