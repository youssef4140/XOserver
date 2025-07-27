import { Server, Socket } from 'socket.io';
import rooms from '../Models/RoomModel';
import connections from '../Models/ConnectionModels';
export default {
    createRoom(socket: Socket) {
        try {
            const room = rooms.createAndJoin(socket.id);
            connections.update(socket.id, room.id);
            socket.join(room.id);
            socket.emit('roomCreated', { room: room });
        } catch (error) {
            console.error((error as Error).message);
            socket.emit('error', { message: (error as Error).message });
        }
    },

    joinRoom(socket: Socket, roomId: string, io: Server) {
        try {

            rooms.join(roomId, socket.id);
            let oldRoomId = connections.getRoomID(socket.id);
            if (oldRoomId) {
                rooms.leave(oldRoomId, socket.id);
                io.to(roomId).emit('playerLeft', { room: rooms.get(roomId) })

            }
            connections.update(socket.id, roomId);
            socket.join(roomId);
            let room = rooms.get(roomId);
            if (!room) {
                throw new Error(`Room ${roomId} does not exist.`);
            }
            io.to(roomId).emit('roomUpdated', { room: room })
            console.clear()
            console.log(connections.connections)


            if (room.ready) {
                Object.keys(room.players).forEach((p) => {
                    io.sockets.to(p).emit('roomReady', { room: room, sign: room.players[p] })
                })
            }

        } catch (error) {
            console.error((error as Error).message);
            socket.emit('error', { message: (error as Error).message });
            return;
        }
    },
    newGame(socket: Socket, io: Server) {
        console.log('play again from room controller')
        let roomId = connections.getRoomID(socket.id);
        if (!roomId) throw new Error(`Room ${roomId} does not exist.`);
        let room = rooms.get(roomId);
        if (!room) throw new Error(`Room ${roomId} does not exist.`);
        let { game, players } = room.newGame();
        console.log(game, 'before sending')
        Object.keys(players).forEach((p) => {
            io.sockets.to(p).emit('newGame', { game: game, sign: players[p] })
        })

    },

    disconnect(socket: Socket, io: Server) {
        let roomId = connections.getRoomID(socket.id);

        connections.remove(socket.id);
        if (!roomId) {
            console.warn(`No room found for socket ID: ${socket.id}`);
            return;
        }
        let room = rooms.leave(roomId, socket.id);
        io.to(roomId).emit('playerLeft', { room: room })

    }
}