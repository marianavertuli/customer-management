import { AlertProps } from "@/components/alert";
import { Dispatch, SetStateAction } from "react";

export function handleAlert(
    setAlert: Dispatch<SetStateAction<AlertProps | undefined>>,
    message: string, 
    type?: 'error' | 'warning' | 'success', 
    timeout?: number
) {
    setAlert({
        message: message,
        type: type ?? 'error'
    });
    setTimeout(() => {
        setAlert(undefined);
    }, timeout ?? 4000);
}