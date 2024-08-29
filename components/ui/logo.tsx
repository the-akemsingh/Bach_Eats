import { jersey_10 } from "@/app/fonts";
import Link from "next/link";

export default function Logo() {
    return <span>
        <Link href={'/'} className={` absolute ml-32 mt-4 text-6xl  ${jersey_10.className}`} style={{ backgroundColor: 'transparent', zIndex: 10 }} >
            BE
        </Link>
    </span>
}