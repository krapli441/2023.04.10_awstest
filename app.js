import mysql2 from "mysql2";
import http from "http";
import fs from "fs";

// ? mysql에 접속하기 위해 통신 객체 설정.
const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "VHzmffkr1208",
  database: "user_info",
  port: 3306,
  socketPath: "/tmp/mysql.sock",
});

// ? mysql 접속 테스트
conn.connect(function (errors, result, fields) {
  if (errors) {
    throw errors;
  }
  console.log("mysql is connected");
});

// ? 서버 객체 설정
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
      response.write(data);
      response.end();
    });
  }

  if (request.method === "POST" && request.url.startsWith("/accountSubmit")) {
    console.log("버튼테스트");
    response.end();
  }
});

server.listen(2080, function () {
  console.log("server is runnig...");
});
