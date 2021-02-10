import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import Posts from "./routes/Posts";
import Users from "./routes/Users";

//Create express app
const app = express();

//Config Object to Avoid Deprecation Warnings
const config = { useNewUrlParser: true, useUnifiedTopology: true };

//Set URI
const MONGODB: string | number =
  process.env.MONGODB || "mongodb://localhost/moon";

//Database
mongoose.connect(MONGODB, config);

//Store Connection Object
const db = mongoose.connection;

//CONNECTION EVENTS
db.once("open", () => {
  console.log("Connected to MongoDB database...");
}).on("error", (err: string) => {
  console.log(err);
});

//Middleware
app.use(bodyParser.json());
const HOST: string | number = process.env.HOST || "http://localhost:9006";
app.use(
  cors({
    credentials: true,
    origin: HOST,
  })
);

//Routes
app.use("/posts", Posts);
app.use("/users", Users);
app.get("/start", (_, res) => res.send("SUCCESS 🔥"));

//Port
const PORT: string | number = process.env.PORT || 9111;

//Starting server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
