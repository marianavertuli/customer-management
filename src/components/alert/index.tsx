import { useState } from "react";
import { FiX } from "react-icons/fi";

export interface AlertProps {
    message: string;
    type: 'error' | 'success' | 'warning';
}

export function Alert({message, type}: AlertProps) {
    const [visible, setVisible] = useState(true);

    const background = () => {
        switch (type) {
            case 'error':
                return 'bg-red-700';
            case 'success':
                return 'bg-green-700';
            case 'warning':
                return 'bg-yellow-600'
            default:
                return 'bg-green-700'
        }
    }

    return (
        <>
        {visible && (
            <div className="absolute bottom-10 right-10">
                <div className={`${background()} py-4 px-2 rounded flex items-center justify-between gap-1`}>
                    <h2 className="text-white">{message}</h2>
                    <FiX 
                        onClick={() => setVisible(!visible)} 
                        className="cursor-pointer hover:scale-110 duration-200" 
                        size={22} 
                        color="#FFF"
                    />
                </div>
            </div>
        )}
        </>
    )
}