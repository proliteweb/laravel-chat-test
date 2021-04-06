export class ChatMessagesOrder {

    static  lastMessage ='';

    static setLastMessage(lastMessage) {
        this.lastMessage = lastMessage;
    }

    static getLastMessage() {
        return this.lastMessage;
    }
}
