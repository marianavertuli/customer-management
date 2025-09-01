"use client"

import { Modal } from "@/components/modal";
import { Customer } from "@/utils/customer.type";
import { Ticket } from "@/utils/ticket.type";
import { ReactNode, createContext, useState } from "react";

interface ModalContextData {
    visible: boolean;
    handleModalVisibility: () => void;
    ticket: TicketInfo | undefined;
    setDetailsToTicket: (details: TicketInfo) => void;
}

interface TicketInfo {
    ticket: Ticket;
    customer: Customer | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible]= useState(false);
    const [ticket, setTicket] = useState<TicketInfo>();

    function handleModalVisibility() {
        setVisible(!visible);
    }

    function setDetailsToTicket(details: TicketInfo) {
        setTicket(details);
    }

    return (
        <ModalContext.Provider value={{ visible, handleModalVisibility, ticket, setDetailsToTicket }}>
            {visible && (<Modal/>)}
            {children}
        </ModalContext.Provider>
    )
}