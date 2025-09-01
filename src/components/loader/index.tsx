import { FiLoader } from "react-icons/fi";

export function Loader() {
    return (
        <div className="absolute bg-gray-900/70 min-h-screen w-full">
            <div className="absolute inset-0 flex items-center justify-center">
                <FiLoader className="animate-spin" size={80} color="#FFF"/>
            </div>
        </div>
    )
}