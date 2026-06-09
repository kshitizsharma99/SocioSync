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

export default function AdminPage() {
  const [complaints, setComplaints] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("category");
  const [selectedDate, setSelectedDate] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));


  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("https://sociosync-backend-6dqc.onrender.com/api/complaints", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();

      const formatted = data.map((item) => ({
        key: item._id,
        id: item._id.slice(-6),
        user: item.name,
        urgency: item.urgency?.toUpperCase(),
        status: item.status,
        services: item.serviceTitle,
        fullData: item,
      }));

      setComplaints(formatted);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://sociosync-backend-6dqc.onrender.com/api/auth/mechanics", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setMechanics(data);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
    }
  };


  useEffect(() => {
    fetchComplaints();
    fetchMechanics();
  }, []);


  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`https://sociosync-backend-6dqc.onrender.com/api/complaints/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setSelectedComplaint(prev => ({
        ...prev,
        status: newStatus
      }));

      message.success("Status updated successfully 🔥");

      fetchComplaints();
    } catch (err) {
      message.error("Status update failed ❌");
      console.error(err);
    }
  };

  const assignMechanic = async (complaintId, mechanicId) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`https://sociosync-backend-6dqc.onrender.com/api/complaints/${complaintId}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mechanicId })
      });

      message.success("Mechanic assigned 🔥");
      fetchComplaints();
    } catch (err) {
      message.error("Assignment failed ❌");
    }
  };

  const filteredComplaints = complaints.filter((item) => {
    const statusMatch =
      statusFilter === "all" || item.status === statusFilter;

    const serviceMatch =
      serviceFilter === "category" || item.services === serviceFilter;

    const dateMatch =
      !selectedDate ||
      new Date(item.fullData.createdAt).toDateString() ===
      selectedDate.toDate().toDateString();

    return statusMatch && serviceMatch && dateMatch;
  });

  const statusIndex = {
    pending: 0,
    assigned: 1,
    "in-progress": 2,
    completed: 3
  }[selectedComplaint?.status] ?? 0;


  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "pending").length;
  const completed = complaints.filter((c) => c.status === "completed").length;


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
        const styles = {
          pending: "bg-red-100 text-red-600",
          assigned: "bg-blue-100 text-blue-600",
          "in-progress": "bg-purple-100 text-purple-600",
          completed: "bg-green-100 text-green-600",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all duration-200 ${styles[status]}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  console.log(complaints);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-6 bg-transparent min-h-screen">



      <div className="w-full lg:w-2/3 flex flex-col gap-6">


        <div>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card className="rounded-xl border border-gray-200 shadow-md 
transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <p className="text-xs text-gray-400 uppercase">Total</p>
                <h2 className="text-2xl font-bold">{total}</h2>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card className="rounded-xl border border-gray-200 shadow-md 
transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <p className="text-xs text-gray-400 uppercase">Pending</p>
                <h2 className="text-2xl font-bold text-red-500">{pending}</h2>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card className="rounded-xl border border-gray-200 shadow-md 
transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <p className="text-xs text-gray-400 uppercase">Completed</p>
                <h2 className="text-2xl font-bold text-green-500">
                  {completed}
                </h2>
              </Card>
            </Col>
          </Row>
        </div>


        <div className="my-2">
          <Card className="rounded-xl border border-gray-200 shadow-md 
transition-all duration-300 hover:shadow-lg">
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
        </div>


        <div>
          <Card className="mt-4 rounded-xl border border-gray-200 shadow-md 
transition-all duration-300 hover:shadow-lg overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-10 animate-pulse">
                <Spin size="large" />
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={filteredComplaints}
                pagination={{ pageSize: 4 }}

                rowClassName={(record) =>
                  `transition-all duration-200 cursor-pointer
     ${record.key === selectedComplaint?.key
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"}`
                }

                onRow={(record) => ({
                  onClick: () => setSelectedComplaint(record),
                })}
              />
            )}
          </Card>
        </div>
      </div>



      <div className="w-full h-full lg:w-1/3">

        <Card className="h-full overflow-y-auto p-2 custom-scrollbar shadow-lg border-0 rounded-2xl bg-white">
          {selectedComplaint ? (
            <div className="space-y-5">


              <div className="border-b pb-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  Complaint #{selectedComplaint.id}
                </h2>
                <p className="text-sm text-gray-400">
                  Manage complaint details and status
                </p>
              </div>


              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">User Info</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">User:</span> {selectedComplaint.user}</p>
                  <p><span className="font-medium">Phone:</span> {selectedComplaint.fullData.phone}</p>
                  <p><span className="font-medium">Address:</span> {selectedComplaint.fullData.address}</p>
                </div>
              </div>


              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Service Details</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Service:</span> {selectedComplaint.fullData.serviceTitle}</p>
                  <p><span className="font-medium">Urgency:</span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs ${selectedComplaint.urgency === "EMERGENCY"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                      }`}>
                      {selectedComplaint.urgency}
                    </span>
                  </p>
                  <p><span className="font-medium">Description:</span> {selectedComplaint.fullData.description}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Progress</h3>

                <p className="text-sm mb-2">
                  <span className="font-medium">Status:</span>{" "}
                  <span className="capitalize">{selectedComplaint.status}</span>
                </p>

                <Steps
                  current={statusIndex}
                  size="small"
                  items={[
                    { title: "Pending" },
                    { title: "Assigned" },
                    { title: "In Progress" },
                    { title: "Completed" }
                  ]}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Actions</h3>


                {!selectedComplaint.fullData.assignedTo && (
                  <Select
                    placeholder="Assign Mechanic"
                    className="w-full mb-3"
                    onChange={(value) =>
                      assignMechanic(selectedComplaint.key, value)
                    }
                  >
                    {mechanics.map((m) => (
                      <Option key={m._id} value={m._id}>
                        {m.fullName}
                      </Option>
                    ))}
                  </Select>
                )}


                <Select
                  value={selectedComplaint?.status}
                  className="w-full"
                  onChange={(value) =>
                    handleStatusChange(selectedComplaint.key, value)
                  }
                >
                  <Option value="assigned">Assigned</Option>
                  <Option value="in-progress">In Progress</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </div>

            </div>
          ) : (
            <div className="text-gray-400 text-center py-16">
              Select a complaint to view details
            </div>
          )}
        </Card>
      </div>
    </div>

  );
}