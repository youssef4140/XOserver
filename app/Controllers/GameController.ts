import { Server, Socket } from 'socket.io';
import rooms from '../Models/RoomModel';
import connections from '../Models/ConnectionModels';
import Game from '../services/Game';

export default {



    tik(index: number, socket: Socket, io: Server) {
        const roomId = this.roomId(socket);
        if (!roomId) throw new Error(`Room ${roomId} does not exist.`)


        const game = this.game(roomId).tik(socket.id, index);
        io.to(roomId).emit('tik', { game: game });
        if(game.winner){
            io.to(roomId).emit('winner',game.winner);
        }
    },



    game(roomId: string): Game {
        const room = rooms.get(roomId);
        if (!room) throw new Error(`Room ${roomId} does not exist.`);
        const game = room.game;
        if (!game) throw new Error(`Room ${roomId} does not have a game.`);
        return game;
    },

    roomId(socket: Socket) {
        return connections.getRoomID(socket.id);
    }
}