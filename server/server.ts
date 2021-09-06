import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import apiRouter from "./router";

dotenv.config();
const app = express();
const port = process.env.PORT || 3080;

app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
