const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

dotenv.config()
app.use(express.json())  //middleware to parse incoming JSON requests
app.use(cors())

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.Mongo_URI,)
    .then(() => {console.log("Databse Connected")
        console.log("DB Name:", mongoose.connection.name);
    })
    
    .catch((Error) => console.log(Error))


app.get('/',(req,res)=>{
     res.send("I am coming from backend")
})


const userRouter = require('./routes/userRoute')
app.use('/api/user',userRouter)

const categoryRouter = require('./routes/categoryRoute')
app.use('/api/category',categoryRouter)

const productRouter = require('./routes/productRoute')
app.use('/api/product',productRouter)

const orderRouter = require('./routes/orderRoute')
app.use('/api/order',orderRouter)

const subCategoryRouter = require('./routes/subCategoryRoute')
app.use('/api/subCategory',subCategoryRouter)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})