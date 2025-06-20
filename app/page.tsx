import { ActivitiesCard } from "@/components/page/activities";
import Footer from "@/components/page/footer";
import HowBachEatsWorks from "@/components/page/HowBachEatsWorks";
import Hero from "@/components/page/hero";
import { VelocityText } from "@/components/ui/velocity-text";


export default function Home() {
  return (
    <div className="">
      <Hero />
      <ActivitiesCard />
      <HowBachEatsWorks/>
      <VelocityText />
      <Footer />
    </div>
  );
}
