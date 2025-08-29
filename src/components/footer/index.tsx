import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export function Footer() {
    return (
        <footer className="w-full items-center border-t-2 border-gray-300 bg-white h-20">
            <div className="w-full max-w-11/12 mx-auto flex flex-col items-center px-2 pt-4">
                <h1>All rights reserved to DevControl @ {new Date().getFullYear()}</h1>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <h1>This website was created using NextJS 15</h1>
                    <Link href="/more-info" className="hover:scale-110 duration-200">
                        <FiArrowUpRight size={18} color="#4b5563"/>
                    </Link>
                </div>
            </div>
        </footer>
    )
}