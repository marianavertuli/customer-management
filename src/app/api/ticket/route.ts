import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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