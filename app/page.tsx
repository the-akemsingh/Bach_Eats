"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { calistoga, jersey_10, pacifico } from "./fonts";
import { FlipWords } from "@/components/ui/flip-words";
import { Lamp } from "@/components/ui/lamp";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ActivitiesCard } from "@/components/page/activities";


export default function Home() {
  const session = useSession();

  return (
    <div className="overflow-hidden">


      <div className=" mb-14 mt-20 bg-transparent top-10  flex flex-col justify-center">
        <div className={`
          mt-44 left-24 relative
          flex flex-col text-6xl  pt-5  pb-5  ${calistoga.className}`} >

          <FlipWords className="text-red-400" words={["Not in mood to cook today?", "Feeling lonely?", "Out of groceries?", "Or want to share a meal?"]}></FlipWords>

          <div className={`text-xl m-auto pt-36 pr-44 flex gap-3 ${pacifico.className}`} style={{ letterSpacing: 2 }} >
            Join now and discover new friendships, enjoy delicious food, <br /> and make your days more enjoyable!
            <div className="h-7 w-7 flex gap-2">
              <Image src={'/images/teaicon.svg'} height={25} width={25} alt="Tea Cup" />
              <Image src={'/images/Plate.svg'} height={25} width={25} alt="Food Plate" />
            </div>
          </div>

        </div>

    
        <div className="flex justify-center mt-28 text-3xl ">
          <div className={`${jersey_10.className}`}>
           ⁓ DESIGNED BY BACHELORS FOR THE BACHELORS ⁓
          </div>
        </div>
      </div>

      <ActivitiesCard></ActivitiesCard>
      {/* <Lamp></Lamp> */}

      <div className="m-5">
        show invites here maybe some samples
      </div>

      {/* <ReqReceivedComponent></ReqReceivedComponent> */}

    </div>
  );
}