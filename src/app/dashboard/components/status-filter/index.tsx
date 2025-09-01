"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react"

export function StatusFilter({currentStatus}: { currentStatus: string}) {
    const router = useRouter();

    function handleFilterSelection(e: ChangeEvent<HTMLSelectElement>) {
        router.refresh();
        router.push(`/dashboard/${e.target.value}`);
    }

    return (
        <select className="py-1 px-4 rounded cursor-pointer font-bold border-gray-300 border-2" onChange={(e) => handleFilterSelection(e)} name="status" value={currentStatus ?? 'ALL'}>
            <option value="all">ALL</option>
            <option value="open">OPEN</option>
            <option value="closed">CLOSED</option>
        </select>
    )
}