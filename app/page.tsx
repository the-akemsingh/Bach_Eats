import  { Lamp } from "@/components/ui/lamp";
import { ActivitiesCard } from "@/components/page/activities";
import Footer from "@/components/page/footer";
import HowBachEatsWorks from "@/components/page/HowBachEatsWorks";
import Hero from "@/components/page/hero";


export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <ActivitiesCard />
      <Lamp>
      </Lamp>
      <HowBachEatsWorks/>
      <Footer />
    </div>
  );
}
