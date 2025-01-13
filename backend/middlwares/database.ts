import pg from "pg";
import dotenv from "dotenv";

dotenv.config()

const { Client } = pg ;

const client = new Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number (process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME
})

client.on('error', (err:Error) => {
    console.log(`Error connecting ${err.stack}`)
})

client.on('end', ()=>{
    console.log(`Database gracefully shutdown!!!..`)
})
export const databaseConnect = async function(){
    try {
        await client.connect();
        console.log(`Database connected susccessfully`)
    } catch (error) {
        console.log(`Error connecting ${error}`)
    }
}

export const databaseDisconnect = async function(){
    try {
        await client.end();
        console.log(`Database disconnected...`)
    } catch (error) {
        console.log(`Error disconnecting...`)
    }
}

export default client;