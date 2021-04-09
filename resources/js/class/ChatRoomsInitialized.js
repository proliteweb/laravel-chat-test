export default class ChatRoomsInitialized {
    static subscribedRooms = {}

    static addSubscribedRoom(room) {
        this.subscribedRooms[room] = true;
    }

    static hasSubscribedRoom(room) {
        return (room in this.subscribedRooms)
    }
}