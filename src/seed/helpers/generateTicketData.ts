import { Ticket } from "src/tickets/entities/ticket.entity";

export const generateTicketData = (): Ticket[] => {
    const categories = ['service', 'change', 'problem'];

    const products = [
        'laptop',
        'desktop computer',
        'printer',
        'router',
        'smartphone',
        'tablet',
        'smartwatch',
        'headphones'
    ];

    const issues = [
        'Software installation error',
        'Network connection issues',
        'Hardware failure',
        'Display problems',
        'Battery life issues',
        'Slow performance',
        'Virus or malware infection',
        'Peripheral device not working'
    ];

    const status = [true, false]

    function generateTicket() {
        const product = products[Math.floor(Math.random() * products.length)];
        const issue = issues[Math.floor(Math.random() * issues.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const isClosed = status[Math.floor(Math.random() * status.length)]
        const title = `Problem with ${product}: ${issue}`;

        return { title, issue, category, isClosed };
    }

    const tickets = [];

    for (let i = 0; i < 50; i++) {
        tickets.push(generateTicket());
    }

    return tickets;
}