import Message from "./Message";
import User from "./User";

interface Room {
    id: string;
    users: User[];
    messages: Message[];
}

export default Room;
