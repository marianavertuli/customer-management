"use client"

import { useRouter } from "next/navigation"
import { FiRefreshCcw } from "react-icons/fi";

export function ButtonRefresh() {
    const router = useRouter();

    function handleSubmit() {
        router.refresh();
    }

    return (
        <button onClick={handleSubmit} className="bg-primary-main px-4 py-1 rounded cursor-pointer hover:scale-110 duration-200">
            <FiRefreshCcw className="text-white" size={24}/>
        </button>
    )
}