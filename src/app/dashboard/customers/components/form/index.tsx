"use client"

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { AlertContext } from "@/providers/alert";
import { LoaderContext } from "@/providers/loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
    name: z.string().min(1, "This field is mandatory."),
    email: z.email("Type a valid email.").min(1, "This field is mandatory."),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        error: "The number must follow the format (XX) XXXXXXXXX."
    }),
    address: z.string()

})

type FormData = z.infer<typeof schema>;

export function CustomerForm() {

    const { handleLoaderVisibility } = useContext(LoaderContext);
    const { setAlert } = useContext(AlertContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const router = useRouter();

    async function handleRegisterCustomer({ name, email, phone, address }: FormData) {
        const errorMsg = "An error has occured. Please, try again later";
        try {
            handleLoaderVisibility(true);
            const res = await api.post("/api/customer",  {
                name, email, phone, address
            });
            
            if (res.status === 200) {
                router.refresh();
                router.replace("/dashboard/customers");
            }
            else {
                setAlert({
                    message: errorMsg,
                    type: 'error'
                });
            }
        } catch (err) {
            setAlert({
                message: errorMsg,
                type: 'error'
            });        
        } finally {
            handleLoaderVisibility(false);
        }

    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-medium">Full name</label>
            <Input
                type="text"
                name="name"
                placeholder="Type the client full name..."
                error={errors.name?.message}
                register={register}
            />
            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Phone</label>
                    <Input
                        type="text"
                        name="phone"
                        placeholder="(XX) XXXXXXXXX"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Email</label>
                    <Input
                        type="text"
                        name="email"
                        placeholder="email@example.com"
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
            </section>
            <label className="mb-1 text-lg font-medium">Address</label>
            <Input
                type="text"
                name="address"
                placeholder="Type the client address..."
                error={errors.address?.message}
                register={register}
            />

            <button 
                type="submit"
                className="bg-primary-main my-4 px-2 h-11 rounded text-white font-bold cursor-pointer hover:scale-[102%] duration-200"
            >
                REGISTER
            </button>
        </form>
    )
}