import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import { error } from "console";
import Logging from "./library/Logging";
import authorRoutes from "./routes/Author";
import bookRoutes from "./routes/Book";

const router = express();

/** connect to mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to mongoDB. ");
    StartServer(); // Call the StartServer function to start the server
  })
  .catch((error) => {
    Logging.error("Unable to connect: ");
    Logging.error(error);
  });

/** only startthe server if mongo connects*/
const StartServer = () => {
  router.use((req, res, next) => {
    /** log the request */
    Logging.info(
      `Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    /** log the response */
    res.on("finish", () => {
      Logging.info(
        `Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** rules of our API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      res.status(200).json({});
    }
    next();
  });

  /** routes */
  router.use("/authors", authorRoutes);
  router.use("/books", bookRoutes);

  /** healthcheck */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  /** error handling */
  router.use((req, res, next) => {
    const error = new Error(" Not found");
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.Server.port, () =>
      Logging.info(`Server is running on port ${config.Server.port}.`)
    );
};
