const { getProductReviews, addReview, getAverageRating, deleteReview } = require('../../controllers/reviewController')
const userAuth = require('../../middlewares/userAuth')

const reviewRouter = require('express').Router()


reviewRouter.get("/get-reviews/:id", userAuth, getProductReviews)
reviewRouter.post("/add-review", userAuth, addReview)
reviewRouter.get("/average-rating/:id", userAuth, getAverageRating )
reviewRouter.delete("/delete-reviews/:id",userAuth, deleteReview )


module.exports = reviewRouter