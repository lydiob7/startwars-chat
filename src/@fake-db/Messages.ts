import Message from "../types/Message";
import Entities from "./Entities";

const messages: Message[] = [
    {
        id: "F321E746-ADEE-4251-B9A1-61A7BE84765F",
        body: "Luke, I am your father",
        authorId: "2D524428-5416-49E4-B2E4-A24BCF7A2293",
        timestamp: "1980-05-06T20:00:00.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["B879F62C-E929-479E-A9A8-9BDE07F97822"]
    },
    {
        id: "481EFD87-D760-4ABA-B7AC-B0198E72226A",
        body: "Nooooo!",
        authorId: "B879F62C-E929-479E-A9A8-9BDE07F97822",
        timestamp: "1980-05-06T20:01:00.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["2D524428-5416-49E4-B2E4-A24BCF7A2293"]
    },
    {
        id: "9C4DF42B-140B-45D4-BEFA-E82C1F9E8F9C",
        body: "AWGGGHH AAWWWGHHHHRR",
        authorId: "76826E23-78A9-4BB9-A1E3-F990CA0854FF",
        timestamp: "1977-04-25T09:00:05.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["123C68A1-5ED7-445C-8E94-CD457B339C31"]
    },
    {
        id: "E39341D8-FC23-429B-8D97-4AE79897D592",
        body: "Chewie, cada vez te entiendo menos",
        authorId: "123C68A1-5ED7-445C-8E94-CD457B339C31",
        timestamp: "1977-04-25T09:00:10.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["76826E23-78A9-4BB9-A1E3-F990CA0854FF"]
    },
    {
        id: "5917824B-CCDA-4BEB-9F00-54FE97BBFAAD",
        body: "Pi pu, ti pi turu piri pipi",
        authorId: "451D6BEF-C8E2-4636-BF2D-830C6B5A9C2A",
        timestamp: "1980-04-06T11:00:05.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["4C7B9488-9FB6-45CB-923C-B96B77F2860B"]
    },
    {
        id: "924405EF-F344-457B-88A1-1B1FBEF19F7A",
        body: "...",
        authorId: "4C7B9488-9FB6-45CB-923C-B96B77F2860B",
        timestamp: "1980-04-06T11:00:06.000Z",
        reactions: [],
        comments: [],
        read: false,
        readBy: ["451D6BEF-C8E2-4636-BF2D-830C6B5A9C2A"]
    },
    {
        id: "1715D719-83AA-4B83-BA39-D9B697E64141",
        body: "All right, I'll give it a try.",
        authorId: "B879F62C-E929-479E-A9A8-9BDE07F97822",
        timestamp: "1980-04-06T11:00:00.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["1E768BB3-A5CB-486D-B052-5463C7113EBF"]
    },
    {
        id: "B977D1D8-42BB-467C-A85D-E45E5653479B",
        body: "No. Try not. Do... or do not. There is no try.",
        authorId: "1E768BB3-A5CB-486D-B052-5463C7113EBF",
        timestamp: "1980-04-06T11:00:05.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["B879F62C-E929-479E-A9A8-9BDE07F97822"]
    },
    {
        id: "DF377173-298B-4554-AFDC-1FAB65F60DAE",
        body: "Awwwgg",
        authorId: "9DB5F41A-0E91-4744-8845-AAEACD07D92B",
        timestamp: "1980-04-06T11:00:00.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["06C4AAA2-55BB-47EE-8F7E-74297B6960B0"]
    },
    {
        id: "B740806E-F8EE-48FF-B550-C198187A5FAA",
        body: "Me vesti para vos, gil",
        authorId: "06C4AAA2-55BB-47EE-8F7E-74297B6960B0",
        timestamp: "1980-04-06T11:00:05.000Z",
        reactions: [],
        comments: [],
        read: true,
        readBy: ["9DB5F41A-0E91-4744-8845-AAEACD07D92B"]
    }
];

class Messages extends Entities<Message> {
    constructor() {
        super(messages);
    }
}

const instance = new Messages();

export default instance;
