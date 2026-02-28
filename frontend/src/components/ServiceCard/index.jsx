function ServiceCard({ service, onClick }) {
    const Icon = service.icon;

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full cursor-pointer"
        >
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.bg}`}
            >
                <Icon className={`text-2xl ${service.color}`} />
            </div>

            <h3 className="text-xl font-bold text-[#0A2540] mb-2">
                {service.title}
            </h3>

            <p className="text-sm text-gray-500 mb-6 flex-grow">
                {service.description}
            </p>

            <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
                Book Now
            </button>
        </div>
    );
}

export default ServiceCard;