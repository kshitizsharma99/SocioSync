import { NavLink } from "react-router-dom";
import { Button, Image } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

import UserMenu from "../UserMenu";
import NotificationBell from "../NotificationBell";


function Navbar({ onOpenSupport }) {

  const [open, setOpen] = useState(false);
  const bannerImg = "/icon/community.gif";

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-4 flex items-center justify-between">

      <div className="flex items-center gap-6">
        <Image preview={false} src={bannerImg} height={45} width={45} />

        <div className="hidden md:flex items-center gap-6">

          <NavLink to="/">
            {({ isActive }) => (
              <Button
                type="text"
                className={`!text-base !font-medium ${isActive
                  ? "!text-[#FF6B6B] !font-semibold"
                  : ""
                  }`}
              >
                Home
              </Button>
            )}
          </NavLink>

          <NavLink to="/services">
            {({ isActive }) => (
              <Button
                type="text"
                className={`!text-base !font-medium ${isActive
                  ? "!text-[#FF6B6B] !font-semibold"
                  : ""
                  }`}
              >
                Services
              </Button>
            )}
          </NavLink>

          {user &&
            (user.role === "resident" || user.role === "mechanic") && (
              <Button
                type="text"
                onClick={onOpenSupport}
                className="!text-base !font-medium"
              >
                Support
              </Button>
            )}
        </div>

      </div>

      <div className="hidden md:flex items-center gap-5">

        {user ? (
          <>
            <NotificationBell />
            <UserMenu />
          </>
        ) : (
          <>
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
          </>
        )}

      </div>
      <div className="md:hidden">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full
          bg-white/60
          backdrop-blur-md
          border border-white/20
          shadow-xl
          rounded-2xl
          z-50
          mx-2"
        >
          <div className="flex flex-col p-4 gap-4">

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-white/40 transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-white/40 transition"
            >
              Services
            </NavLink>

            {user &&
              (user.role === "resident" || user.role === "mechanic") && (
                <button
                  onClick={() => {
                    onOpenSupport();
                    setOpen(false);
                  }}
                  className="px-4 py-3 rounded-xl hover:bg-white/40 transition"
                >
                  Support
                </button>
              )}

            {!user && (
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-white/40 transition"
              >
                Login
              </NavLink>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;