import express from "express";
import WebSocket from "ws";
import fs from "fs";
import NodeWebcam from "node-webcam";

const opts: NodeWebcam.WebcamOptions = {
  width: 1280,
  height: 720,
  quality: 100,
  frames: 60,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "base64",
  verbose: false,
};
const Webcam = NodeWebcam.create(opts);

const app: express.Express = express();
const wss = new WebSocket.Server({ port: 8000 });

let clients: WebSocket[] = [];
let id: number;

const captureAndSend = () => {
  // capture
  Webcam.capture("test_picture", function (err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
    // send clients
    clients.forEach((client) => {
      client.send(data);
    });
  });
};

const frame = 1000 / 30;
setInterval(captureAndSend, frame);

wss.on("connection", (ws: WebSocket) => {
  id = Math.floor(Math.random() * 999999999);
  console.log(id, " : 接続されました。");
  clients.push(ws);

  ws.on("close", () => {
    console.log(id, " : 切断されました。");
    delete clients[id];
  });
});

app.get("/", (req: express.Request, res: express.Response) => {
  fs.readFile("./src/video/client.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});

app.listen(8080);
console.log("Server is running on port 8080");
