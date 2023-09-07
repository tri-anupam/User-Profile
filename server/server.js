import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";
import dotenv from "dotenv";

const app = express();

//!middleware
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8000;

//!http GET request
app.get("/", (req, res) => {
  res.status(201).json("home GET request");
});

//!api routes
app.use("/api", router);

//start server only when we have valid connection
connect()
  .then(() => {
    try {
      //listen
      app.listen(port, () => {
        console.log(`Server is connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
