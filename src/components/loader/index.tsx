import { FiLoader } from "react-icons/fi";

export function Loader() {
    return (
        <div className="absolute bg-dark-gray/70 min-h-screen w-full">
            <div className="absolute inset-0 flex items-center justify-center">
                <FiLoader className="text-white animate-spin" size={80}/>
            </div>
        </div>
    )
}