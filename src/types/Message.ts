interface Reaction {
    emoji: string;
    user_id: string;
}

interface Message {
    id: string;
    body: string;
    created_at: string;
    reactions: Reaction[];
    comments: Message[];
    timestamp: string;
    read: boolean;
    readBy: string[];
    user_id: string;
}

export default Message;
