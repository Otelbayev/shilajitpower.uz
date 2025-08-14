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

app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

app.use(bodyParser.json());

// app.use(
//   "/uploads",
//   express.static(path.join(process.cwd(), "uploads"), {
//     setHeaders: (res) => {
//       res.set(
//         "Cache-Control",
//         "no-store, no-cache, must-revalidate, proxy-revalidate"
//       );
//     },
//   })
// );

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    maxAge: "7d", // 7 kun keshlash
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`)
);
