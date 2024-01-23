import { itbook } from "./setupServer";
const express = require("express");
import dbconnect from "./setupDatabase";
import { configFile } from "./config";
import { generateToken } from "./shared/global/auth/generateToken";
class startApplication {
  public async initialize() {
    this.loadconfig();
    dbconnect();
    const app = express();
    const server: itbook = new itbook(app);
    server.start();
  }
  private loadconfig(): void {
    configFile.validatorConfig();
  }
}

const start: startApplication = new startApplication();
start.initialize();
