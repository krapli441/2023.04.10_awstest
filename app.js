import mysql2 from "mysql2";
import http from "http";
import fs from "fs";
import qs from "qs";
import { error } from "console";

// ? mysql에 접속하기 위해 통신 객체 설정.
const conn = mysql2.createConnection({
  host: "database-1.co26wyrjstj9.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "VHzmffkr1208",
  database: "rds_DB",
  port: 2080,
});

// ? mysql 접속 테스트
conn.connect(function (errors, result, fields) {
  if (errors) {
    throw errors;
  }
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
    let userData = "";
    request.on("data", function (data) {
      userData = userData + data;
    });
    request.on("end", function () {
      let parsedData = qs.parse(userData);
      console.log(parsedData);
      conn.connect(function (errors, result, fields) {
        if (errors) {
          throw errors;
        }
        console.log("db 연결 성공");
        let dataInsert = `INSERT INTO information (name, email) VALUES ('${parsedData.name}', '${parsedData.email}');`;
        conn.query(dataInsert, (err, result, fields) => {
          if (err) throw err;
          console.log(result);
        });
      });
    });
    response.end();
  }
});

server.listen(2080, function () {
  console.log("server is runnig...");
});
