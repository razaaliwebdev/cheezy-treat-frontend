import Hero from "@/components/common/Landing/Hero";
import DailySpecial from "@/components/common/Landing/DailySpecial";
import Banner from "@/components/common/Landing/Banner";
import NewLatter from "@/components/common/utils/NewsLatter";

const Home = () => {
  return (
    <div className="md:px-14 px-6 md:py-4 py-3">
      <Hero />
      <DailySpecial />
      <Banner />
      <NewLatter />
    </div>
  );
};

export default Home;
