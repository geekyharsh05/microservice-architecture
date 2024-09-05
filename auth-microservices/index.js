import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen( () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
