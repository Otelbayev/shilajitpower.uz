import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import routes from "./routes/index.js";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`)
);
