import { NavLink } from "react-router-dom";
import { Button, Image } from 'antd';

function Navbar() {
  return (
    <div className="navbar w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-4 flex align-center flex-wrap">

      <div className="home-button">

        <NavLink to={"/"}>
          <Button type="text" className="!text-base">
            Home
          </Button>
        </NavLink>

      </div>

      <div className="service-button">

        <NavLink to={"/services"}>
          <Button type="text" className=" !text-base">
            Services
          </Button>
        </NavLink>

      </div>

    </div>
  );
}

export default Navbar;