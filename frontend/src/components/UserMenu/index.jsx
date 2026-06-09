import { Avatar, Dropdown } from "antd";
import {
    UserOutlined,
} from "@ant-design/icons";
import ProfileModal from "../ProfileModal";
import { useState } from "react";

function UserMenu() {

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };
    const [profileOpen, setProfileOpen] = useState(false);

    const items = [
        {
            key: "profile",
            label: "Profile",
            onClick: () => setProfileOpen(true),
        },
        {
            key: "settings",
            label: "Settings",
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            label: "Logout",
            onClick: handleLogout,
        },
    ];

    return (
        <div>

            <Dropdown menu={{ items }} trigger={["click"]}>
                <div className="flex items-center gap-3 cursor-pointer">

                    <div className="relative">
                        <Avatar
                            size={30}
                            src={
                                user.photo
                                    ? `https://sociosync-backend-6dqc.onrender.com/uploads/${user.photo}`
                                    : null
                            }
                            icon={<UserOutlined />}
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>

                    <div className="hidden md:flex flex-col leading-tight">
                        <span className="">{user.fullName}</span>

                    </div>

                </div>
            </Dropdown>
            <ProfileModal
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
            />
        </div>
    );
}

export default UserMenu;