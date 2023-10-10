import Message from "./Message";
import User from "./User";

interface Room {
    created_at?: string;
    id: string;
    messages?: Message[];
    name: string;
    users: User[];
}

export default Room;
