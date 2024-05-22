import express from "express";
// import colors from "colors";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "../server/src/routes/authRoute.js"
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../server/swagger.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);


//rest object
const app = express();


// const port = 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Your application routes go here...
dotenv.config()

//database config
connectDB();  

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));


//routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


//rest api
app.use("*", function(req, res){
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});




app.get("/", (req, res) => {
  res.send("<h1>This is server page</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
