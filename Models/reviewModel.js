const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
        productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
        },
        rating:{
            type:Number,
            required:true,
            min: 1,
            max: 5,
        },
        comment:{
            type:String,
            trim:true,
            maxLength:500,
        },
        createdAt:{
            type:Date,
            default:Date.now,
        },

},{timestamps:true});

module.exports = new mongoose.model("Review", reviewSchema)