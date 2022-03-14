import { listHandler } from "./listHandler.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.text({ type: "*/*" }));

// app runs on port 3000
app.listen(3000);
app.post("/", listHandler);
