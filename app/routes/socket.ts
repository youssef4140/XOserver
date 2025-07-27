import { Server, Socket } from 'socket.io';
import connections from '../Models/ConnectionModels';
import RoomsController from '../Controllers/RoomsController';
import GameController from '../Controllers/GameController';




export default function listenForEvents(io: Server) {
    io.on('connection', (socket: Socket) => {
        connections.add(socket.id);
            console.clear()

        console.log(connections.connections);

        socket.on('createRoom', () => RoomsController.createRoom(socket));

        socket.on('joinRoom', (roomId: string) => RoomsController.joinRoom(socket, roomId,io));

        socket.on('disconnect', () => RoomsController.disconnect(socket,io));

        socket.on('tik',(index:number)=> GameController.tik(index,socket,io));

        socket.on('playAgain',()=>RoomsController.newGame(socket,io))
    })
}