import { Room } from "../services/Room";

export default {
    rooms: {} as Record<string, Room>,

    create(): Room {
        const room = new Room;
        this.rooms[room.id] = room
        return room;
    },
    createAndJoin(playerId:string): Room{
        return this.create().join(playerId);
    },
    join(roomId: string, playerId: string): Room | undefined {
        const room = this.rooms[roomId];
        room.join(playerId);
        return room;
    },
    leave(roomId: string, playerId: string): Room {

        let room = this.get(roomId);
        if (!room) throw new Error(`Room ${roomId} doesn't exist`);
        room.leave(playerId);
        if (room.playerCount <= 0) this.delete(roomId);
        return room;
    },

    get(roomId: string): Room | undefined {
        return this.rooms[roomId];
    },
    delete(roomId: string) {
        delete this.rooms[roomId];
    }
}