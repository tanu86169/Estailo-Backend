const Product = require('../models/product')
const cloudinary = require('../config/cloudinary')
const { getAllCategory } = require('./categoryController')
const category = require('../models/category')

const createProduct = async (req, res) => {

  try {
    const {
      productName,
      price,
      description,
      category,
      subCategory,
      trending,
      favorite,
      antiTernish,
      newArrivals,
      hairAccessories,
      ownBox
    } = req.body
    

    let images = []
    for (const file of req.files) {
      const result =
        await cloudinary.uploader.upload(
          file.path,
          {
            folder: "products"
          }
        )

      images.push({
        url: result.secure_url,
        publicId: result.public_id
      })
    }
   


    const product = await Product.create({
      productName,
      price,
      description,
      category,
      subCategory,
      images,
      trending,
      favorite,
      antiTernish,
      newArrivals,
      hairAccessories,
      ownBox
    })


    res.status(201).json({
      message: "Product Created",
      product
    })

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    })
  }
}

const getProduct = async (req, res) => {
  try {

    const products = await Product.find({ 
      trending: false, 
      favorite: false, 
      antiTernish: false, 
      newArrivals: false, 
      hairAccessories: false ,
      ownBox:false
    })
      .populate('category')
      .populate('subCategory');

    if (!products) {
      return res.status(404).json({
        message: "Product Not Found"
      })
    }

    res.status(200).json({
      message: "Product Found",
      product: products
    })

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    })
  }
}

const getAllProduct = async (req, res) => {
  try {
    const productData = await Product.find()
      .populate("category")
       .populate('subCategory');


    return res.status(200).json({
      message: "All Products Found",
      product: productData
    });

  } catch (error) {
    console.log("GET ALL PRODUCT ERROR:", error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     for (const image of product.images) {
//       await cloudinary.uploader.destroy(image.public_id);
//     }
//     await Product.findByIdAndDelete(id);

//     res.json({
//       success: true,
//       message: "Product Deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const deleteProduct = async(req,res)=>{
  try {
    const product = await Product.findById(req.params.id)
    if(!product){
      res.status(404).json({
        message:"Product not Found"
      })
    }
    await product.deleteOne()
    res.status(200).json({
      message:"Product deleted"
    })
  } catch (error) {
    console.log(error)
  }
}



// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Product Updated",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


const updateProduct = async(req,res)=>{
  try {
    const product = await Product.findById(req.params.id)

    if(!product){
      return res.status(404).json({
        message:"Product not Found"
      })
    }
    if(req.file){
      if(product.publicId){
        await cloudinary.uploader.destroy(product.publicId)
      }
      const result = await cloudinary.uploader.upload(req.file.path,{
        folder:"product"
      })
      product.publicId = result.public_id;
      product.image = result.secure_url;
    }
    product.productName=
    req.body.productName ||  product.productName

    await product.save()
    res.status(200)({
      message:"Product Updated Successfully",
      product
    })
  } catch (error) {
    console.log(error)
  }
}

const getProductByTrend = async (req, res) => {
  try {
    const product = await Product.find({ trending: true })
    res.status(200).json({ message: "Data Found", product })
  } catch (error) {
    res.json("Error")
  }
}

const getProductByFavorite = async (req, res) => {
  try {
    const product = await Product.find({ favorite: true })
    res.status(200).json({
      message: "Favorite Data Found",
      product
    })
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    })
  }
}

const getProductByAntiTernish = async(req,res) =>{
  try {
    const product = await Product.find({ antiTernish:true})
    res.status(200).json({
      message:"Anti Ternish Data Found",
      product
    })
  } catch (error) {
    res.status(500).json({
      message:"Server Error",
      error:"error.message"
    })
  }
}

const getProductByNewArrivals = async (req, res) => {
  try {
    const product = await Product.find({
      newArrivals: true
    });

    console.log("NEW ARRIVALS PRODUCTS:", product);

    res.status(200).json({
      message: "Product Found",
      product
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

const getProductByHairAccessories = async (req, res) => {
  try {
    const product = await Product.find({
      hairAccessories: true
    });

    // console.log("HAIR ACCESSORIES PRODUCTS:", product);

    res.status(200).json({
      message: "Product Found",
      product
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// Own Box
const getProductByOwnBox = async (req, res) => {
  try {
    const product = await Product.find({
      ownBox: true
    });

    // console.log("OWN BOX PRODUCTS:", product);

    res.status(200).json({
      message: "Product Found",
      product
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


const getFilterProductBycategoryid = async(req,res)=>{
  try {
    const categoryid = req.params.id 
    const products = await Product.find({category:categoryid})
    res.json({
      message:"filter products found",products
    })
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductByTrend,
  getProductByFavorite,
  getProductByAntiTernish,
  getProductByNewArrivals,
  getProductByHairAccessories,
  getProductByOwnBox,
  getFilterProductBycategoryid
}


