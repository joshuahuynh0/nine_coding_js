import { listHandler } from "./listHandler.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.text({ type: "*/*" }));

const port = process.env.PORT || 3000;
app.listen(port);
app.post("/", listHandler);
