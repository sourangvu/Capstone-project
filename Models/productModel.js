const mongoose = require('mongoose');

const ProductSchema =new mongoose.Schema({
    product:{
        image:String,
        title:String,
        price:Number,
        discount:Number,
    },
    
},{timestamps:true});

const ProductModel = mongoose.model("product", ProductSchema)

module.exports = ProductModel