"user strict";

const config = require("./config/index");
const app = require("./app");
const chalk = require("chalk");
console.log(config)

const serverInfo = () => {
  console.log(
    chalk.blue(
      `🏁  Server running on : ${config.api.host}:${config.api.port} 🏁`
    )
  );
};

function runServer() {
  app.listen(config.api.port, serverInfo());
}
runServer();