import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {customerId, name, description} = await request.json();

    if (!customerId || !name || !description) {
        return NextResponse.json({error: "An error has occurred. Ensure all fields were filled"}, {status: 400});
    }
    
    try {    
        await prisma.ticket.create({
            data: {
                name, 
                description, 
                customerId,
                status: "OPEN"
            }
        });
        return NextResponse.json({message: "Ticket was successfully registered"});
    } catch (err) {
        return NextResponse.json({error: "An error has occurred"}, {status: 400});
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { id, status } = await request.json();

    const findTicket = await prisma.ticket.findFirst({
        where: {
            id: id as string
        }
    });
    
    if (!findTicket) {
        return NextResponse.json({ error: "Failed to updated ticket" }, { status: 400 });
    }

    try {
        await prisma.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: status as string
            }
        });

        return NextResponse.json({message: "Status updated with success!"});

    } catch (err) {
        return NextResponse.json({ error: "Failed to updated ticket" }, { status: 400 });
    }


}