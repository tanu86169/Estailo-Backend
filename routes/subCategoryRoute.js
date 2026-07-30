const express = require('express')
const subCategoryRouter = express.Router()
const {createSubCategory,deleteSubCategory,updateSubCategory,getSubCategoryByCategoryId,getSubAllCategory} = require('../controllers/subCategoryController')

const upload = require('../middleware/upload')

subCategoryRouter.post('/sub-create-category',upload.single('image'),createSubCategory)
subCategoryRouter.put('/sub-Update-category/:id',upload.single('image'),updateSubCategory)
subCategoryRouter.delete('/sub-delete-category/:id',deleteSubCategory)
subCategoryRouter.get('/get-sub-categoryById/:id',getSubCategoryByCategoryId)
subCategoryRouter.get('/get-sub-allCategory',getSubAllCategory)


module.exports = subCategoryRouter