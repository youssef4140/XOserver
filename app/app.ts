// app.ts
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import listenForEvents from './routes/socket';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

console.log("Initializing Socket.IO...");

  listenForEvents(io);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default httpServer;
