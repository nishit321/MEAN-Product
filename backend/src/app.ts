import express from "express";
import mongoose from "mongoose";
var cors = require("cors");

import authorizationValidationMiddleware from "./middleware/AuthorizationValidation.Middleware";
import privateRoutes from "./route/private";
import publicRoutes from "./route/public";

// file containing security! check .gitignore to exclude all security concerning files from committing!!
const envs = require("../.env/envs");

export default class App {
  public app: express.Application;
  public port: number;
  public host: string;

  constructor(port: number, host: string) {
    this.app = express();
    this.app.use(cors());

    this.port = port;
    this.host = host;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  // run application and listen on specified hostname and port
  public listen(): void {
    this.app.listen(this.port, this.host, () => {
      console.log(`Server running at: ${this.host}:${this.port}`);
    });
  }

  // database connection using envs ./env/envs.json
  private connectToDatabase(): void {
    // mongodb connection data
    const mongodbEnvs = envs.mongodb_envs;

    // mongoose connection options
    const options: mongoose.ConnectionOptions = {
      user: mongodbEnvs.MONGO_USER,
      pass: mongodbEnvs.MONGO_PASSWD,
      // fix deprecation warnings and improve mongoose to mdb communication
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    // mongodb connection
    mongoose.connect(
      `mongodb://${mongodbEnvs.MONGO_HOSTNAME}:${mongodbEnvs.MONGO_PORT}/${mongodbEnvs.MONGO_DATABASE}`,
      options
    );
    // check if connection is established
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("connected to database"));
  }

  // middleware the application will use on every request cycle
  private initializeMiddlewares(): void {
    // json only
    this.app.use(express.json());
  }

  // register controllers at '/'
  private initializeRoutes(): void {
    // allow access to private APIs
    this.app.use(
      "/private/api",
      authorizationValidationMiddleware,
      privateRoutes
    );

    // allow access to public APIs
    this.app.use("/public/api", publicRoutes);
  }
}
