import { ReactNode } from "react";

export function Container({children}: {children: ReactNode}) {
    return (
        <div className="w-full max-w-11/12 mx-auto">
            {children}
        </div>
    )
}