const Order = require("../models/order");

exports.createOrder = async (req,res)=> {
    try{
        const {items, totalAmount, address, paymentType} = req.body
        const order = await Order.create({
            user:req.user.userId,
            items,
            totalAmount,
            address,
            paymentType
        })
        res.status(200).json({
            message:"Order created successfully",
        })
    } catch (error) {
        res.status(500).json({
            message:"Error creating order",
        })
    }
}