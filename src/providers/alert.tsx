"use client"

import {Alert} from '@/components/alert';
import { ReactNode, createContext, useState } from 'react';

interface AlertContextData {
    setAlert: (alert: AlertProps, timeout?: number) => void;
    setAlertVisibility: () => void;
    background: () => string;
    message: string;
}

type AlertType = 'error' | 'success' | 'warning';

export interface AlertProps {
    message: string;
    type: AlertType;
}

export const AlertContext = createContext({} as AlertContextData);

export const AlertProvider = ({children}: {children: ReactNode}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<AlertType>();

    function setAlert(alert: AlertProps, timeout?: number) {
        setMessage(alert.message);
        setType(alert.type);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            setType(undefined);
            setMessage("");
        }, timeout ?? 4000);
    }

    function setAlertVisibility() {
        setVisible(!visible);
    }

    const background = (): string => {
        switch (type) {
            case 'error':
                return 'bg-error';
            case 'success':
                return 'bg-success';
            case 'warning':
                return 'bg-warning'
            default:
                return 'bg-success'
        }
    }

    return (
        <AlertContext.Provider value={{setAlert, setAlertVisibility, background, message}}>
        {visible && (<Alert/>)}
        {children}
        </AlertContext.Provider>
    )
}