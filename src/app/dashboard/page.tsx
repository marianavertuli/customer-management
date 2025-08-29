import { Container } from "@/components/container";
import { redirectIfLoggedOut } from "@/utils/session-utils";
import Link from "next/link";
import { DashboardTicket } from "./components/ticket";

export default async function Dashboard() {
    await redirectIfLoggedOut();

    return (
        <Container>
            <main className="min-h-[calc(100vh-240px)] mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Tickets</h1>
                    <Link href="/dashboard/new" className="bg-blue-600 px-4 py-1 rounded text-white hover:scale-110 duration-200">Open new ticket</Link>
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
                            <DashboardTicket/>
                        </tbody>
                    </table>
                </div>
            </main>
        </Container>
    )
}