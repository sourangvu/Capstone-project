const { Product } = require("../Models/productModel");
const { Review } = require("../Models/reviewModel");

const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;

        //Validate if the product is exists
        const product = await Product.findById(productId)
        if(!product) {
            return res.status(404).json({ message:"Product not found"})

        }
        if (rating> 5 || rating < 1 ){
            return res.status(400).json({ message: "Please provide a proper rating" })
        }

        //Create or update the review
        const review = await Review.findOneAndUpdate(
            { userId , productId },
            { rating, comment },
            { new: true , upsert: true },
        )
        res.status(201).json({message:"Review created successfully", data: review });
    }
     catch (error) {

        res.status(error.status || 500).json({message: error.message || "Internal Server Error" })  
    }
}


const getProductReviews = async (req, res) => {
    try {
        const  productId  = req.params.id;
 
        const reviews = await Review.find({ productId })
        .populate("userId", "name")
        .sort({ createdAt:-1 });
        
        if (!reviews.length ) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }

        res.status(200).json({message:"Product reviews fetched", data : reviews });
        
    }catch (error) {

        res.status(500).json({message: error.message || "Internal Server Error" })  
    }
}



const deleteReview = async (req, res) => {
    try {
        const  reviewId  = req.params.id;

        const userId = req.user.id

        
        const review = await Review.findOneAndDelete({ _id: reviewId, userId })
        
        if (!review ) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.status(200).json({message:"Review deleted successfully"});
        
    }catch (error) {

        res.status(500).json({message: error.message || "Internal Server Error" })  
    }
}



const getAverageRating = async (req, res) => {
    try {
        const productId  = req.params.id;
        
        const reviews = await Review.find({ productId })
        
        if (!reviews.length ) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }
        const averageRating =reviews.reduce((sum, review ) => sum + review.rating, 0 ) / reviews.length;

        res.status(200).json({message:"Average rating fetched", data: averageRating });
        
    }catch (error) {

        res.status(500).json({message: error.message || "Internal Server Error" })  
    }
}

module.exports =  { addReview, getProductReviews, deleteReview, getAverageRating }





