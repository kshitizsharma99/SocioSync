import React, { useEffect, useState } from "react";
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
} from "antd";

const { Option } = Select;

export default function AdminPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("category");

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 Fetch complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/complaints");
      const data = await res.json();

      const formatted = data.map((item) => ({
        key: item._id,
        id: item._id.slice(-6),
        user: item.name,
        urgency: item.urgency?.toUpperCase(),
        status: item.status,
        services: item.serviceTitle,
        fullData: item, // 🔥 keep full object for detail panel
      }));

      setComplaints(formatted);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Polling
  useEffect(() => {
    fetchComplaints();

    // const interval = setInterval(() => {
    //   fetchComplaints();
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);

  // 🔄 Status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/complaints/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchComplaints();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const filteredComplaints = complaints.filter((item) => {
    const statusMatch =
      statusFilter === "all" || item.status === statusFilter;

    const serviceMatch =
      serviceFilter === "category" || item.services === serviceFilter;

    return statusMatch && serviceMatch;
  });;

  // 📊 Stats
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "pending").length;
  const completed = complaints.filter((c) => c.status === "completed").length;

  // 📋 Table columns
  const columns = [
    {
      title: "Complaint ID",
      dataIndex: "id",
      render: (text) => <span className="font-semibold">#{text}</span>,
    },
    {
      title: "User",
      dataIndex: "user",
      render: (user) => (
        <div className="flex items-center gap-2">
          <Avatar>{user?.[0]}</Avatar>
          {user}
        </div>
      ),
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      render: (urgency) => (
        <Tag color={urgency === "EMERGENCY" ? "red" : "green"}>
          {urgency}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = "blue";
        if (status === "pending") color = "red";
        if (status === "seen") color = "orange";
        if (status === "scheduled") color = "purple";
        if (status === "completed") color = "green";

        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  console.log(complaints);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-6 bg-transparent min-h-screen">


      {/* LEFT SIDE */}
      <div className="w-full lg:w-2/3 flex flex-col justify-between">

        {/* Stats */}
        <div>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card className="border border-gray-400 shadow-md rounded-xl">
                <p className="text-xs text-gray-400 uppercase">Total</p>
                <h2 className="text-2xl font-bold">{total}</h2>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card className="shadow-md rounded-xl border border-gray-400">
                <p className="text-xs text-gray-400 uppercase">Pending</p>
                <h2 className="text-2xl font-bold text-red-500">{pending}</h2>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card className="shadow-md rounded-xl border border-gray-400">
                <p className="text-xs text-gray-400 uppercase">Completed</p>
                <h2 className="text-2xl font-bold text-green-500">
                  {completed}
                </h2>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Filters */}
        <div className="my-2">
          <Card className="border border-gray-400 shadow-md rounded-xl">
            <div className="flex flex-col md:flex-row gap-3">
              <Select
                value={serviceFilter}
                onChange={(value) => setServiceFilter(value)}
                className="w-full md:w-48"
              >
                <Option value="category">Service Category</Option>
                <Option value="Professional Plumber">Plumbing</Option>
                <Option value="Expert Electrician">Electrical</Option>
                <Option value="Skilled Carpenter">Carpenter</Option>
                <Option value="Appliance Repair">Repair</Option>
                <Option value="Deep Cleaning">Cleaning</Option>
                <Option value="Pest Control">Pest</Option>
                <Option value="Home Painting">Painting</Option>
                <Option value="Gardening Services">Gardening</Option>
              </Select>

              <Select
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
                className="w-full md:w-48"
              >
                <Option value="all">Status: All</Option>
                <Option value="pending">Pending</Option>
                <Option value="seen">Seen</Option>
                <Option value="scheduled">Scheduled</Option>
                <Option value="completed">Completed</Option>
              </Select>

              <DatePicker className="w-full md:w-48" />
            </div>
          </Card>
        </div>

        {/* Table */}
        <div>
          <Card className="mt-4 shadow-lg rounded-xl">
            {loading ? (
              <div className="flex justify-center py-10">
                <Spin size="large" />
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={filteredComplaints}
                pagination={{ pageSize: 4 }}
                onRow={(record) => ({
                  onClick: () => setSelectedComplaint(record),
                })}
              />
            )}
          </Card>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/3">
        <Card className="h-full shadow-lg border border-gray-400 rounded-xl">
          {selectedComplaint ? (
            <div className="space-y-4">

              <h2 className="text-lg font-semibold">
                Complaint #{selectedComplaint.id}
              </h2>

              <p><strong>User:</strong> {selectedComplaint.user}</p>
              <p><strong>Status:</strong> {selectedComplaint.status}</p>
              <p><strong>Urgency:</strong> {selectedComplaint.urgency}</p>

              {/* EXTRA DETAILS */}
              <p><strong>Service:</strong> {selectedComplaint.fullData.serviceTitle}</p>
              <p><strong>Phone:</strong> {selectedComplaint.fullData.phone}</p>
              <p><strong>Address:</strong> {selectedComplaint.fullData.address}</p>
              <p><strong>Description:</strong> {selectedComplaint.fullData.description}</p>

              {/* Status Update */}
              <div>
                <p className="text-sm font-semibold mb-1">Update Status</p>

                <Select
                  defaultValue="choose status"
                  className="w-full"
                  onChange={(value) =>
                    handleStatusChange(selectedComplaint.key, value)
                  }
                >
                  <Option value="pending">Pending</Option>
                  <Option value="seen">Seen</Option>
                  <Option value="scheduled">Scheduled</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </div>

            </div>
          ) : (
            <div className="text-gray-400 text-center py-10">
              Select a complaint to view details
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}