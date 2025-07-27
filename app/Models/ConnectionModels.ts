export default {
    connections: {} as Record<string, string>,
    add(socketID: string, roomID: string = '') {
        this.connections[socketID] = roomID;
    },
    update(socketID: string, roomID: string) {
        this.connections[socketID] = roomID;
    },
    remove(socketID: string) {
        delete this.connections[socketID];
    },
    getRoomID(socketID: string): string | undefined {
        return this.connections[socketID];
    }
}
