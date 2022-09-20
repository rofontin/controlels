const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const server = http.createServer(app);

server.listen(port, HOST);