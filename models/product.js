const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    images: [{
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        }
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
        required: true
    },
    trending: {
        type: Boolean,
        default: false
    },
    favorite: {
        type: Boolean,
        default: false
    },
    antiTernish: {
        type: Boolean,
        default: false
    },
    newArrivals: {
        type: Boolean,
        default: false
    },
    hairAccessories: {
        type: Boolean,
        default: false
    },
    ownBox: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('product', productSchema)