import express, { Request, Response } from 'express';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
import { Server} from "socket.io";
import listenForEvents from './routes/socket';


const io = new Server(httpServer, {
    cors: { origin: "*" }
});

listenForEvents(io);






app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});



export default httpServer;