"use client"

import { AlertContext } from "@/providers/alert";
import { useContext } from "react";
import { FiX } from "react-icons/fi";


export function Alert() {
    const { background, message, setAlertVisibility } = useContext(AlertContext);

    return (
        <div className="absolute bottom-10 right-10">
            <div className={`${background()} py-4 px-2 rounded flex items-center justify-between gap-1`}>
                <h2 className="text-white">{message}</h2>
                <FiX 
                    onClick={() => setAlertVisibility()} 
                    className="cursor-pointer hover:scale-110 duration-200" 
                    size={22} 
                    color="#FFF"
                />
            </div>
        </div>
    )
}