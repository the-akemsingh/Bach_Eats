"use client";
import { Lamp } from "@/components/ui/lamp";
import { ActivitiesCard } from "@/components/page/activities";
import Link from "next/link";
import Footer from "@/components/page/footer";
import HowBachEatsWorks from "@/components/page/HowBachEatsWorks";
import Hero from "@/components/page/hero";


export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
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
