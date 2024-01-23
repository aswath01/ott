import { Requests } from "./shared/global/requests/validateRequest";
import {
  Application,
  json,
  urlencoded,
  Response,
  Request,
  NextFunction,
  application,
} from "express";
import http, { Server } from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import cookieSession from "cookie-session";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";
import compression from "compression";
import { configFile } from "./config";
import { response200 } from "./shared/global/responses/sucessResponse";
import verifyToken from "./shared/global/auth/verifyToken";
import { generateToken } from "./shared/global/auth/generateToken";
// import { Server } from "http";

export class itbook {
  private apiVersion = "api/v1";
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  SERVER_PORT = 3000;
  public start(): void {
    this.standardMiddleware(this.app);
    this.securityMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalHandler(this.app);
    this.startServer(this.app);
  }
  private standardMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: "session",
        keys: [`${configFile.SECRET_KEY_ONE!}`, `${configFile.SECRET_KEY_TWO}`],
        maxAge: 24 * 7 * 3600000,
        secure: false,
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
      })
    );
  }
  private securityMiddleware(app: Application): void {
    app.use(compression());
    app.use(
      json({
        limit: "50mb",
      })
    );
    app.use(
      urlencoded({
        extended: true,
        limit: "50mb",
      })
    );
  }

  private routesMiddleware(app: Application): void {
    /**
     * To check the health of the Application.
     */
    app.post("/createUser", async (req, res) => {
      try {
        const token = await generateToken("santhosh", "admin");
        return response200(res, token);
      } catch (error) {}
    });
    app.get(
      "/ping",
      verifyToken,
      Requests.validationRequest,
      (req: Request, res) => {
        console.log({ req: req });
        response200(res, "data");
      }
    );
    /**
     * movies
     */
    app.use(`${this.apiVersion}/movies`, () => {});
  }
  private globalHandler(app: Application): void {}
  private startServer(app: Application): void {
    try {
      const httpserver: http.Server = new http.Server(app);
      this.startHttpServer(httpserver);
    } catch (error) {
      console.log(error);
    }
  }
  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(this.SERVER_PORT, () => {
      console.log(`server listening on ${this.SERVER_PORT}`);
    });
  }
}
