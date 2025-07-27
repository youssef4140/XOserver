import { Server, Socket } from 'socket.io';
import rooms from '../services/RoomManager';
import connections from '../services/ConnectionManager';
export default {
    createRoom(socket: Socket) {
        try {
            const roomId = rooms.create();
            rooms.join(roomId, socket.id);
            connections.update(socket.id, roomId);
            socket.join(roomId);
            let room = rooms.get(roomId);

            socket.emit('roomCreated', { room: room });
        } catch (error) {
            console.error((error as Error).message);
            socket.emit('error', { message: (error as Error).message });
            return;
        }
    },

    joinRoom(socket: Socket, roomId: string, io: Server) {
        try {

            rooms.join(roomId, socket.id);
            let oldRoomId = connections.getRoomID(socket.id);
            if (oldRoomId) {
                rooms.removePlayer(oldRoomId, socket.id);
                io.to(roomId).emit('playerLeft', { room: rooms.get(roomId) })

            }
            connections.update(socket.id, roomId);
            socket.join(roomId);
            let room = rooms.get(roomId);
            if (!room) {
                throw new Error(`Room ${roomId} does not exist.`);
            }
            io.to(roomId).emit('roomUpdated', { room: room })



            if (room.ready) {
                Object.keys(room.players).forEach((p)=>{
                    io.sockets.to(p).emit('roomReady',{ room: room, sign: room.players[p] })
                })
                // socket.to(roomId).emit('roomReady', { room: room, sign: room.players[socket.id] });
                
            }

        } catch (error) {
            console.error((error as Error).message);
            socket.emit('error', { message: (error as Error).message });
            return;
        }
    },
    disconnect(socket: Socket, io: Server) {
        let roomId = connections.getRoomID(socket.id);

        connections.remove(socket.id);
        if (!roomId) {
            console.warn(`No room found for socket ID: ${socket.id}`);
            return;
        }
        let room = rooms.removePlayer(roomId, socket.id);
        io.to(roomId).emit('playerLeft', { room: room })

    }
}