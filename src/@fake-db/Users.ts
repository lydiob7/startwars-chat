import {
    beruWhitesunAvatar,
    c3poAvatar,
    chewbaccaAvatar,
    darthVaderAvatar,
    hanSoloAvatar,
    jabbaAvatar,
    leiaAvatar,
    lukeAvatar,
    obiWanAvatar,
    owenLarsAvatar,
    r2d2Avatar,
    wilhuffTarkinAvatar,
    yodaAvatar
} from "../assets/images";
import User from "../types/User";
import Entities from "./Entities";

const users: User[] = [
    { id: "B879F62C-E929-479E-A9A8-9BDE07F97822", username: "Luke Skywalker", avatar: lukeAvatar },
    { id: "4C7B9488-9FB6-45CB-923C-B96B77F2860B", username: "C-3PO", avatar: c3poAvatar },
    { id: "451D6BEF-C8E2-4636-BF2D-830C6B5A9C2A", username: "R2-D2", avatar: r2d2Avatar },
    { id: "2D524428-5416-49E4-B2E4-A24BCF7A2293", username: "Darth Vader", avatar: darthVaderAvatar },
    { id: "06C4AAA2-55BB-47EE-8F7E-74297B6960B0", username: "Leia Organa", avatar: leiaAvatar },
    { id: "527B41D4-97AB-49E7-8B3A-E9B6A621DF22", username: "Obi-Wan Kenobi", avatar: obiWanAvatar },
    { id: "76826E23-78A9-4BB9-A1E3-F990CA0854FF", username: "Chewbacca", avatar: chewbaccaAvatar },
    { id: "123C68A1-5ED7-445C-8E94-CD457B339C31", username: "Han Solo", avatar: hanSoloAvatar },
    { id: "9DB5F41A-0E91-4744-8845-AAEACD07D92B", username: "Jabba Desilijic Tiure", avatar: jabbaAvatar },
    { id: "1E768BB3-A5CB-486D-B052-5463C7113EBF", username: "Yoda", avatar: yodaAvatar },
    { id: "46E32A4B-FC52-4F68-BAAD-9DB11DFC29E3", username: "Wilhuff Tarkin", avatar: wilhuffTarkinAvatar },
    { id: "18AD9F61-AED8-4A36-BF27-897E60C61891", username: "Owen Lars", avatar: owenLarsAvatar },
    { id: "106FBF3A-23AC-40B8-AC5C-97F88F51CED9", username: "Beru Whitesun lars", avatar: beruWhitesunAvatar }
];

class Users extends Entities<User> {
    constructor() {
        super(users);
    }
}

const instance = new Users();

export default instance;
