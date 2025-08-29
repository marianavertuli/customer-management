"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";

export function Header() {
    const { status, data } = useSession();

    async function handleLogIn() {
        await signIn();
    }

    async function handleLogOut() {
        await signOut();
    }

    return (
        <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
            <div className="w-full flex items-center justify-between max-w-11/12 mx-auto">
                <Link href="/">
                    <h1 className="font-bold text-2xl hover:tracking-widest duration-200">
                        <span className="text-blue-600">DEV</span> CONTROL
                    </h1>
                </Link>

                {status === 'loading' && (
                    <button className="animate-spin">
                        <FiLoader size={26} color="#4b5563"/>
                    </button>
                )}

                {status === 'unauthenticated' && (
                    <button onClick={handleLogIn} className="cursor-pointer hover:scale-110 duration-200">
                        <FiLock size={26} color="#4b5563"/>
                    </button>
                )}

                {status == 'authenticated' && (
                    <div className="flex items-baseline gap-4">
                        <Link href="/dashboard" className="hover:scale-110 duration-200">
                            <FiUser size={26} color="#4b5563"/>
                        </Link>
                        <button onClick={handleLogOut} className="cursor-pointer hover:scale-110 duration-200">
                            <FiLogOut size={26} color="#4b5563"/>
                        </button>
                    </div>
                )}

            </div>
        </header>
    )
}