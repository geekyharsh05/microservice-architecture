import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import Routes from "./routes/index.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// app.use("/api/v1", Routes);

app.get("/", (req, res) => {
  return res.json({ message: "It's working post micro ..." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
