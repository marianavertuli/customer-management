"use client"

import { Languages, setSelectedLanguage, supportedLanguages } from "@/utils/language";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";

export function Header() {
    const { status } = useSession();
    const router = useRouter();
    const [ userLanguage, setUserLanguage] = useState<Languages | undefined>();

    useEffect(() => {
        const languageFromStorage = (window.localStorage.getItem("language") ?? 'EN') as Languages;
        setUserLanguage(languageFromStorage);
        setSelectedLanguage(languageFromStorage);
    }, [userLanguage]);


    async function handleLogIn() {
        await signIn();
    }

    async function handleLogOut() {
        await signOut();
    }

    function handleChangeLanguage(e: ChangeEvent<HTMLSelectElement>) {
        window.localStorage.setItem("language", e.target.value);
        setUserLanguage(e.target.value as Languages);
        setSelectedLanguage(e.target.value as Languages);
        router.refresh();
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
                    <div className="flex items-center gap-4">
                        <select className="cursor-pointer py-2 px-1 border-gray-200 border-2 rounded" value={userLanguage} onChange={(e) => handleChangeLanguage(e)}>
                            {supportedLanguages.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.value}</option>
                            ))}
                        </select>
                        <Link href="/dashboard/all" className="hover:scale-110 duration-200">
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