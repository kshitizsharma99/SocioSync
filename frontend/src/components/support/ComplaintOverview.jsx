import { Card, Tag, Steps, Divider } from "antd";
import axios from "axios";

function ComplaintOverview({ complaint, role }) {
    if (!complaint) {
        return <div className="flex-1">Select a complaint</div>;
    }

    const statusIndex = {
        pending: 0,
        seen: 1,
        scheduled: 2,
        completed: 3
    }[complaint.status];

    const updateStatus = async (newStatus) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/complaints/${complaint._id}/status`,
                { status: newStatus }
            );

            window.location.reload();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    return (
        <div className="flex-1 bg-rgba(255, 255, 255, 0.64) rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold">
                        {complaint.serviceTitle}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Created: {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Tag color={complaint.urgency === "emergency" ? "red" : "blue"}>
                        {complaint.urgency}
                    </Tag>

                    <Tag color="processing">
                        {complaint.status}
                    </Tag>
                </div>
            </div>

            <Steps
                current={statusIndex}
                items={[
                    { title: "Pending" },
                    { title: "Seen" },
                    { title: "Scheduled" },
                    { title: "Completed" }
                ]}
            />


            <Divider />

            {role === "admin" && (<div className="flex gap-3 mb-6">
                <button
                    onClick={() => updateStatus("seen")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Mark as Seen
                </button>

                <button
                    onClick={() => updateStatus("scheduled")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Mark as Scheduled
                </button>

                <button
                    onClick={() => updateStatus("completed")}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Mark as Completed
                </button>
            </div>)}


            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="font-medium">{complaint.name}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="font-medium">{complaint.phone}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Preferred Date</p>
                    <p className="font-medium">
                        {complaint.preferredDate
                            ? new Date(complaint.preferredDate).toLocaleDateString()
                            : "Not specified"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">Preferred Time</p>
                    <p className="font-medium">
                        {complaint.preferredTime || "Not specified"}
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-medium">{complaint.address}</p>
            </div>

            <div>
                <p className="text-gray-500 text-sm mb-2">Description</p>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                    {complaint.description}
                </div>
            </div>

        </div>
    );
}

export default ComplaintOverview;