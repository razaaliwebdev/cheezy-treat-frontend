import Hero from "@/components/common/Landing/Hero";
import DailySpecial from "@/components/common/Landing/DailySpecial";
import Banner from "@/components/common/Landing/Banner";

const Home = () => {
  return (
    <div className="md:px-14 px-6 md:py-4 py-3">
      <Hero />
      <DailySpecial />
      <Banner />
    </div>
  );
};

export default Home;
