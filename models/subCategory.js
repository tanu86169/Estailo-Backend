const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    subCategoryName:{
        type:String,
    },
    image:{
        type:String,
    },
    publicId:{
        type:String,
        required:true
    },
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'category'
    }
})

module.exports= mongoose.model('subCategory', subCategorySchema)