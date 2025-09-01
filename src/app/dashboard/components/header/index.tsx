import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {
    return (
        <Container>
            <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4">
                <Link href="/dashboard/all" className="text-white hover:font-bold duration-200">
                    Tickets
                </Link>
                <Link href="/dashboard/customers" className="text-white hover:font-bold duration-200">
                    Customers
                </Link>
            </header>
        </Container>
    )
}