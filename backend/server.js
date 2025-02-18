import app from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";


const configPath = path.resolve("config", "uat.env");
console.log(configPath);
dotenv.config({ path: configPath });


const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1); // Exit the process with an error code if DB connection fails
  }
};

startServer();
