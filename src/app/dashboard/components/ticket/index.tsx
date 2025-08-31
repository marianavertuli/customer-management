"use client"

import { api } from "@/lib/api";
import { Customer } from "@/utils/customer.type";
import { Ticket } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { FiCheckSquare, FiFile } from "react-icons/fi";

interface DashboardTicketProps {
    ticket: Ticket;
    customer: Customer | null;
}

export function DashboardTicket({ticket, customer}: DashboardTicketProps) {

    const router = useRouter();

    const getNewStatus = () => {
        return ticket.status === "CLOSED" ? "OPEN" : "CLOSED";
    } 

    async function handleChangeStatus() {
        try {
            const response = await api.patch("/api/ticket", {
                id: ticket.id,
                status: getNewStatus()
            });

            router.refresh();

        } catch (err) {
            console.log(err);
            window.alert("An error has occured. Please, try again later.");
        }
    }

    async function handleEdit() {

    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
                <td className="text-left pl-1">{customer?.name}</td>
                <td className="text-left hidden sm:table-cell">{ticket?.created_at?.toLocaleDateString("pt-br")}</td>
                <td className="text-left">
                    {ticket?.status === "CLOSED" ? (
                        <span className="bg-red-700 px-2 py-1 rounded-md text-sm text-white font-bold">{ticket?.status}</span>
                    ) : (
                        <span className="bg-green-700 px-2 py-1 rounded-md text-sm text-white font-bold">{ticket?.status}</span>
                    )}
                </td>
                <td className="text-left">
                    <button onClick={handleChangeStatus} className="mr-2 cursor-pointer hover:scale-110 duration-200">
                        <FiCheckSquare size={24} color="#a5b5a4"/>
                    </button>
                    <button onClick={handleEdit} className="cursor-pointer hover:scale-110 duration-200">
                        <FiFile size={24} color="#3B82F6"/>
                    </button>
                </td>
            </tr>
        </>
    )
}