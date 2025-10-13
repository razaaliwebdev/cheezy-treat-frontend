export default function Newsletter() {
  return (
    <section className=" py-10 px-6 mt-10  ">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-orange-500">
          Never Miss a Deal!
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts delivered right to your inbox.
        </p>

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700 placeholder:text-gray-400"
          />
          <button className="w-full sm:w-auto px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-400 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
