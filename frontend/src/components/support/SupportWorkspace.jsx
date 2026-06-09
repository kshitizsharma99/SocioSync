import { useState, useEffect } from "react";
import axios from "axios";
import ComplaintSidebar from "./ComplaintSidebar";
import ComplaintOverview from "./ComplaintOverview";

function SupportWorkspace() {

    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const role = storedUser?.role;

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:5000/api/complaints", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setComplaints(res.data);

            if (res.data.length > 0) {
                setSelectedComplaint(res.data[0]);
            }

        } catch (err) {
            console.error("Error fetching complaints:", err);
        } finally {
            setLoading(false);
        }
    };;

    const filteredComplaints = complaints.filter((complaint) => {

        const statusMatch =
            !statusFilter ||
            complaint.status === statusFilter;

        const dateMatch =
            !dateFilter ||
            new Date(complaint.createdAt).toDateString() ===
            dateFilter.toDate().toDateString();

        return statusMatch && dateMatch;
    });

    useEffect(() => {
        if (filteredComplaints.length === 0) {
            setSelectedComplaint(null);
            return;
        }

        if (
            !filteredComplaints.some(
                c => c._id === selectedComplaint?._id
            )
        ) {
            setSelectedComplaint(filteredComplaints[0]);
        }
    }, [filteredComplaints, selectedComplaint]);

    if (loading) {
        return (
            <div className="h-[75vh] flex items-center justify-center">
                Loading complaints...
            </div>
        );
    }

    const statusSummary = {
        total: complaints.length,
        inProgress: complaints.filter(c => c.status === "in-progress").length,
        assigned: complaints.filter(c => c.status === "assigned").length,
        completed: complaints.filter(c => c.status === "completed").length
    };
    const ratedComplaints = complaints.filter(
        complaint => complaint.rating
    );

    const totalReviews = ratedComplaints.length;

    const averageRating =
        totalReviews > 0
            ? ratedComplaints.reduce(
                (sum, complaint) => sum + complaint.rating,
                0
            ) / totalReviews
            : 0;

    return (
        <div className="h-[75vh] overflow-y-auto custom-scrollbar p-2">
            <div className="flex flex-col lg:flex-row gap-6 h-full">

                <ComplaintSidebar
                    complaints={filteredComplaints}
                    selectedComplaint={selectedComplaint}
                    setSelectedComplaint={setSelectedComplaint}
                    role={role}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                />

                <ComplaintOverview
                    complaint={selectedComplaint}
                    role={role}
                    statusSummary={statusSummary}
                    averageRating={averageRating}
                    totalReviews={totalReviews}
                />

            </div>
        </div>
    );
}

export default SupportWorkspace;