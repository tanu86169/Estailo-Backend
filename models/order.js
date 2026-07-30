const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            qty:Number,
            price:Number
        }
    ],
    totalAmount:Number,
    address:String,
    paymentType:{
        type:String,
        default:"Cash on Delivery"
    }
},{timestamps:true})

module.exports = mongoose.model('Orders',orderSchema)