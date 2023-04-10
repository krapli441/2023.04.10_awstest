import mysql2 from "mysql2";
import http from "http";
import fs from "fs";

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    const url = request.url;
    let filePath = "." + url;
    if (filePath === "./") {
      filePath = "./index.html";
    }

    if (request.url === "/favicon.ico") {
      return;
    }

    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        throw error;
      }
      if (url.endsWith(".html")) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      }
      console.log(data);
      response.write(data);
      response.end();
    });
  }
});

server.listen(2080, function () {
  console.log("server is runnig...");
});
