const express = require('express')
const categoryRouter = express.Router()


const upload = require('../middleware/upload')
// const auth = require('../middleware/auth')


const { createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryByShopVibe,
  getAllCategory,
} = require('../controllers/categoryController')

categoryRouter.post('/create-category',upload.single('image'),createCategory)
categoryRouter.put('/update-category/:id',upload.single('image'),updateCategory)
categoryRouter.delete('/delete-category/:id',deleteCategory)

categoryRouter.get('/all-category', getCategory)
categoryRouter.get('/get-shopVibe',getCategoryByShopVibe)
categoryRouter.get('/get-all-category',getAllCategory)



module.exports = categoryRouter