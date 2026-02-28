import { NavLink } from "react-router-dom";
import { Button, Image } from "antd";

function Navbar() {
  const bannerImg = "/img/logo_128.png";

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-4 flex items-center justify-between">

      <div className="flex items-center gap-6">

        <Image
          preview={false}
          src={bannerImg}
          height={45}
          width={45}
        />

        <NavLink to="/">
          <Button type="text" className="!text-base !font-medium">
            Home
          </Button>
        </NavLink>

        <NavLink to="/services">
          <Button type="text" className="!text-base !font-medium">
            Services
          </Button>
        </NavLink>

      </div>

      <div className="flex items-center gap-4">

        <NavLink to="/auth">
          <Button type="text" className="!text-base !font-medium">
            Login
          </Button>
        </NavLink>

        <NavLink to="/auth">
          <Button
            type="primary"
            className="!bg-[#FF6B6B] !border-none hover:!bg-[#ff5252] !rounded-full !px-6"
          >
            Get Started
          </Button>
        </NavLink>

      </div>
    </div>
  );
}

export default Navbar;