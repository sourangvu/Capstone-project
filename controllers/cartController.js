const { Cart } = require("../Models/cartModel");
const { Product } = require("../Models/productModel");




const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const  cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }
        res.status(200).json({ message:"cart fetched successfully", data: cart });

    } catch (error) {

        res.status(error.status || 500).json({message:error.message || "Internal Server Error", error }) 
        
    }
}



const addProductToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body
        if (!productId) {
            return res.status(400).json({ message:"Please provide productId"})
        }

        // Find the product to ensure it exists and fetch its price
        const  product = await Product.findById( productId );
        
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
    

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products:[] });
        }

        // Check if the product is already in the cart
        const productExists = cart.products.some((item) => item.productId.equals(productId));

        if (productExists) {
            return res.status(400).json({ message: "Product already in the cart" })

        }

        // Add the product to the cart
        cart.products.push({
            productId, 
            price: product.price,
            
        })

        // Recalculate the total price
        cart.calculateTotalPrice();

        await cart.save();
        res.status(200).json({ message:"Product added to the cart", data:cart})

    } catch (error) {

        res.status(error.status || 500).json({message: error.message || "Internal Server Error" }) 
        
    }
}

const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const {productId} = req.body;
        
        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" }) 
        }

        // Remove the product from cart
        cart.products = cart.products.filter((item ) => !item.productId.equals(productId));

        // Recalculate the total price
        cart.calculateTotalPrice();

        // Save the cart
        await cart.save();
        res.status(200).json({ message:"Cart item removed", data:cart})

    } catch (error) {
        res.status(error.status || 500).json({message:error.message || "Internal Server Error", error })
    }

}
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        

        const cart = await Cart.findOne({ userId });
        cart.products = [];
        cart.calculateTotalPrice()
        await cart.save();

        res.status(200).json({ message:"Cart cleared successfully", data:cart})


    } catch (error) {
        res.status(error.status || 500).json({message:error.message || "Internal Server Error", error })
    }

}



module.exports = { getCart, addProductToCart, removeProductFromCart, clearCart }