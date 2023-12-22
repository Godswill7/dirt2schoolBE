import cors from "cors";
import {
  Application,
  NextFunction,
  Request,
  Response,
  json,
} from "express";
import helmet from "helmet";
import morgan from "morgan";
import user from "./router/authRouter";
import bag from "./router/authRouter";
import fee from "./router/feeRouter";
import profileRouter from "./router/profileRouter";
import school from "./router/schoolRouter";
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";

const mainApp = (app: Application) => {

  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.set("view engine", "ejs");

    app.use("/api", user);
    app.use("/api", bag);
    app.use("/api", fee);
    app.use("/api", profileRouter);
    app.use("/api", school);


  app.use((req: any, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(HTTP.OK).json({
        message: "Success",
      });
    } catch (error: any) {
      return res.status(HTTP.BAD).json({
        message: "error",
        data: error.message,
      });
    }
  });

   app.use("*", (req: Request, res: Response, next: NextFunction) => {
     next(
       new mainError({
         name: "Route Error",
         message: `Incorrect url ${req.originalUrl} does not exist`,
         status: HTTP.BAD,
         success: false,
       })
     );
   });

  app.use(errorHandler);

};

export default mainApp;
