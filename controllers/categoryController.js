const Category = require('../models/category')
const cloudinary = require('../config/cloudinary')

const createCategory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Image not received"
            })
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'categories'
        })
        const category = await Category.create({
            categoryName: req.body.categoryName,
            image: result.secure_url,
            publicId: result.public_id,
            shopVibe:  req.body.shopVibe,
        })
        console.log(category)
        res.status(201).json({ message: "Category Created" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find({
            shopVibe : false
        });

        res.status(200).json({
            message: "Category found",
            category
        })
    } catch (error) {
        res.status(500).json({
            message: "server error during getting category"
        })
    }
}

const getAllCategory = async (req, res) => {
  try {
    const categoryData = await Category.find()

    res.status(200).json({
      message: "All Category Found",
      category: categoryData
    })

  } catch (error) {
    console.log("GET ALL CATEGORY ERROR:", error)

    return res.status(500).json({
      message: error.message,
      error
    })
  }
}


const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // New image upload hui hai
        if (req.file) {
            // Purani image delete karo
            if (category.publicId) {
                await cloudinary.uploader.destroy(category.publicId);
            }

            // New image upload karo
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "categories"
            });

            category.publicId = result.public_id;
            category.image = result.secure_url;
        }

        // Category name update
        category.categoryName =
            req.body.categoryName || category.categoryName;

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }
        await cloudinary.uploader.destroy(category.publicId)
        await category.deleteOne()
        res.status(200).json({
            message: "category deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "server error during deleted category", error
        })
    }
}

const getCategoryByShopVibe = async (req, res) => {
  try {
    const categories = await Category.find({ shopVibe: true });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getCategoryByShopVibe,
}