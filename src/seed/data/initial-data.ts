import { generateTicketData } from "../helpers/generateTicketData";

export const initialData = {
    usersSeedData: [
        {
            email: "jose@jose.com",
            password: "Jose123",
            fullName: "Jose Castiñeiras",
            roles: ['admin', 'super-user', 'user']
        },
        {
            email: "janedoe@example.com",
            password: "password2",
            fullName: "Jane Doe"
        },
        {
            email: "bobsmith@example.com",
            password: "password3",
            fullName: "Bob Smith"
        },
        {
            email: "sarahjones@example.com",
            password: "password4",
            fullName: "Sarah Jones"
        },
        {
            email: "mikebrown@example.com",
            password: "password5",
            fullName: "Mike Brown"
        },
        {
            email: "emilywilson@example.com",
            password: "password6",
            fullName: "Emily Wilson"
        },
        {
            email: "samuellee@example.com",
            password: "password7",
            fullName: "Samuel Lee"
        },
        {
            email: "laurawilson@example.com",
            password: "password8",
            fullName: "Laura Wilson"
        },
        {
            email: "davidjohnson@example.com",
            password: "password9",
            fullName: "David Johnson"
        },
        {
            email: "annasmith@example.com",
            password: "password10",
            fullName: "Anna Smith"
        }
    ],

    ticketsSeedData: generateTicketData()
}