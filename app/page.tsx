import { ActivitiesCard } from "@/components/page/activities";
import HowBachEatsWorks from "@/components/page/HowBachEatsWorks";
import Hero from "@/components/page/hero";
import { VelocityText } from "@/components/ui/velocity-text";


export default function Home() {
  return (
    <div className="">
      <div id="hero-section">
      <Hero />
      </div>
      <ActivitiesCard />
      <HowBachEatsWorks/>
      <VelocityText />
    </div>
  );
}
