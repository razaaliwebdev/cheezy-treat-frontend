import { images } from "@/assets/assets";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="md:h-[85vh] h-[80vh] w-full">
      <div className="h-full flex items-center justify-center">
        <div className="h-full w-full rounded overflow-hidden relative">
          {/* Desktop Image */}
          <img
            src={images.hero}
            className="h-full hidden md:block w-full object-cover"
            alt="hero image"
          />
          {/* Mobile Image */}
          <img
            src={images.heroMb}
            className="h-full md:hidden block w-full object-cover"
            alt="hero image"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/65 flex items-center justify-center">
            {/* Desktop untouched */}
            <div className="hidden md:block p-5">
              <h1 className="md:text-7xl font-extrabold font-sans tracking-tighter text-white">
                Super Delicious Pizza in <br />
                <span className="text-orange-400 inline-block mt-4">
                  Only 45 Minutes!
                </span>
              </h1>
              <p className="text-2xl mt-8 max-w-lg text-white leading-snug">
                Enjoy a Free Meel if Your Order Takes More Than 45 Minutes!
              </p>
              <button className="bg-white transition-all duration-500 ease-in-out px-6 py-3 mt-5 rounded font-medium flex items-center gap-2 group">
                Get Your Pizza Now
                <ArrowRight className="opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile version (responsive) */}
            <div className="md:hidden text-center px-4 w-full max-w-md">
              <h1 className="text-5xl xs:text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-white leading-tight">
                Super Delicious Pizza in
                <br />
                <span className="text-orange-400 mt-2 inline-block">
                  Only 45 Minutes!
                </span>
              </h1>
              <p className="my-3 xs:text-base sm:text-lg mt-3 text-white leading-snug">
                Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
              </p>
              <button className="bg-white hover:opacity-80 transition-all duration-500 ease-in-out px-4 xs:px-5 py-2 mt-4 rounded  font-semibold text-gray-800  xs:text-sm">
                Get Your Pizza Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { images } from "@/assets/assets";

// export default function Hero() {
//   return (
//     <section className="md:h-[85vh] h-[90vh] w-full">
//       <div className="md:h-[98%] h-full flex items-center justify-center">
//         <div className="md:h-[98%]  h-full w-full rounded overflow-hidden relative">
//           <img
//             src={images.hero}
//             className="h-full hidden md:block w-full object-cover"
//             alt="hero image"
//           />
//           <img
//             src={images.heroMb}
//             className="h-full md:hidden block w-full object-cover"
//             alt="hero image"
//           />

//           {/* overlay */}
//           <div className="absolute inset-0 md:bg-black/65 bg-black/20 flex md:items-center justify-center">
//             <div className="">
//               <h1 className="md:text-7xl text-4xl font-extrabold font-sans tracking-tighter text-white">
//                 Super Delicious Pizza in <br />
//                 <span className="text-orange-400 inline-block mt-4">
//                   Only 45 Minutes!
//                 </span>
//               </h1>
//               <p className="text-2xl mt-8 max-w-lg text-white leading-snug">
//                 Enjoy a Free Meel if Your Order Takes More Than 45 Minutes!
//               </p>
//               <button className="bg-white hover:opacity-80 transition-all duration-500 ease-in-out px-6 py-2 mt-5 rounded  font-medium">
//                 Get Your Pizza Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
