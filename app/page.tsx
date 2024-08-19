"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Home() {
  const session = useSession();
  const Router = useRouter();

  return (
    <div className=" mt-20 grid grid-cols-2  min-h-96 ">
      <div className="flex flex-col ">
        <div className=" mt-36 ml-28 flex flex-col text-5xl pt-5 pl-5 pb-5 ">
          Don't feel like cooking today ? <br />
          or Feeling Lonely ?<br />
          <div className="text-xl mt-5 flex gap-3">
            Find out bachelor's nearby and share meal with them. <div className=" h-7 w-7"><Image src={'/images/teaicon.svg'} height={25} width={25} alt="Tea Cup" ></Image></div>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
