"use client"
import { jersey_10 } from "@/app/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo() {
    const pathname = usePathname();
    const textColor = pathname === "/signin" || pathname === "/signup" ? "text-white" : "text-black";

    return (
        <span>
            <Link
                href={'/'}
                className={` fixed  ml-32 mt-3 text-6xl ${jersey_10.className} ${textColor}`}
                style={{ backgroundColor: 'transparent', zIndex: 1000 }}
            >
                BE
            </Link>
        </span>
    );
}
