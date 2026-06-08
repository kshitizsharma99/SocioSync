import { useEffect, useState } from "react";
import { Badge, Dropdown, List } from "antd";
import { BellOutlined } from "@ant-design/icons";
import axios from "axios";

function NotificationBell() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [notifications, setNotifications] = useState([]);

    if (!user || !user._id) {
        console.error("User not found");
        return null;
    }

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/notifications/${user._id}`
            );
            setNotifications(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotifications();

        const interval = setInterval(fetchNotifications, 5000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = async (id) => {
        try {
            await axios.put(
                `http://localhost:5000/api/notifications/mark-read/${id}`
            );
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    const menu = (
        <List
            style={{ width: 300, maxHeight: 400, overflow: "auto" }}
            dataSource={notifications}
            renderItem={(item) => (
                <List.Item
                    onClick={() => markAsRead(item._id)}
                    style={{
                        cursor: "pointer",
                        background: item.read ? "#fff" : "#f6ffed"
                    }}
                >
                    {item.message}
                </List.Item>
            )}
        />
    );

    return (
        <Dropdown dropdownRender={() => menu} trigger={["click"]}>
            <Badge count={unreadCount}>
                <BellOutlined className="text-xl cursor-pointer" />
            </Badge>
        </Dropdown>
    );
}

export default NotificationBell;