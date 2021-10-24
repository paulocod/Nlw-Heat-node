import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`1 usuário se conectou ${socket.id}`);
});

app.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };
