import { Select, Card, Tag, Button } from "antd";

function ComplaintSidebar({
    complaints,
    selectedComplaint,
    setSelectedComplaint,
    role
}) {

    const statusColors = {
        pending: "red",
        seen: "gold",
        scheduled: "blue",
        completed: "green"
    };

    const statusSummary = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === "pending").length,
        scheduled: complaints.filter(c => c.status === "scheduled").length,
        completed: complaints.filter(c => c.status === "completed").length
    };

    console.log("Current role:", role);

    return (
        <div className="w-full lg:w-80 bg-rgba(255, 255, 255, 0.64) rounded-2xl shadow-sm p-4 border border-gray-100 flex flex-col gap-4">


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

            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3">
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



            {role === "admin" && (
                <div className="grid grid-cols-2 gap-3">
                    <Card size="small">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-lg font-semibold">{statusSummary.total}</p>
                    </Card>

                    <Card size="small">
                        <p className="text-xs text-gray-500">Pending</p>
                        <p className="text-lg font-semibold text-red-600">
                            {statusSummary.pending}
                        </p>
                    </Card>

                    <Card size="small">
                        <p className="text-xs text-gray-500">Scheduled</p>
                        <p className="text-lg font-semibold text-blue-600">
                            {statusSummary.scheduled}
                        </p>
                    </Card>

                    <Card size="small">
                        <p className="text-xs text-gray-500">Completed</p>
                        <p className="text-lg font-semibold text-green-600">
                            {statusSummary.completed}
                        </p>
                    </Card>
                </div>
            )}

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