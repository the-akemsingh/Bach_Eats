"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { calistoga, jersey_10, merriweather, pacifico, poppins } from "./fonts";
import { FlipWords } from "@/components/ui/flip-words";
import { Lamp } from "@/components/ui/lamp";
import { ActivitiesCard } from "@/components/page/activities";
import Link from "next/link";
import Footer from "@/components/page/footer";
import HowBachEatsWorks from "@/components/page/working";

export default function Home() {

  return (
    <div className="overflow-hidden">

      <div className="mb-14 mt-20 bg-transparent top-10 flex flex-col justify-center">

        <div className={`relative mt-32 sm:mt-44 px-5 md:left-24 md:mt-44 flex flex-col text-center md:text-left text-4xl sm:text-5xl md:text-6xl font-extrabold`}>
          <FlipWords className="text-red-400" words={["Not in mood to cook today?", "Feeling lonely?", "Out of groceries?", "Or want to share a meal?"]}></FlipWords>

          <div className={`text-lg sm:text-xl lg:text-2xl m-auto pt-12 sm:pt-20 md:pt-36 pr-0 sm:pr-0 md:pr-44 flex gap-3 ${pacifico.className}`} style={{ letterSpacing: 2 }}>
            Join now and discover new friendships, enjoy delicious food, <br /> and make your days more enjoyable!
            <div className="flex gap-2 sm:block hidden">
              <Image src={'/images/teaicon.svg'} height={20} width={20} alt="Tea Cup" />
              <Image src={'/images/Plate.svg'} height={20} width={20} alt="Food Plate" />
            </div>
          </div>

        </div>

        <div className="flex justify-center mt-10 sm:mt-28 text-xl sm:text-2xl md:text-3xl text-center">
          <div className={`${jersey_10.className}`}>
            ⁓ DESIGNED BY BACHELORS FOR THE BACHELORS ⁓
          </div>
        </div>


      </div>

      <ActivitiesCard />

      <Lamp>
        <Link href={'/invitations/all'} className="text-white text-xl sm:text-2xl">
          {"Explore >"}
        </Link>
      </Lamp>

      <HowBachEatsWorks></HowBachEatsWorks>

      <Footer />
    </div>
  );
}
