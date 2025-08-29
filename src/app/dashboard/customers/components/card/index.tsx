"use client"

import { api } from "@/lib/api";
import { Customer } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function CustomersCard({name, phone, email, id}: Customer) {

    const router = useRouter();

    async function handleDeleteCustomer() {
        try {
            await api.delete("/api/customer", {
                params: {
                    id
                }
            });
            router.refresh();

        } catch (err) {
            console.log(err);
            window.alert("An error has occured while attempting to remove customer. Please, try again later");
        }
    }

    return (
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-200">
            <h2>
                <a className="font-bold">Name:</a> {name}
            </h2>
            <p>
                <a className="font-bold">Email:</a> {email}
            </p>            <p>
                <a className="font-bold">Phone:</a> +55 ({phone.slice(0,2)}) {phone.slice(2,6)}-{phone.slice(6,11)}
            </p>
            <button 
                onClick={handleDeleteCustomer}
                className="bg-red-600 px-4 rounded text-white mt-2 self-start cursor-pointer hover:scale-110 duration-200">
                REMOVE
            </button>
        </article>
    )
}