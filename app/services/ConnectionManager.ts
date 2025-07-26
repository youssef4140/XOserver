export default {
    connections: {} as Record<string, string>,
    add(socketID: string, roomID: string = '') {
        this.connections[socketID] = roomID;
        console.log(`Connection added: ${socketID} for room ${roomID}`);
    },
    update(socketID: string, roomID: string) {
        console.log(socketID,this.connections[socketID])
            this.connections[socketID] = roomID;
    },
    remove(socketID: string) {
        if (this.connections[socketID]) {
            delete this.connections[socketID];
            console.log(`Connection removed: ${socketID}`);
        } else {
            console.warn(`Connection not found for socket ID: ${socketID}`);
        }
    },
    getRoomID(socketID: string): string | undefined {
        return this.connections[socketID];
    }
}
