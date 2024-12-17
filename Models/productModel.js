const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image:{
        type: String,
        default:"https://static.thenounproject.com/png/1077596-200.png"
    },
    title:{
        type: String,
        required:true,
        minLength: 3,
        maxLength:30,
        unique:true,
    },
    description:{
        type: String,
        required:true,
        minLength:10,
        maxLength:300,
    },
    price:{
        type: Number,
        required:true,

    },
    seller:{ type:mongoose.Types.ObjectId, ref:"Seller"},
    
},{timestamps:true});

const Product = mongoose.model("Product", ProductSchema)

module.exports = { Product };