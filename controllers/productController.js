const { cloudinaryInstance } = require("../config/cloudinaryConfig")
const { Product } = require("../Models/productModel")


const getAllProducts = async (req, res ) =>{
    try {
       const productList = await Product.find()
       
    
       res.status(200).json({message:" Product list fetched", data: productList })
    } catch (error) {
      res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

const getProductDetails = async (req, res ) =>{
    try {

        const productId = req.params.id;

        const productDetails = await Product.findById(productId);
       
       res.status(200).json({message:" Product details fetched", data: productDetails })
       
    } catch (error) {
      res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}


const createProduct = async (req, res ) =>{
    try {

        const {image,title,description,price} = req.body;
        console.log('req.file=====',req.file)

        if(!title || !description || !price){
            return res.status(400).json({message:" All properties required"});
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
        console.log("upload result=====", uploadResult);

          const newproduct = new Product({image : uploadResult.url,title,description,price})
          await newproduct.save()
    
       res.status(200).json({message:"New product created successfully", data: newproduct})
    
    
    } catch (error) {
      res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}


module.exports = { getAllProducts, getProductDetails, createProduct }