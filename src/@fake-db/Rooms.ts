import { messagesService, usersService } from ".";
import Message from "../types/Message";
import Room from "../types/Room";
import User from "../types/User";
import Entities from "./Entities";

const rooms: Room[] = [
    {
        id: "4C69E06A-EC88-494F-B926-23852400EE90",
        users: [
            (await usersService.getById("B879F62C-E929-479E-A9A8-9BDE07F97822")) as User,
            (await usersService.getById("2D524428-5416-49E4-B2E4-A24BCF7A2293")) as User
        ],
        messages: [
            (await messagesService.getById("F321E746-ADEE-4251-B9A1-61A7BE84765F")) as Message,
            (await messagesService.getById("481EFD87-D760-4ABA-B7AC-B0198E72226A")) as Message
        ]
    },
    {
        id: "89D74126-6925-46CC-B504-6440573127D8",
        users: [
            (await usersService.getById("123C68A1-5ED7-445C-8E94-CD457B339C31")) as User,
            (await usersService.getById("76826E23-78A9-4BB9-A1E3-F990CA0854FF")) as User
        ],
        messages: [
            (await messagesService.getById("9C4DF42B-140B-45D4-BEFA-E82C1F9E8F9C")) as Message,
            (await messagesService.getById("E39341D8-FC23-429B-8D97-4AE79897D592")) as Message
        ]
    },
    {
        id: "1EF153B0-322A-48EC-892F-F03C17A76FB4",
        users: [
            (await usersService.getById("1E768BB3-A5CB-486D-B052-5463C7113EBF")) as User,
            (await usersService.getById("B879F62C-E929-479E-A9A8-9BDE07F97822")) as User
        ],
        messages: [
            (await messagesService.getById("1715D719-83AA-4B83-BA39-D9B697E64141")) as Message,
            (await messagesService.getById("B977D1D8-42BB-467C-A85D-E45E5653479B")) as Message
        ]
    },
    {
        id: "2364B065-95F2-4B27-8F27-328E4B4DAFA1",
        users: [
            (await usersService.getById("4C7B9488-9FB6-45CB-923C-B96B77F2860B")) as User,
            (await usersService.getById("451D6BEF-C8E2-4636-BF2D-830C6B5A9C2A")) as User
        ],
        messages: [
            (await messagesService.getById("5917824B-CCDA-4BEB-9F00-54FE97BBFAAD")) as Message,
            (await messagesService.getById("924405EF-F344-457B-88A1-1B1FBEF19F7A")) as Message
        ]
    },
    {
        id: "FBD949C8-DBEB-4B94-87E0-298FB2EFE769",
        users: [
            (await usersService.getById("9DB5F41A-0E91-4744-8845-AAEACD07D92B")) as User,
            (await usersService.getById("06C4AAA2-55BB-47EE-8F7E-74297B6960B0")) as User
        ],
        messages: [
            (await messagesService.getById("DF377173-298B-4554-AFDC-1FAB65F60DAE")) as Message,
            (await messagesService.getById("B740806E-F8EE-48FF-B550-C198187A5FAA")) as Message
        ]
    }
];

class Rooms extends Entities<Room> {
    constructor() {
        super(rooms);
    }

    getRoomByUserId(userId: string): Promise<Room[]> {
        return new Promise((resolve) => {
            const rooms = this.rawData.filter((room) => room.users.some((user) => user.id === userId));
            resolve(rooms);
        });
    }
}

const instance = new Rooms();

export default instance;
