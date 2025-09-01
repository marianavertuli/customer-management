"use client"

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { getLabelByLanguage } from "@/utils/language";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod";

export function FormTicket({customerId}: {customerId: string}) {

    const schema = z.object({
        name: z.string().min(1, "This field is mandatory."),
        description: z.string().min(1, "This field is mandatory.")
    });

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, setValue, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    async function handleRegisterTicket(data: FormData) {
        try {
            await api.post("/api/ticket", {
                name: data.name,
                description: data.description,
                customerId: customerId
            });
            setValue("name", "");
            setValue("description", "");
            
            window.alert("The ticket was successfully created!");

        } catch (err) {
            console.log(err);
            window.alert("An error has occurred. Please, try again later");
        }

    }

    return (
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded" onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="mb-1 font-medium text-lg">{getLabelByLanguage("common.form.name")}</label>
            <Input
                name="name"
                placeholder={getLabelByLanguage("newTicket.ticketNamePlaceholder")}
                type="text"
                register={register}
                error={errors.name?.message}
            />
            
            <label className="mb-1 font-medium text-lg">{getLabelByLanguage("common.form.description")}</label>
            <textarea
                className="w-full border-2 border-gray-300 rounded-md h-24 resize-none px-2"
                placeholder={getLabelByLanguage("newTicket.ticketDescriptionPlaceholder")}
                id="description"
                {...register("description")}>
            </textarea>
            {errors.description?.message && (
                <p className="text-red-600 my-1 font-bold text-xs mt-1 mb-4">{errors.description?.message}</p>
            )}

            <button 
                type="submit"
                className="bg-blue-600 rounded-md text-white w-full h-11 px-2 font-bold cursor-pointer hover:scale-105 duration-200"
                >
                {getLabelByLanguage("commom.register")}
            </button>
        </form>
    )
}