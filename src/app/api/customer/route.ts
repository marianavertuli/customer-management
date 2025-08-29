import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {    
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
        return NextResponse.json({ error: "Failed to remove customer. Ensure you have provided an id" }, { status: 400 });


    const foundTicket = await prisma.ticket.findFirst({where: {customerId: id }});

    if (foundTicket)
        return NextResponse.json({ error: "Failed to remove customer. Please, ensure you don't have any ticket assigned to this customer." }, { status: 500 });

    try {
        await prisma.customer.delete({where: { id: id as string }});
        return NextResponse.json({ error: "Customer was successfully removed" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to remove customer" }, { status: 400 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { name, email, phone, address } = await request.json();

    try {
        await prisma.customer.create({
            data: {
                name,
                phone,
                email,
                address: address ?? "",
                userId: session.user.id
            }
        });
        
        return NextResponse.json({ message: "Customer was successfully registered" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: "Failed to create a new customer" }, { status: 400 });
    }
}