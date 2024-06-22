import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
let server: Server;
async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        server = app.listen(config.port, () => {
            console.log(`Example app listening config.port ${config.port}`);
        });

    } catch (error) {
        console.error(error)
    }
}

main();
process.on("unhandledRejection", () => {
    console.log("Unhandled Rejection is detected, Shutting down...")
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on('uncaughtException', () => {
    console.log("uncaught Exception is detected, shutting down");
    process.exit(1)
})