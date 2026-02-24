import "./servicePage.css";
function ServicePage() {
  return (
    <div className="w-full min-h-screen pb-20">

      {/* --- TOP SECTION: Header & Search --- */}
      <div className="pt-16 pb-8 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-6 tracking-tight">
          Your Home, Our Priority.
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="What service do you need today?"
            className="w-full pl-6 pr-14 py-4 rounded-full border border-gray-200 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all"
          />
          <button className="absolute right-2 top-2 bottom-2 aspect-square bg-[#FF6B6B] text-white rounded-full flex items-center justify-center hover:bg-[#ff5252] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>
      </div>

      {/* --- FILTER BUTTONS ROW --- */}
      <div className="mx-4 md:mx-20 my-8">
        <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2 items-center justify-start md:justify-center no-scrollbar">
          <button className="shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full bg-[#FF6B6B] text-white font-medium shadow-md">
            All
          </button>
          <button className="shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Emergency
          </button>
          <button className="shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Repairs
          </button>
          <button className="shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cleaning
          </button>
          <button className="shrink-0 whitespace-nowrap px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Installations
          </button>
        </div>
      </div>

      {/* --- THE 8-CARD RESPONSIVE GRID --- */}
      <div className="mx-4 md:mx-20">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Card 1: Electrician */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Expert Electrician</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">Fix wiring, switches, and install appliances safely.</p>
            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
              Book Now
            </button>
          </div>

          {/* Card 2: Plumber */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Professional Plumber</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">Repair leaks, unclog drains, and fix bathroom fixtures.</p>
            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
              Book Now
            </button>
          </div>

          {/* Card 3: Carpenter */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Skilled Carpenter</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">Furniture assembly, repairs, and custom woodwork.</p>
            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
              Book Now
            </button>
          </div>

          {/* Card 4: Appliance Repair */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Appliance Repair</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">Service for AC, fridge, washing machine, and more.</p>
            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
              Request
            </button>
          </div>

          {/* Card 5: Deep Cleaning */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Deep Cleaning</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">Full home cleaning and sanitization services.</p>
            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
              Book Now
            </button>
          </div>

          {/* Card 6: Pest Control */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Pest Control</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">Effective treatment for termites, cockroaches, etc.</p>
            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
              Book Now
            </button>
          </div>

          {/* Card 7: Gardening */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Gardening Services</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">Lawn care, pruning, and garden maintenance.</p>
            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
              Request
            </button>
          </div>

          {/* Card 8: Home Painting */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Home Painting</h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">Interior and exterior painting by professionals.</p>
            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
              Request
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ServicePage;