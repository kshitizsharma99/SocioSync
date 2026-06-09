import { Select, Card, Tag, Button, DatePicker } from "antd";

function ComplaintSidebar({
    complaints,
    selectedComplaint,
    setSelectedComplaint,
    role,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter
}) {

    const statusColors = {
        pending: "red",
        assigned: "blue",
        "in-progress": "gold",
        completed: "green"
    };

    console.log("Current role:", role);

    return (
        <div className="w-full lg:w-80 h-full bg-rgba(255, 255, 255, 0.64) rounded-2xl shadow-sm p-4 border border-gray-100 flex flex-col gap-4">


            {role === "mechanic" && (
                <Select
                    placeholder="Filter Status"
                    value={statusFilter || undefined}
                    allowClear
                    className="w-full"
                    onChange={(value) => setStatusFilter(value || "")}
                    options={[
                        {
                            label: "Assigned",
                            value: "assigned"
                        },
                        {
                            label: "In Progress",
                            value: "in-progress"
                        },
                        {
                            label: "Completed",
                            value: "completed"
                        }
                    ]}
                />

            )}
            {role === "mechanic" && (
                <DatePicker
                    className="w-full"
                    placeholder="Filter Date"
                    value={dateFilter}
                    onChange={(date) => setDateFilter(date)}
                    allowClear
                />
            )}

            {role === "resident" && (
                <Select
                    value={selectedComplaint?._id}
                    placeholder="Select Complaint"
                    className="w-full"
                    onChange={(value) => {
                        const found = complaints.find(c => c._id === value);
                        setSelectedComplaint(found);
                    }}

                    options={complaints.map(c => ({
                        label: `${c.serviceTitle}`,
                        value: c._id
                    }))}
                />
            )}


            <div className="max-h-64 lg:max-h-none lg:flex-1 overflow-y-auto hide-scrollbar space-y-3">
                {complaints.map((complaint) => (
                    <div
                        key={complaint._id}
                        onClick={() => setSelectedComplaint(complaint)}
                        className={`p-3 rounded-xl cursor-pointer transition
              ${selectedComplaint?._id === complaint._id
                                ? "bg-blue-50 border border-blue-200"
                                : "hover:bg-gray-50"
                            }`}
                    >
                        <p className="font-medium text-sm">
                            {complaint.serviceTitle}
                        </p>

                        <p className="text-xs text-gray-500">
                            {new Date(complaint.createdAt).toLocaleDateString()}
                        </p>

                        <Tag
                            color={statusColors[complaint.status]}
                            className="mt-1"
                        >
                            {complaint.status}
                        </Tag>
                    </div>
                ))}
            </div>

            <Button
                type="primary"
                className="!bg-[#FF6B6B] !border-none hover:!bg-[#ff5252] !rounded-xl"
            >
                Contact Support
            </Button>

        </div>
    );
}

export default ComplaintSidebar;