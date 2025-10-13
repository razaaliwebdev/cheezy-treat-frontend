import { dailySpecial } from "@/assets/assets";

const DailySpecial = () => {
  return (
    <section className="md:my-10">
      <h2 className="md:text-xl font-bold text-lg mt-5">Daily Special</h2>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-8 my-2">
          {dailySpecial.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center justify-center flex-col md:px-8 py-5 px-5 border-[1px] border-gray-200 rounded   my-5 hover:border-orange-400 hover:shadow hover:shadow-orange-400 transition-all "
              >
                <div className="img md:w-74 w-55">
                  <img
                    src={item.image}
                    className="h-full w-full object-cover"
                    alt={item.name}
                  />
                </div>
                <h3 className="md:text-lg my-2 font-medium">{item.name}</h3>
                <p className="text-sm text-gray-400 text-center">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DailySpecial;
