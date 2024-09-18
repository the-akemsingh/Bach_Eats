"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { calistoga, jersey_10, pacifico } from "./fonts";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import { Lamp } from "@/components/ui/lamp";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ActivitiesCard } from "@/components/page/activities";
import ReqReceivedComponent from "@/components/page/ReqReceived";


export default function Home() {
  const session = useSession();

  return (
    <div className="overflow-hidden">

      {/* <BackgroundBeamsWithCollision > */}
        
      <div className=" mb-14 mt-14 bg-transparent top-10  flex flex-col">
        <div className={`
          mt-44 left-24 relative
          flex flex-col text-6xl  pt-5  pb-5  ${calistoga.className}`} >

          <FlipWords className="text-red-400" words={["Not in the mood to cook today?", "Feeling lonely?", "Out of groceries?", "Or want to share a meal with someone new?"]}></FlipWords>

          <div className={`text-xl mt-10 flex gap-3 ${pacifico.className}`} style={{ letterSpacing: 2 }} >
            Join now and discover new friendships, enjoy delicious food, <br /> and make your days more enjoyable!
            <div className="h-7 w-7 flex gap-2">
              <Image src={'/images/teaicon.svg'} height={25} width={25} alt="Tea Cup" />
              <Image src={'/images/Plate.svg'} height={25} width={25} alt="Food Plate" />
            </div>
          </div>

        </div>

        {!session?.data?.user && <div className={`flex gap-6  ml-32 mt-6 ${pacifico.className}`}>
          <Link href="/signup" className='transition-transform transform text-xl border rounded-2xl pt-2 pb-2 pl-6 pr-6 hover:scale-105 hover:text-red-400 hover:border-red-300'>
            Signup
          </Link>
          <Link href="/signin" className='transition-transform transform text-xl border rounded-2xl pt-2 pb-2 pl-6 pr-6 hover:scale-105 hover:text-red-400 hover:border-red-300'>
            Signin
          </Link>
        </div>
        }

      </div> 
      {/* </BackgroundBeamsWithCollision> */}
      <ActivitiesCard></ActivitiesCard>
      {/* <Lamp></Lamp> */}

      <div className="m-5">
        show invites here maybe some samples
      </div>

      <ReqReceivedComponent></ReqReceivedComponent>

    </div>
  );
}
