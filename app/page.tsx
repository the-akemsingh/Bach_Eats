"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { calistoga, merriweather, poppins } from "./fonts";
export default function Home() {
  const session = useSession();
  const Router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-2 mt-1 "
        style={{
          position: "relative",
          minHeight: "90vh",
          backgroundImage: "url('/images/red flower centre.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "80%",
        }}>
        <div className="flex flex-col ">
          <div className={` mt-32 ml-24 flex flex-col text-6xl pt-5 pl-5 pb-5 text-white ${calistoga.className} `}>
            Don't feel like cooking today ? <br />
            or Feeling Lonely ?<br />
            <div className="text-xl mt-5 flex gap-3">
              Find out bachelor's nearby and share meal with them. <div className=" h-7 w-7"><Image src={'/images/teaicon.svg'} height={25} width={25} alt="Tea Cup" ></Image></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 min-h-96 p-4 ">
        <div>
          <div className={`text-4xl rounded-lg min-h-96 pt-24 pl-4 m-2 ${calistoga.className} `}>
            What we have got for you ?
          </div>
        </div>
        <div className={`col-span-2 grid grid-cols-5 text-2xl font-bold gap-4 p-4 ${merriweather.className} `}>
          <div className="bg-slate-400  rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
            Show your cooking skills
          </div>
          <div className="bg-neutral-500  rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
            Wanna sing for someone ?
          </div>
          <div className="bg-yellow-600  rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
            or Do you want to listen to someone ?
          </div>
          <div className="bg-indigo-800  rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
            Have a music instrument ?
          </div>
          <div className="bg-red-600  rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
            Feeling Lonely ?
          </div>
        </div>
      </div>


    </div>
  );
}
