import { Server, Socket } from 'socket.io';
import RoomManager from '../services/RoomManager';
import { Result } from '../../types/Rooms';

const rooms = RoomManager.getInstance();



export default function listenForEvents(io:Server) {
    io.on('connection', (socket) => {



        io.on('createRoom', () => {
            console.log("createRoom", socket.id);
            let res: Result = rooms.createRoom(socket.id);
            if (!res.success) {
                socket.emit('error', res.message);
                return;
            }
            
            socket.join(res.roomId as string);
            
            socket.emit('roomCreated', rooms.rooms);
        })

        socket.on('joinRoom', (roomId) => {
            let res: Result = rooms.joinRoom(roomId, socket.id);
            if (!res.success) {
                socket.emit('error', res.message);
                return;
            }
            socket.join(roomId);
            if(res.ready) {
                io.to(roomId).emit('gameReady', rooms.rooms[roomId].game);
                let players = rooms.getPlayers(roomId);
                if (players) {
                    let playersIds = Object.keys(players);
                    playersIds.forEach((id) => {
                        io.to(id).emit('position', players[id]);
                    });
                }
         
                // socket.emit('position', rooms.rooms[roomId].game);
            }
        })

        socket.on('move', ( index: number) => ()=>{
            let game = rooms.getGame(socket.id);
            let board = game?.move(socket.id, index);
            if (!board) {
                socket.emit('error', "Invalid move");
                return;
            }
            socket.emit('moved', board);

        });

        socket.on('disconnect', () => {
            rooms.leaveRoom(socket.id);
        })
        
    })
}