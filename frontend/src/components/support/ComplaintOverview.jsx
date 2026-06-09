import {
    Tag,
    Steps,
    Divider,
    Rate,
    Input,
    Button,
    message
} from "antd";
import axios from "axios";
import { useState } from "react";



function ComplaintOverview({ complaint, role, statusSummary, averageRating, totalReviews }) {
    if (!complaint) {
        return <div className="flex-1">Select a complaint</div>;
    }

    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");

    const statusIndex = {
        pending: 0,
        assigned: 1,
        "in-progress": 2,
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

    const submitRating = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/complaints/${complaint._id}/rate`,
                {
                    rating,
                    review
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            message.success("Rating submitted successfully!");

            window.location.reload();

        } catch (error) {
            console.error(error);
            message.error("Failed to submit rating");
        }
    };

    console.log("Complaint data:", complaint);

    return (
        <div className="flex-1 bg-rgba(255, 255, 255, 0.64) rounded-2xl border border-gray-100 shadow-sm p-6 overflow-y-auto hide-scrollbar">

            {role === "mechanic" && (
                <>
                    <h2 className="text-xl font-semibold mb-4">
                        Dashboard Overview
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                        <div className="bg-white rounded-xl p-4 border">
                            <p className="text-gray-500 text-sm">Total</p>
                            <p className="text-2xl font-semibold">
                                {statusSummary.total}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border">
                            <p className="text-gray-500 text-sm">Assigned</p>
                            <p className="text-2xl font-semibold text-blue-600">
                                {statusSummary.assigned}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border">
                            <p className="text-gray-500 text-sm">In Progress</p>
                            <p className="text-2xl font-semibold text-yellow-600">
                                {statusSummary.inProgress}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border">
                            <p className="text-gray-500 text-sm">Completed</p>
                            <p className="text-2xl font-semibold text-green-600">
                                {statusSummary.completed}
                            </p>
                        </div>

                    </div>

                    <div className="bg-white rounded-xl p-4 border mb-6">
                        <p className="text-gray-500 text-sm">
                            Average Rating
                        </p>

                        <Rate
                            disabled
                            allowHalf
                            value={averageRating}
                        />

                        <p className="text-lg font-semibold mt-2">
                            {averageRating.toFixed(1)} / 5
                        </p>

                        <p className="text-gray-500 text-sm">
                            Based on {totalReviews} reviews
                        </p>
                    </div>

                    <Divider />
                </>
            )}

            <h2 className="text-xl font-semibold mb-4">
                Complaint Details
            </h2>
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
                    { title: "Assigned" },
                    { title: "In Progress" },
                    { title: "Completed" }
                ]}
            />


            <Divider />


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

            {complaint.status === "completed" && (
                <>

                    {/* Resident can rate */}
                    {role === "resident" && !complaint.rating && (


                        <div className="space-y-2 mt-1">

                            <h3 className="font-semibold text-lg">
                                Rate Service
                            </h3>

                            <Rate
                                value={rating}
                                onChange={setRating}
                            />

                            <div className="my-2">
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Write your feedback..."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                            </div>

                            <Button
                                type="primary"
                                onClick={submitRating}
                            >
                                Submit Review
                            </Button>
                        </div>
                    )}

                    {/* Show submitted review */}
                    {complaint.rating && (

                        <div className="space-y-3 mt-2">
                            <h3 className="font-semibold text-lg mb-1">
                                Customer Feedback
                            </h3>

                            <Rate
                                disabled
                                value={complaint.rating}
                            />

                            <div className="bg-gray-50 rounded-lg p-4 mt-2 max-h-40 overflow-y-auto">
                                {complaint.review || "No comments"}
                            </div>
                        </div>
                    )}
                </>
            )}

        </div>
    );
}

export default ComplaintOverview;