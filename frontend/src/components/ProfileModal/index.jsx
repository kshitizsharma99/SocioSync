import React, { useState, useEffect } from "react";
import { Modal, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function ProfileModal({ open, onClose }) {
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setPreview(storedUser.photo || "");
        }
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const [file, setFile] = useState(null);

    const handleUpload = (file) => {
        setPreview(URL.createObjectURL(file));
        setFile(file);
        return false;
    };


    const handleSave = async () => {
        try {
            const formData = new FormData();

            formData.append("fullName", user.fullName);
            formData.append("contact", user.contact);
            formData.append("flatNo", user.flatNo);
            formData.append("description", user.description);

            if (file) {
                formData.append("photo", file);
            }

            const token = localStorage.getItem("token");

            const res = await fetch(
                `https://sociosync-backend-6dqc.onrender.com/api/auth/update-profile/${user._id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await res.json();

            console.log("UPDATE RESPONSE:", data);

            localStorage.setItem("user", JSON.stringify(data));

            message.success("Profile updated!");
            onClose();
            window.location.reload();

        } catch (error) {
            message.error("Update failed");
        }
    };

    return (
        <Modal
            title="Edit Profile"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <div className="flex flex-col gap-4">

                <div className="flex flex-col items-center gap-2">
                    <img
                        src={
                            preview ||
                            (user.photo
                                ? `https://sociosync-backend-6dqc.onrender.com/uploads/${user.photo}`
                                : "https://picsum.photos/100")
                        }
                        alt="profile"
                    />

                    <Upload beforeUpload={handleUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Change Photo</Button>
                    </Upload>
                </div>


                <Input
                    placeholder="Full Name"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                />


                <Input
                    placeholder="Contact Number"
                    name="contact"
                    value={user.contact}
                    onChange={handleChange}
                />

                <Input
                    placeholder="Flat / Room No"
                    name="flatNo"
                    value={user.flatNo}
                    onChange={handleChange}
                />


                <TextArea
                    placeholder="About / Description"
                    name="description"
                    value={user.description}
                    onChange={handleChange}
                    rows={3}
                />


                <Button type="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </div>
        </Modal>
    );
}