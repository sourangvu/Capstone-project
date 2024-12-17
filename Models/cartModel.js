const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    products:[{
        productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
        },
        price:{
            type:Number,
            required:true,

        },
    }],
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },

},{timestamps:true});


cartSchema.methods.calculateTotalPrice = function() {
    this.totalPrice = this.products.reduce((total, product) => total + product.price, 0);
}

const Cart = mongoose.model("Cart",  cartSchema);
module.exports = { Cart };
