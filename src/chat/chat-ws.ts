import express from "express";
import WebSocket from "ws";
import fs from "fs";

const app: express.Express = express();
const wss = new WebSocket.Server({ port: 8000 });

let clients: WebSocket[] = [];
let id: number;

wss.on("connection", (ws: WebSocket) => {
  id = Math.floor(Math.random() * 999999999);
  console.log(id, " : 接続されました。");
  clients.push(ws);

  ws.on("message", (message) => {
    console.log("received: %s", message);
    ws.send("self message : " + message);

    for (let i = 0; i < clients.length; i++) {
      if (clients[i] !== ws) {
        clients[i].send("other message : " + message);
      }
    }
  });

  ws.on("close", () => {
    console.log(id, " : 切断されました。");
    delete clients[id];
  });
});

app.get("/", (req: express.Request, res: express.Response) => {
  fs.readFile("./src/chat/index.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});

app.listen(8080);
console.log("Server is running on port 8080");
