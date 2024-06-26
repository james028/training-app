const express = require("express");
const http = require("http");
const winston = require("winston");
const cors = require("cors");
const debug = require("debug");

const app = express();
const server = http.createServer(app);
const port = 5001;
//const debugLog = debug("app");

const PlankRouter = require("./Plank/routes");
const TrainingTypeRouter = require("./TrainingType/routes");

const loggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, make terse
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(cors());

PlankRouter.routesConfig(app);
TrainingTypeRouter.routesConfig(app);

const runningMessage = `Server running at http://localhost:${port}`;

server.listen(port, () => {
  console.log(runningMessage, "runningMessage");
});
