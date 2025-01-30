import express,{ type NextFunction, type Request, type Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { databaseConnect, databaseDisconnect } from "./middlwares/database";

const app = express();
const port = 4004;

import userRoute from "./routes/userRoute";
import AppError from "./utils/AppError";
import inventoryRoute from "./routes/inventoryRoute";

app.use(morgan('dev'));

app.use(helmet())

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/inventory", inventoryRoute)

app.get("/", (req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome to my revised ERP system ",
        env: "Bun runtime",
        version:"1.0.0"
    })
})

// handling unhandled routes
app.use("*", (req:Request, res:Response, next:NextFunction)=>{
    return next( new AppError(`This route ${req.originalUrl} is not yet defined...`, 401))
})

// Global error handling
interface CustomeError{
    statusCode: number,
    status: string,
    message: string
}
app.use((err:CustomeError, req:Request, res:Response, next:NextFunction)=>{
    let statusCode = err.statusCode || 500;
    let status = err.status || 'Error';

    res.status(statusCode).json({
        status: status,
        message: err.message
    })
})
async function startServer(){
    await databaseConnect();

    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}...`)
    });
}
startServer().catch( async (error) =>{
    console.error(`Error starting server: ${error}`)

    await databaseDisconnect();
})