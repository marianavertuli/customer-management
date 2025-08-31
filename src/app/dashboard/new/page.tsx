import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
        redirect("/");

    const customers = await prisma.customer.findMany({where: { userId: session?.user.id }});

    async function handleRegisterSubmit(formData: FormData) {
        // this function is server side - no need to pass the value in the inputs and use action instead of "onSubmit"
        "use server"

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const customerId = formData.get("customerId") as string;

        if (!name || !description || !customerId)
            return;

        try {
            await prisma.ticket.create({
                data: {
                    name, 
                    description, 
                    customerId, 
                    userId: session?.user.id,
                    status: "OPEN"
                }
            });

            console.log(`Ticket successfully created with the following information: \n ${name} - ${description} \n Status: OPEN`);

        } catch (err) {
            console.log(`An error has occurred. Please, try again later: ${err}`);
            return;
        }

        redirect("/dashboard");
    }

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="text-white px-4 py-1 rounded bg-gray-900 hover:scale-105 duration-200">BACK</Link>
                    <h1 className="text-3xl font-bold">New Ticket</h1>
                </div>

                <form className="flex flex-col mt-6" action={handleRegisterSubmit}>
                    <label className="mb-1 font-medium text-lg">Ticket Name</label>
                    <input className="w-full border-2 rounded-md px-2 mb-2 h-11" required name="name" type="text" placeholder="Type the ticket name..."/>

                    <label className="mb-1 font-medium text-lg">Description</label>
                    <textarea className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" required name="description" placeholder="Describe the problem..."></textarea>

                    {!!customers?.length && (
                        <>
                        <label className="mb-1 font-medium text-lg">Select the client</label>
                        {customers.map(customer => (
                            <select key={customer.id} required name="customerId" className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white">
                                <option value={customer.id}>{customer.name}</option>
                            </select>
                        ))}
                        </>
                    )}

                    {!customers.length && (
                        <Link href="/dashboard/customers/new">
                            You don't have any customer yet... <span className="text-blue-600 font-bold">Register client</span>
                        </Link>
                    )}

                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white font-bold px-2 h-11 rounded-md my-4 cursor-pointer hover:scale-[102%] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={customers.length === 0}>
                        REGISTER
                    </button>

                </form>
            </main>
        </Container>
    )
}