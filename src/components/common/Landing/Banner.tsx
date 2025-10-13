import { images, whyWeAre } from "@/assets/assets";

export default function Banner() {
  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10 bg-orange-50 rounded-2xl shadow-md px-6 md:px-10 py-10">
        {/* === Image Box (Left Side) === */}
        <div className="flex justify-start md:w-1/2 w-full">
          <div className="relative w-[16rem] sm:w-[20rem] md:w-[24rem] h-[22rem] sm:h-[26rem] md:h-[28rem] bg-gradient-to-b from-orange-400 to-orange-200 rounded-t-full overflow-hidden flex items-end justify-center mx-auto md:mx-0">
            <img
              src={images.chef2}
              alt="chef"
              className="absolute bottom-0 w-auto max-w-[90%] h-auto object-contain"
            />
          </div>
        </div>

        {/* === Content Section (Right Side) === */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          {/* Section Title */}
          <h2 className="capitalize text-2xl md:text-3xl font-bold text-orange-500">
            Why We Are The Best?
          </h2>

          {/* List of Reasons */}
          <div className="space-y-5">
            {whyWeAre.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 border border-orange-200 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon / Image */}
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                    src={item.image}
                    alt={item.title}
                  />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// import { images, whyWeAre } from "@/assets/assets";

// export default function Banner() {
//   return (
//     <section>
//       <div className="md:h-[70vh] md:my-10 w-full bg-orange-50 rounded shadow flex gap-10 justify-between px-10">
//         {/* img box */}
//         <div className="img flex items-center justify-center p-4">
//           <div className="relative w-[20rem] md:w-[24rem] h-[28rem] bg-gradient-to-b from-orange-400 to-orange-200 rounded-t-full overflow-hidden flex items-end justify-center">
//             {/* Chef Image */}
//             <img
//               src={images.chef2}
//               alt="chef"
//               className="absolute bottom-0 w-auto max-w-[90%] h-auto object-contain"
//             />
//           </div>
//         </div>

//         {/* <Content /> */}
//         <div className="space-y-6">
//           {/* Section Title */}
//           <h2 className="capitalize md:text-3xl py-4 text-2xl font-bold text-orange-500 ">
//             Why We Are The Best?
//           </h2>

//           {/* List of Reasons */}
//           <div className="space-y-5">
//             {whyWeAre.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-start gap-4 p-4  border-[1px] border-orange-200 rounded"
//               >
//                 {/* Icon or Image */}
//                 <div className="flex-shrink-0">
//                   <img
//                     className="w-14 h-14 object-contain"
//                     src={item.image}
//                     alt={item.title}
//                   />
//                 </div>

//                 {/* Text Content */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 leading-snug">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
