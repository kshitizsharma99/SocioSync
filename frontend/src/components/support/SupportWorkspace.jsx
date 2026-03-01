import { useState, useEffect } from "react";
import axios from "axios";
import ComplaintSidebar from "./ComplaintSidebar";
import ComplaintOverview from "./ComplaintOverview";

function SupportWorkspace() {

    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [loading, setLoading] = useState(true);


    const storedUser = JSON.parse(localStorage.getItem("user"));
    const role = storedUser?.role;

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/complaints", {
                withCredentials: true
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
    };

    if (loading) {
        return (
            <div className="h-[75vh] flex items-center justify-center">
                Loading complaints...
            </div>
        );
    }

    return (
        <div className="h-[75vh] overflow-y-auto custom-scrollbar p-2">
            <div className="flex flex-col lg:flex-row gap-6">

                <ComplaintSidebar
                    complaints={complaints}
                    selectedComplaint={selectedComplaint}
                    setSelectedComplaint={setSelectedComplaint}
                    role={role}
                />

                <ComplaintOverview
                    complaint={selectedComplaint}
                    role={role}
                />

            </div>
        </div>
    );
}

export default SupportWorkspace;