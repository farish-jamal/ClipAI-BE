import "dotenv/config";
import http from "http";
import app from "./app";
import prisma from "./prisma/client";

const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;

if (!PORT || !DATABASE_URL) {
   console.error(`Missing required environment variables:`, { PORT, DATABASE_URL });
   process.exit(1);
}

(async () => {
   try {
      await prisma.$connect();
      console.log("Connected to the database successfully.");
   } catch (error) {
      console.error("Failed to connect to the database:", error);
      process.exit(1);
   }
})();

const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});
