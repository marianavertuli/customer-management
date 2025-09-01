"use client"

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import z from "zod"
import { FormTicket } from "./components/form-ticket";
import { api } from "@/lib/api";

const schema = z.object({
    email: z.email("Type the customer e-mail.").min(1, "This field is mandatory.")
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
    id: string;
    name: string;
}

export default function NewTicket() {
    const [ customer, setCustomer ] = useState<CustomerDataInfo | null>(null);

    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleClearCustomer() {
        setCustomer(null);
        setValue("email", "");
    }

    async function handleSearchCustomer(data: FormData) {
        try {
            const response = await api.get("/api/customer", {
                params: {
                    email: data.email
                }
            });

            if (!response.data) {
                setError("email", { type: 'custom', message: "Ops... this client was not found!"})
                return;
            }

            setCustomer({
                id: response.data.id,
                name: response.data.name
            });

        } catch (err) {
            window.alert("An error has occured. Please, try again later.");
        }

    }


    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl text-center mt-24">Open New Ticket</h1>
            <main className="flex flex-col mt-4 mb-2">
                {!customer ? (
                    <form 
                    onSubmit={handleSubmit(handleSearchCustomer)}
                    className="bg-slate-200 py-12 px-2 rounded border-2 border-gray-200">
                        <div className="flex flex-col gap-3">
                            <Input 
                                name="email" 
                                placeholder="Type the customer e-mail..." 
                                type="text"
                                error={errors.email?.message}
                                register={register}
                            />
                            <button 
                                type='submit'
                                className="bg-blue-600 text-white font-bold flex flex-row gap-3 px-2 h-11 items-center justify-center rounded-md hover:scale-[102%] duration-200 cursor-pointer"
                            >
                                Look for customer
                                <FiSearch size={24} color="#FFF"/>
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="bg-slate-200 py-6 px-4 rounded border-2 border-gray-200 flex items-center justify-between">
                            <p className="text-lg"><strong>Selected customer: </strong> {customer.name} </p>
                            <button
                                onClick={handleClearCustomer}
                                className="h-11 px-2 flex items-center justify-center rounded cursor-pointer hover:scale-110 duration-200"
                            >
                                <FiX size={30} color="#e7000b"/>
                            </button>
                        </div>
                        <FormTicket customerId={customer.id}/>
                    </>

                )}
            </main>
        </div>
    )
}