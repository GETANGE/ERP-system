import express,{ type Request, type Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { databaseConnect, databaseDisconnect } from "./middlwares/database";

const app = express();
const port = 4004;

import userRoute from "./routes/userRoute";

app.use(morgan('dev'));

app.use(helmet())

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);

app.get("/", (req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome to my revised ERP system ",
        env: "Bun runtime",
        version:"1.0.0"
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