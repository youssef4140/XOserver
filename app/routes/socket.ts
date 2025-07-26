import { Server, Socket } from 'socket.io';
import connections from '../services/ConnectionManager';
import roomsController from '../Controllers/RoomsController';




export default function listenForEvents(io: Server) {
    io.on('connection', (socket: Socket) => {
        connections.add(socket.id);
            console.clear()

        console.log(connections.connections);

        socket.on('createRoom', () => roomsController.createRoom(socket));

        socket.on('joinRoom', (roomId: string) => roomsController.joinRoom(socket, roomId,io));

        socket.on('disconnect', () => roomsController.disconnect(socket,io));

    })
}