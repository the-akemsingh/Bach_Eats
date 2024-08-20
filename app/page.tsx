"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { calistoga, jersey_10, merriweather, pacifico } from "./fonts";
import Activities from "@/components/Activities";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  const Router = useRouter();

  return (
    <div className="overflow-hidden">
      <div
        className="relative"
        style={{
          position: "relative",
          minHeight: "90vh",
          backgroundImage: "url('/images/red flower centre.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
          filter: "brightness(0.5) drop-shadow(white 0px 0px 10px)",
        }}>
      </div>

      <Link href={'/'} className={`absolute  left-32 ml-2 top-4 text-6xl text-white ${jersey_10.className}`} style={{zIndex:10}}>
        BE
      </Link>


      <div className=" absolute top-10 left-4 flex flex-col">
        <div className={`mt-36 ml-24 flex flex-col text-6xl pt-5 pl-5 pb-5 text-white ${calistoga.className}`} >
          Don't feel like cooking today? <br />
          or Feeling Lonely? <br />
          <div className={`text-xl mt-7 flex gap-3 ${pacifico.className}`}>
            Find out bachelors nearby and share a meal with them.
            <div className="h-7 w-7 flex gap-2">
              <Image src={'/images/teaicon.svg'} height={25} width={25} alt="Tea Cup" />
              <Image src={'/images/Plate.svg'} height={25} width={25} alt="Food Plate" />
            </div>
          </div>
        </div>
        {!session?.data?.user && <div className='flex gap-6 text-white ml-32 mt-8'>
          <Link href="/signin" className='transition-transform transform border rounded-2xl pt-3 pb-3 pl-4 pr-4 hover:scale-105 hover:text-red-400 hover:border-red-300'>
            SIGNIN
          </Link>
          <Link href="/signup" className='transition-transform transform border rounded-2xl pt-3 pb-3 pl-4 pr-4 hover:scale-105 hover:text-red-400 hover:border-red-300'>
            SIGNUP
          </Link>
        </div>
        }
      </div>
      <Activities></Activities>

    </div>
  );
}
