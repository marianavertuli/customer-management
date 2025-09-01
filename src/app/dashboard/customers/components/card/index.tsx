"use client"

import { Alert, AlertProps } from "@/components/alert";
import { api } from "@/lib/api";
import { LoaderContext } from "@/providers/loader";
import { handleAlert } from "@/utils/alert";
import { Customer } from "@/utils/customer.type";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export function CustomersCard({name, phone, email, id}: Customer) {

    const router = useRouter();
    const { handleLoaderVisibility } = useContext(LoaderContext);
    const [alert, setAlert] = useState<AlertProps | undefined>();

    async function handleDeleteCustomer() {
        try {
            handleLoaderVisibility(true);
            await api.delete("/api/customer", {
                params: {
                    id
                }
            });
            router.refresh();

        } catch (err) {
            const msg = "An error has occured while attempting to remove customer. Please, try again later"
            handleAlert( setAlert, msg);

        } finally {
            handleLoaderVisibility(false);
        }
    }

    return (
        <>
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
            {!!alert && (<Alert message={alert.message} type={alert.type}/>)}
        </>
    )
}