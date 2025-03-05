import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { databaseConnect, databaseDisconnect } from "./middlwares/database";

import userRoute from "./routes/userRoute";
import inventoryRoute from "./routes/inventoryRoute";
import inventMovementRoute from "./routes/inventMovementRoute";
import AppError from "./utils/AppError";

dotenv.config();

const PORT = process.env.PORT || 4004;

async function startServer() {
    await databaseConnect();
    const app = express();

    app.use(morgan("dev"));
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/inventory", inventoryRoute);
    app.use("/api/v1/inventMovement", inventMovementRoute);

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            message: "Welcome to my revised ERP system",
            env: "Bun runtime",
            version: "1.0.0",
            handledBy: `Process ${process.pid} on port ${PORT}`,
        });
    });

    // Handling unhandled routes
    app.use("*", (req: Request, res: Response, next: NextFunction) => {
        return next(new AppError(`This route ${req.originalUrl} is not yet defined...`, 401));
    });

    // Global error handling
    interface CustomError {
        statusCode: number;
        status: string;
        message: string;
    }

    app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
        let statusCode = err.statusCode || 500;
        let status = err.status || "Error";

        res.status(statusCode).json({
            status: status,
            message: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT} - Process ID: ${process.pid}`);
    });
}

startServer().catch(async (error) => {
    console.error(`Error starting server: ${error}`);
    await databaseDisconnect();
});
