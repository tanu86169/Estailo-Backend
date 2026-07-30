const SubCategory = require('../models/subCategory')
const cloudinary = require('../config/cloudinary')


const createSubCategory = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'subCategories'
        })
        const subCategory = await SubCategory.create({
            subCategoryName: req.body.subCategoryName,
            image: result.secure_url,
            publicId: result.public_id,
            CategoryId: req.body.CategoryId

        })
        return res.status(201).json({
            success: true,
            message: "SubCategory Created",
            subCategory
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error
        })
    }
}


const getSubAllCategory = async (req, res) => {
    try {
        const data = await SubCategory.find().populate("CategoryId")

        res.json({
            message: "All Sub Category Found",
            subCategory: data
        })
    } catch (error) {
        console.log(error)
    }
}


const getSubCategoryByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.id
        const data = await SubCategory.find({ CategoryId: categoryId })
        res.json({ message: "Data Found", data })
    } catch (error) {
        console.log(error);
    }
}


const  updateSubCategory = async(req,res)=>{
    try {
        const subCategory = await SubCategory.findById(req.params.id)

        if(!subCategory){
            return res.status(404).json({
                message:"subCategory not Found"
            })
        }
        if(req.file){
            if(subCategory.publicId){
                await cloudinary.uploader.destroy(subCategory.publicId)
            }

            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:"subCategories"
            })
            subCategory.publicId = result.public_id;
            subCategory.image = result.secure_url;
        }
        subCategory.subCategoryName = req.body.subCategoryName || subCategory.subCategoryName;

        await subCategory.save();
        res.status(200).json({
            message:"subCategory updated successfully",
            subCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}


const deleteSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id)
        if (!subCategory) {
            return res.status(404).json({
                message: "subCategory not found"
            });
        }
        await cloudinary.uploader.destroy(subCategory.publicId)
        await subCategory.deleteOne()
        res.status(200).json({
            success: true,
            message: "SubCategory Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createSubCategory,
    getSubCategoryByCategoryId,
    getSubAllCategory,
    deleteSubCategory,
    updateSubCategory
}