import { Container } from "@/components/container";
import { redirectIfLoggedOut } from "@/utils/session-utils";
import Link from "next/link";
import { CustomerForm } from "../components/form";

export default async function NewCustomer() {
    await redirectIfLoggedOut();

    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/customers" className="bg-gray-900 px-4 py-1 rounded text-white hover:scale-105 duration-200">BACK</Link>
                    <h1 className="text-3xl font-bold">New Customer</h1>
                </div>
                <CustomerForm/>
            </main>
        </Container>
    )
}