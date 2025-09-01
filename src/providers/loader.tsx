"use client"

import { Loader } from "@/components/loader";
import { ReactNode, createContext, useState } from "react";

interface LoaderContextData {
    visible: boolean;
    handleLoaderVisibility: (visibity?: boolean) => void;
}

export const LoaderContext = createContext({} as LoaderContextData);

export const LoaderProvider = ({children}: {children: ReactNode}) => {
    const [visible, setVisible] = useState(false);

    function handleLoaderVisibility(visibity?: boolean) {
        setVisible(visibity ?? !visible);
    }

    return (
        <LoaderContext.Provider value={{visible, handleLoaderVisibility }}>
            {visible && <Loader/>}
            {children}
        </LoaderContext.Provider>
    )
}