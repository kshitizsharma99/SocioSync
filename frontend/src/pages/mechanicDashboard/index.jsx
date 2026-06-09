import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
    Card,
    Table,
    Tag,
    Select,
    DatePicker,
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
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedDate, setSelectedDate] = useState(null);


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

    const filteredComplaints = complaints.filter((item) => {

        const statusMatch =
            statusFilter === "all" || item.status === statusFilter;

        const dateMatch =
            !selectedDate ||
            new Date(item.fullData.createdAt).toDateString() ===
            selectedDate.toDate().toDateString();

        return statusMatch && dateMatch;
    });

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
                        <Card
                            className="rounded-xl border border-gray-200 shadow-md
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <p className="text-xs text-gray-400 uppercase">Total</p>
                            <h2 className="text-2xl font-bold text-blue-600">
                                {total}
                            </h2>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card
                            className="rounded-xl border border-gray-200 shadow-md
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <p className="text-xs text-gray-400 uppercase">
                                In Progress
                            </p>
                            <h2 className="text-2xl font-bold text-orange-500">
                                {inProgress}
                            </h2>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card
                            className="rounded-xl border border-gray-200 shadow-md
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <p className="text-xs text-gray-400 uppercase">
                                Completed
                            </p>
                            <h2 className="text-2xl font-bold text-green-600">
                                {completed}
                            </h2>
                        </Card>
                    </Col>
                </Row>

                <Card
                    className="rounded-xl border border-gray-200 shadow-md
    transition-all duration-300 hover:shadow-lg"
                >
                    <div className="flex flex-col md:flex-row gap-3">

                        <Select
                            value={statusFilter}
                            onChange={(value) => setStatusFilter(value)}
                            className="w-full md:w-48"
                        >
                            <Option value="all">Status: All</Option>
                            <Option value="assigned">Assigned</Option>
                            <Option value="in-progress">In Progress</Option>
                            <Option value="completed">Completed</Option>
                        </Select>

                        <DatePicker
                            className="w-full md:w-48"
                            onChange={(date) => setSelectedDate(date)}
                        />

                    </div>
                </Card>

                <Card
                    className="rounded-xl border border-gray-200 shadow-md
        transition-all duration-300 hover:shadow-lg overflow-hidden"
                >
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={filteredComplaints}
                            pagination={{ pageSize: 5 }}

                            rowClassName={(record) =>
                                `transition-all duration-200 cursor-pointer
                    ${record.key === selectedComplaint?.key
                                    ? "bg-blue-50"
                                    : "hover:bg-gray-50"
                                }`
                            }

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

                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-lg">
                                    Complaint #{selectedComplaint.id}
                                </h2>

                                <Tag
                                    color={
                                        selectedComplaint.fullData.urgency === "emergency"
                                            ? "red"
                                            : "green"
                                    }
                                >
                                    {selectedComplaint.fullData.urgency}
                                </Tag>
                            </div>

                            <p>
                                <b>User:</b> {selectedComplaint.user}
                            </p>

                            <p>
                                <b>Phone:</b> {selectedComplaint.fullData.phone}
                            </p>

                            <p>
                                <b>Address:</b> {selectedComplaint.fullData.address}
                            </p>

                            <p>
                                <b>Service:</b> {selectedComplaint.fullData.serviceTitle}
                            </p>

                            <p>
                                <b>Created:</b>{" "}
                                {new Date(
                                    selectedComplaint.fullData.createdAt
                                ).toLocaleString()}
                            </p>

                            <div>
                                <p>
                                    <b>Description:</b>
                                </p>

                                <div className="bg-gray-50 p-3 rounded-lg border max-h-40 overflow-y-auto mt-1">
                                    {selectedComplaint.fullData.description}
                                </div>
                            </div>

                            {selectedComplaint.fullData.photo && (
                                <div>
                                    <p className="font-semibold mb-2">
                                        Attached Photo
                                    </p>

                                    <img
                                        src={`http://localhost:5000/uploads/${selectedComplaint.fullData.photo}`}
                                        alt="Complaint"
                                        className="w-full max-h-64 object-cover rounded-lg border"
                                    />
                                </div>
                            )}

                            <Steps
                                direction={
                                    selectedComplaint?.fullData?.photo
                                        ? "horizontal"
                                        : "vertical"
                                }
                                current={statusIndex}
                                items={[
                                    { title: "Pending" },
                                    { title: "Assigned" },
                                    { title: "In Progress" },
                                    { title: "Completed" }
                                ]}
                            />

                            {/* ACTIONS */}
                            {selectedComplaint?.status !== "completed" ? (
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
                            ) : (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-center font-medium">
                                    Complaint Completed ✓
                                </div>
                            )}

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