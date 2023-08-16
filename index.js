import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from "morgan";
import users from './routes/User.js'


// CONFIGURATION

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());

// ROUTES

app.use('/api', users)

// MONGOOSE SETUP

const PORT = process.env.PORT || 9000;
const mongoString = process.env.MONGODB_URL.toString()
mongoose.set('strictQuery', false);
mongoose.connect(mongoString, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`))


}).catch((error)=> console.log(`${error} did not connect`))

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})