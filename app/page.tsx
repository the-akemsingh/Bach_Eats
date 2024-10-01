"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { calistoga, jersey_10, merriweather, pacifico, poppins } from "./fonts";
import { FlipWords } from "@/components/ui/flip-words";
import { Lamp } from "@/components/ui/lamp";
import { ActivitiesCard } from "@/components/page/activities";
import Link from "next/link";


export default function Home() {

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

      <ActivitiesCard />

      <Lamp>
        <Link href={'/invitations/all'} className="text-white text-2xl" >{"Explore >"} </Link>
      </Lamp>


      <div className="m-5">
        <h2 className={`${merriweather.className} text-3xl font-semibold mb-6 text-center`}>
          How Bach Eats Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg ">
            <h3 className={`${poppins.className} text-xl font-semibold mt-2 text-red-600`}>
              Create Invite
            </h3>
            <p className="text-gray-600 text-center">
              Post an invite for a meal you&#39;re interested in sharing. Specify details like cuisine, location, and time.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg  ">
            <h3 className={`${poppins.className} text-xl font-semibold mt-2 text-red-600`}>
              View Invites
            </h3>
            <p className="text-gray-600 text-center">
              Browse invites posted by other users and send them requests to join their meals.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg  ">
            <h3 className={`${poppins.className} text-xl font-semibold mt-2 text-red-600`}>
              Manage Requests
            </h3>
            <p className="text-gray-600 text-center">
              Review requests sent to your invites and decide whether to approve or decline them.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg  ">
            <h3 className={`${poppins.className} text-xl font-semibold mt-2 text-red-600`}>
              View Profile
            </h3>
            <p className="text-gray-600 text-center">
              See information about yourself, your posted invites, and manage them as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}