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

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            setUser({ ...user, photo: reader.result });
        };
        reader.readAsDataURL(file);
        return false;
    };


    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        message.success("Profile updated!");
        onClose();
        window.location.reload();
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
                        src={preview || "https://via.placeholder.com/100"}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover border"
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