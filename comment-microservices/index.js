import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express()
const PORT = process.env.PORT ?? 3000;

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(morgan("dev"))



app.listen(PORT,()=>{
    console.log(`server listening on port:${PORT}`);
    console.log(`127.0.0.1:${PORT}`);
    
    
})


// import routes from ./routes/index.js
import Routes from "./routes/index.js"
app.use("/api/v1/",Routes)


