"use client"

import { api } from "@/lib/api";
import { AlertContext } from "@/providers/alert";
import { ModalContext } from "@/providers/modal";
import { Customer } from "@/utils/customer.type";
import { Ticket } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiCheckSquare, FiFile } from "react-icons/fi";

interface DashboardTicketProps {
    ticket: Ticket;
    customer: Customer | null;
}

export function DashboardTicket({ticket, customer}: DashboardTicketProps) {
    const router = useRouter();
    const { handleModalVisibility, setDetailsToTicket } = useContext(ModalContext);
    const { setAlert } = useContext(AlertContext);

    const getNewStatus = () => {
        return ticket.status === "CLOSED" ? "OPEN" : "CLOSED";
    } 

    async function handleChangeStatus() {
        try {
            await api.patch("/api/ticket", {
                id: ticket.id,
                status: getNewStatus()
            });
            router.refresh();
            setAlert({
                message: "Status successfully changed!",
                type: 'success'
            });   

        } catch (err) {
            const msg = "An error has occured. Please, try again later.";
            setAlert({
                message: msg,
                type: 'error'
            });
        }
    }

    async function handleShowModal() {
        handleModalVisibility();
        setDetailsToTicket({
            customer, ticket
        });
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-light-gray duration-200">
                <td className="text-left pl-1">{customer?.name}</td>
                <td className="text-left hidden sm:table-cell">{ticket?.created_at?.toLocaleDateString("pt-br")}</td>
                <td className="text-left">
                    {ticket?.status === "CLOSED" ? (
                        <span className="bg-error px-2 py-1 rounded-md text-sm text-white font-bold">{ticket?.status}</span>
                    ) : (
                        <span className="bg-success px-2 py-1 rounded-md text-sm text-white font-bold">{ticket?.status}</span>
                    )}
                </td>
                <td className="text-left">
                    <button onClick={handleChangeStatus} className="mr-2 cursor-pointer hover:scale-110 duration-200">
                        <FiCheckSquare className="text-mid-gray" size={24}/>
                    </button>
                    <button onClick={handleShowModal} className="cursor-pointer hover:scale-110 duration-200">
                        <FiFile className="text-primary-main" size={24}/>
                    </button>
                </td>
            </tr>
        </>
    )
}