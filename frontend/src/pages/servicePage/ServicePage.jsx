import "./servicePage.css";
import BookingModal from "../../components/BookingModal";
import ServiceCard from "../../components/ServiceCard";
import services from "../../data/services";
import { useState } from "react";

function ServicePage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleCardClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen pb-20">

      <div className="pt-16 pb-8 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-6 tracking-tight">
          Your Home, Our Priority.
        </h1>

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
      <div className="mx-4 md:mx-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onClick={() => handleCardClick(service)}
            />
          ))}
        </div>
      </div>

      <BookingModal
        open={isModalOpen}
        service={selectedService}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}

export default ServicePage;