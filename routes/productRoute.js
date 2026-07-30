const express = require('express')
const productRouter = express.Router()

const {createProduct,
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
} = require('../controllers/productController')

const upload = require('../middleware/upload')
const auth = require('../middleware/auth')



productRouter.post('/create',auth,upload.array('images',5),createProduct)
productRouter.put("/update/:id",auth,upload.array('image',5),updateProduct)
productRouter.delete("/delete/:id",auth,deleteProduct)
productRouter.get('/get-all',getProduct)
productRouter.get('/get-all-product',getAllProduct)


productRouter.get('/get-trends',getProductByTrend)
productRouter.get('/get-favorites',getProductByFavorite)
productRouter.get('/get-antiTernish',getProductByAntiTernish)
productRouter.get('/get-newArrivals',getProductByNewArrivals)
productRouter.get('/get-hairAccessories',getProductByHairAccessories)
productRouter.get('/get-ownBox',getProductByOwnBox)

productRouter.get("/get-product-bycategoryid/:id",getFilterProductBycategoryid)



module.exports = productRouter