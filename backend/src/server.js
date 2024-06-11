const express = require("express");
const http = require("http");
const winston = require("winston");
const cors = require("cors");
const debug = require("debug");

const app = express();
const server = http.createServer(app);
const port = 5001;
const routes = [];
//const debugLog = debug("app");

const UsersRouter = require("./Plank/routes");

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

const runningMessage = `Server running at http://localhost:${port}`;

app.use(express.json());
app.use(cors());

UsersRouter.routesConfig(app);

console.log("tesddt")

server.listen(port, () => {
    console.log(runningMessage, "runningMessage");
});
