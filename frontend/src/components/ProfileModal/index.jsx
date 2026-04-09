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

    // Handle input changes
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle image upload (base64 preview)
    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            setUser({ ...user, photo: reader.result });
        };
        reader.readAsDataURL(file);
        return false; // prevent auto upload
    };

    // Save profile
    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        message.success("Profile updated!");
        onClose();
        window.location.reload(); // refresh UI
    };

    return (
        <Modal
            title="Edit Profile"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <div className="flex flex-col gap-4">

                {/* Profile Image */}
                <div className="flex flex-col items-center gap-2">
                    <img
                        src={preview || "https://via.placeholder.com/100"}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover border"
                    />

                    <Upload beforeUpload={handleUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Change Photo</Button>
                    </Upload>
                </div>

                {/* Name */}
                <Input
                    placeholder="Full Name"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                />

                {/* Contact */}
                <Input
                    placeholder="Contact Number"
                    name="contact"
                    value={user.contact}
                    onChange={handleChange}
                />

                {/* Flat No */}
                <Input
                    placeholder="Flat / Room No"
                    name="flatNo"
                    value={user.flatNo}
                    onChange={handleChange}
                />

                {/* Description */}
                <TextArea
                    placeholder="About / Description"
                    name="description"
                    value={user.description}
                    onChange={handleChange}
                    rows={3}
                />

                {/* Save Button */}
                <Button type="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </div>
        </Modal>
    );
}