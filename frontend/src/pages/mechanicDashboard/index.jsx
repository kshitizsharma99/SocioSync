import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
    Card,
    Table,
    Tag,
    Select,
    Row,
    Col,
    Avatar,
    Spin,
    Steps
} from "antd";

const { Option } = Select;

function MechanicDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/api/complaints", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            const formatted = data.map((item) => ({
                key: item._id,
                id: item._id.slice(-6),
                user: item.user?.fullName,
                status: item.status,
                fullData: item
            }));

            setComplaints(formatted);

            if (formatted.length > 0) {
                setSelectedComplaint(formatted[0]);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            await fetch(`http://localhost:5000/api/complaints/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            message.success("Updated successfully 🔥");
            fetchComplaints();

        } catch (err) {
            message.error("Update failed ❌");
        }
    };

    const statusIndex = {
        pending: 0,
        assigned: 1,
        "in-progress": 2,
        completed: 3
    }[selectedComplaint?.status] ?? 0;

    const total = complaints.length;
    const inProgress = complaints.filter(c => c.status === "in-progress").length;
    const completed = complaints.filter(c => c.status === "completed").length;

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: (text) => <b>#{text}</b>
        },
        {
            title: "User",
            dataIndex: "user",
            render: (user) => (
                <div className="flex items-center gap-2">
                    <Avatar>{user?.[0]}</Avatar>
                    {user}
                </div>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
                const colors = {
                    assigned: "blue",
                    "in-progress": "orange",
                    completed: "green"
                };
                return <Tag color={colors[status]}>{status}</Tag>;
            }
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-6 min-h-screen">

            {/* LEFT */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card><p>Total</p><h2>{total}</h2></Card>
                    </Col>
                    <Col span={8}>
                        <Card><p>In Progress</p><h2>{inProgress}</h2></Card>
                    </Col>
                    <Col span={8}>
                        <Card><p>Completed</p><h2>{completed}</h2></Card>
                    </Col>
                </Row>

                <Card>
                    {loading ? (
                        <Spin />
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={complaints}
                            onRow={(record) => ({
                                onClick: () => setSelectedComplaint(record)
                            })}
                        />
                    )}
                </Card>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-1/3">
                <Card>
                    {selectedComplaint ? (
                        <div className="space-y-4">

                            <h2 className="font-bold text-lg">
                                Complaint #{selectedComplaint.id}
                            </h2>

                            <p><b>User:</b> {selectedComplaint.user}</p>
                            <p><b>Service:</b> {selectedComplaint.fullData.serviceTitle}</p>
                            <p><b>Description:</b> {selectedComplaint.fullData.description}</p>

                            <Steps
                                current={statusIndex}
                                items={[
                                    { title: "Pending" },
                                    { title: "Assigned" },
                                    { title: "In Progress" },
                                    { title: "Completed" }
                                ]}
                            />

                            {/* ACTIONS */}
                            <Select
                                className="w-full"
                                placeholder="Update status"
                                onChange={(value) =>
                                    handleStatusChange(selectedComplaint.key, value)
                                }
                            >
                                <Option value="in-progress">Start Work</Option>
                                <Option value="completed">Mark Completed</Option>
                            </Select>

                        </div>
                    ) : (
                        <p>Select a complaint</p>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default MechanicDashboard;