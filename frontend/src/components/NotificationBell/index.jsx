import { useEffect, useState } from "react";
import { Badge, Dropdown, List } from "antd";
import { BellOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
                `https://sociosync-backend-6dqc.onrender.com/api/notifications/${user._id}`
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
                `https://sociosync-backend-6dqc.onrender.com/api/notifications/mark-read/${id}`
            );
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    const menu = (
        <div
            style={{
                width: 320,
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
            }}
        >
            <div
                style={{
                    padding: "12px",
                    fontWeight: "600",
                    borderBottom: "1px solid #eee"
                }}
            >
                Notifications
            </div>
            <List
                style={{
                    width: 320,
                    maxHeight: 400,
                    overflow: "auto",
                    borderRadius: "12px",
                    background: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
                dataSource={notifications}
                locale={{
                    emptyText: "🔔 No notifications yet"
                }}
                renderItem={(item) => (
                    <List.Item
                        onClick={() => markAsRead(item._id)}
                        style={{
                            cursor: "pointer",
                            background: item.read ? "#fff" : "#f6ffed",
                            padding: "12px"
                        }}
                    >
                        <div>
                            <div>{item.message}</div>

                            <small style={{ color: "#888" }}>
                                {dayjs(item.createdAt).fromNow()}
                            </small>
                        </div>
                    </List.Item>
                )}
            />
        </div>
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