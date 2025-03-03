import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import os from "os";
import { spawn } from "bun";

import userRoute from "./routes/userRoute";
import inventoryRoute from "./routes/inventoryRoute";
import inventMovementRoute from "./routes/inventMovementRoute";
import AppError from "./utils/AppError";
import { databaseConnect, databaseDisconnect } from "./middlwares/database";

const numCores = os.cpus().length;
const BASE_PORT = 4004;

async function startServer(port: number) {
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
            handledBy: `Process ${process.pid} on port ${port}`,
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

    app.listen(port, () => {
        console.log(`Server listening on port ${port} - Process ID: ${process.pid}`);
    });
}

// Clustering logic
if (process.env.INSTANCE_ID) {
    const port = BASE_PORT + parseInt(process.env.INSTANCE_ID);
    startServer(port).catch(async (error) => {
        console.error(`Error starting server: ${error}`);
        await databaseDisconnect();
    });
} else {
    console.log(`Starting ${numCores} Bun instances...`);

    for (let i = 0; i < numCores; i++) {
        spawn([process.execPath, "run", "--watch", "App.ts"], {
            stdout: "inherit",
            stderr: "inherit",
            env: { INSTANCE_ID: i.toString() }, // Assign instance ID dynamically
        });
    }
} 
