import { FiFile, FiTrash } from "react-icons/fi";

export function DashboardTicket() {
    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
                <td className="text-left pl-1">Nome do clinte</td>
                <td className="text-left hidden sm:table-cell">01/01/2024</td>
                <td className="text-left"><span className="bg-green-700 px-2 py-1 rounded">ABERTO</span></td>
                <td className="text-left">
                    <button className="mr-2 cursor-pointer hover:scale-110 duration-200">
                        <FiTrash size={24} color="EF4444"/>
                    </button>
                    <button className="cursor-pointer hover:scale-110 duration-200">
                        <FiFile size={24} color="3B82F6"/>
                    </button>
                </td>
            </tr>
        </>
    )
}