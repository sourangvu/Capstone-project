const { getProductDetails, getAllProducts, createProduct } = require("../../controllers/productController")
const { upload } = require("../../middlewares/multer")
const sellerAuth = require("../../middlewares/sellerAuth")

const productRouter = require("express").Router()


productRouter.get("/product-details/:id", getProductDetails)
productRouter.get("/get-all-products", getAllProducts)
productRouter.post("/create-product",sellerAuth, upload.single("image"), createProduct)
productRouter.put("/update-product")

productRouter.delete("/delete-product")



module.exports = productRouter