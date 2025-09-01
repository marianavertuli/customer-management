"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form";


interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({ type, placeholder, name, register, error, rules }: InputProps) {
    return (
        <>
            <input className="w-full border-2 border-gray-300 rounded-md h-11 px-2" 
                placeholder={placeholder}
                type={type}
                {...register(name, rules)}
                id={name}
            />
            {error && (
                <p className="text-red-600 my-1 font-bold text-xs">{error}</p>
            )}
        </>
    )
}