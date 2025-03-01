import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoute from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'


const app = express()

//middlewares
dotenv.config()

//database confiq`
connectDB()


//esmodule fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,"./client/build")))


//routees
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoute)




//rest api
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const port = process.env.PORT || 8080 
 
app.listen(port,(req, res) =>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white)
})
