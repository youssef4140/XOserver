import { Socket } from "socket.io";
import { Room } from "../types/Rooms";

export default {
    rooms: {} as Record<string, Room>,

    generateRoomId(): string {
        return Math.random().toString(36).substring(2, 10);
    },

    create(): string {
        const roomId = this.generateRoomId();
        this.rooms[roomId] = {
            players: {},
            ready: false,
            playerCount: 0,
            id: roomId
        };
        return roomId;
    },
    join(roomId: string, playerId: string): Room | undefined {
        const room = this.rooms[roomId];
        if (!room) { throw new Error(`Room ${roomId} does not exist.`); }
        if (room.playerCount > 2) {
            throw new Error(`Room ${roomId} already has 2 players.`);
        }
        if (Object.keys(room.players).includes(playerId)) return room;
        let useSign: 'X' | 'O' = this.useSign(room.players);

        this.rooms[roomId].players[playerId] = useSign;
        room.playerCount++;
        room.ready = this.checkReady(roomId)
        // console.clear()
        // console.log(this.rooms[roomId])
        return room;

    },
    removePlayer(roomId: string, playerId: string): Room {
        console.log(this.rooms[roomId].players)

        let room = this.rooms[roomId];
        if (!room) throw new Error(`Room ${roomId} doesn't exist`);
        delete this.rooms[roomId].players[playerId]
        this.rooms[roomId].playerCount--;
        if (this.rooms[roomId].playerCount <= 0) this.delete(roomId);
        room.ready = this.checkReady(roomId)

        // console.log(this.rooms[roomId])

        return this.rooms[roomId];


    },
    flipSign(Sign: 'X' | 'O'): 'X' | 'O' {
        return Sign === 'X' ? 'O' : 'X';
    },
    get(roomId: string): Room | undefined {
        return this.rooms[roomId];
    },
    useSign(players: Record<string, 'X' | 'O'>): 'X' | 'O' {
        let useSign: 'X' | 'O' = 'X';
        let signs = Object.values(players);
        if (signs.includes('X') && signs.includes('O')) {
            throw new Error(`Room already has 2 players with different signs.`);
        }
        if (signs.includes('X')) {
            useSign = 'O';
        }
        return useSign;
    },
    delete(roomId: string) {
        delete this.rooms[roomId];
    },
    checkReady(roomId: string) {
        return (this.rooms[roomId].playerCount === 2)
    }
}