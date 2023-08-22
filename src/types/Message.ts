interface Reaction {
    authorId: string;
    emoji: string;
}

interface Message {
    id: string;
    body: string;
    authorId: string;
    reactions: Reaction[];
    comments: Message[];
    timestamp: string;
}

export default Message;
