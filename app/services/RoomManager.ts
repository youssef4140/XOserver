import { Room } from "../../types/Rooms";
import GameManager from "./GameManager";

export default class RoomManager {
    rooms: { [key: string]: Room }; // Define the type of rooms
    players: { [key: string]: string }; // Define the type of players

    public static instance: RoomManager;

    private constructor() {
        this.rooms = {};
        this.players = {};
    }

    public static getInstance(): RoomManager {
        if (!RoomManager.instance) {
            RoomManager.instance = new RoomManager();
        }
        return RoomManager.instance;
    }

    createId() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }


    createRoom(playerId: string) {
        let roomId = this.createId();
        while (this.rooms[roomId]) {
            roomId = this.createId();
        }
        this.rooms[roomId] = {
            players: [playerId],
            ready: false,
        }
        this.players[playerId] = roomId;
        return { success: true, roomId: roomId };

    }

    joinRoom(roomId: string, playerId: string) {
        if (this.rooms[roomId] && this.rooms[roomId].players.length < 2) {
            this.rooms[roomId].players.push(playerId);
            this.players[playerId] = roomId;
            if (this.rooms[roomId].players.length === 2) {
                this.rooms[roomId].ready = true;
                this.rooms[roomId].game = new GameManager(this.rooms[roomId].players);
            }
            return { success: true, roomId: roomId, ready: this.rooms[roomId].ready };

        }
        return { success: false, message: "Room not found or full" };
    }

    leaveRoom(playerId: string) {
        const roomId = this.players[playerId];
        if (this.rooms[roomId]) {
            this.rooms[roomId].players = this.rooms[roomId].players.filter((id) => id !== playerId);
            delete this.players[playerId];
            if (this.rooms[roomId].players.length === 0) {
                delete this.rooms[roomId];
            }
        }
    }

    getGame(playerId: string) {
        let roomId = this.players[playerId];
        if (roomId) {
            return this.rooms[roomId].game;
        }
    }

    getGameState(roomId: string) {
        if (this.rooms[roomId]) {
            return this.rooms[roomId].game;
        }
        return null;
    }

    getPlayers(roomId: string) {
        if (this.rooms[roomId]) {
            return this.rooms[roomId].game?.players;
        }
        return null;
    }


}