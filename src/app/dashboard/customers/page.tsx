import { Container } from "@/components/container";
import Link from "next/link";
import { CustomersCard } from "./components/card";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Customers() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
        redirect("/");

    const customers = await prisma.customer.findMany({where: { userId: { equals: session?.user.id }}});

    return (
        <Container>
            <main className="min-h-[calc(100vh-240px)] mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        My Customers
                    </h1>
                    <Link href="/dashboard/customers/new" className="bg-blue-600 text-white font-bold px-4 py-1 rounded hover:scale-110 duration-200">
                        New Customer
                </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 mt-4">
                    {customers && (
                        customers.map(customer => (
                            <CustomersCard key={customer.id} {...customer}/>
                        ))
                    )}
                </section>
                {!customers?.length && (
                    <h1 className="text-gray-800">You don't have any registered customer yet...</h1>
                )}
            </main>
        </Container>
    )
}