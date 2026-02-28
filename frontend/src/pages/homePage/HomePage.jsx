import { Button } from "antd";
import { NavLink } from "react-router-dom";
function HomePage() {

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-12">

      <div className="flex-1 flex flex-col justify-center text-center lg:text-left space-y-6">

        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-tight">
          Reliable Local Services, Just One Click Away
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0">
          Connect instantly with verified mechanics, plumbers, electricians,
          and carpenters. Book services, track progress, and solve daily
          problems without the hassle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 justify-center lg:justify-start">

          <NavLink to={"/auth"}>
            <button className="flex-1 sm:flex-none bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300">
              Get Started Now
            </button>
          </NavLink>

          <NavLink to={"/services"}>
            <button className="flex-1 sm:flex-none border-2 border-[#FF6B6B] text-[#FF6B6B] font-semibold px-8 py-3 rounded-full hover:bg-[#FF6B6B] hover:text-white transition-all duration-300">
              Watch Demo
            </button>
          </NavLink>

        </div>

      </div>

      <div className="flex-1 flex justify-center mb-10 lg:mb-0">
        <img
          className="w-full block w-[110%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full h-auto object-contain max-h-[60vh] w-auto object-contain mx-auto"
          src="/img/newnoBackground.png"
          alt="Hero"
        />
      </div>

    </div>
  );
}

export default HomePage;