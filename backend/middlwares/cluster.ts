import { spawn } from "bun";
import os from "os";

const numCores = os.cpus().length;
console.log(`starting ${numCores} Bun instances...`); 

const workers = [];

for(let i=0; i< numCores; i++ ){
    const worker = spawn(["bun","run","App.ts"], {
        stdout:"inherit",
        stderr:"inherit"
    });

    workers.push(worker)
}