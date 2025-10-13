import Hero from "@/components/common/Landing/Hero";
import DailySpecial from "@/components/common/Landing/DailySpecial";
import Faqs from "@/components/common/Landing/Faqs";

const Home = () => {
  return (
    <div className="md:px-14 px-6 md:py-4 py-3">
      <Hero />
      <DailySpecial />
      <Faqs />
    </div>
  );
};

export default Home;
