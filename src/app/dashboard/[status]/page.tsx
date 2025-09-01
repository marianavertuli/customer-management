import { Container } from "@/components/container";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StatusFilter } from "../components/status-filter";
import { ButtonRefresh } from "../components/button-refresh";
import { DashboardTicket } from "../components/ticket";

export default async function DashboardStatus({params}: {params: Promise<{status: string}>}) {
    const session = await getServerSession(authOptions);
    const { status } = await params;


    if (!session || !session.user)
        redirect("/");

    const tickets = await prisma.ticket.findMany({
        where: {
            customer: {
                userId: session.user.id
            },
            status: status.toUpperCase() === 'ALL' ? undefined : status.toUpperCase()
        }, include: {
            customer: true
        }, orderBy: {
            created_at: 'desc'
        }
    });

    return (
        <Container>
            <main className="min-h-[calc(100vh-240px)] mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Tickets</h1>
                    <div className="flex items-center gap-3">
                        <StatusFilter currentStatus={status}/>
                        <ButtonRefresh/>
                        <Link href="/dashboard/new" className="bg-blue-600 px-4 py-1 rounded text-white hover:scale-110 duration-200">Open new ticket</Link>
                    </div>
                </div>
                <div>
                    <table className="min-w-full my-2">
                        <thead>
                            <tr>
                                <th className="font-medium text-left pl-1">CLIENT</th>
                                <th className="font-medium text-left hidden sm:block">REGISTERED IN</th>
                                <th className="font-medium text-left">STATUS</th>
                                <th className="font-medium text-left">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <DashboardTicket key={ticket.id} ticket={ticket} customer={ticket.customer}/>
                            ))}
                        </tbody>
                    </table>
                    {!tickets.length && (
                        <h1 className="text-gray-900">No ticket was found...</h1>
                    )}
                </div>
            </main>
        </Container>
    )
}