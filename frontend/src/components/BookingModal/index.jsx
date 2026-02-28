import { Modal, Form, Input, DatePicker, TimePicker, Radio, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UserOutlined, PhoneOutlined, CameraOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useState } from "react";
import { uploadRef } from "react";

function BookingModal({ open, service, onClose }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));

            const response = await fetch("http://localhost:5000/api/complaints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: user.id,
                    serviceTitle: service?.title,
                    name: values.name,
                    phone: values.phone,
                    address: values.address,
                    description: values.description,
                    preferredDate: values.date,
                    preferredTime: values.time,
                    urgency: values.urgency
                })
            });

            const data = await response.json();

            if (response.ok) {
                message.success("Complaint submitted successfully!");
                form.resetFields();
                onClose();
            } else {
                message.error(data.message);
            }

            setLoading(false);

        } catch (error) {
            console.log("Validation failed");
            setLoading(false);
        }
    };

    return (
        <Modal
            classNames={{
                content: "rounded-5xl mx-4 sm:mx-0",
                header: "rounded-t-2xl px-6 pt-6 pb-2 text-lg font-semibold",
                body: "px-6 pb-6 pt-2"
            }}
            open={open}
            onCancel={onClose}
            footer={null}
            title={`Book Service: ${service?.title || ""}`}
            centered
            width="100%"
            style={{ maxWidth: 600 }}
            styles={{
                mask: {
                    backdropFilter: "blur(8px)"

                },
                content: { borderRadius: "80px" }
            }}
        >
            <Form
                form={form}
                layout="vertical"
                className="space-y-3"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: "Please enter your name" }]}
                        className="mb-0"
                    >
                        <Input
                            placeholder="Your Name"
                            prefix={<UserOutlined className="!text-gray-500 text-sm" />}
                            className="!rounded-full !h-11 px-4 placeholder:!text-gray-500 !border-gray-500"
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: "Please enter contact number" }]}
                        className="mb-0"
                    >
                        <Input
                            placeholder="Contact Number"
                            prefix={<PhoneOutlined className="!text-gray-500 text-sm" />}
                            className="!rounded-full !h-11 px-4  placeholder:!text-gray-500 !border-gray-500"
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="address"
                    rules={[{ required: true, message: "Please enter address" }]}
                    className="mb-0"
                >
                    <Input
                        placeholder="Address"
                        prefix={<EnvironmentOutlined className="!text-gray-500 text-sm" />}
                        className="!rounded-full !h-11 px-4 !border-gray-500"
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[{ required: true, message: "Describe your problem" }]}
                >
                    <Input.TextArea rows={5}
                        placeholder="Problem Description"
                        className="!rounded-2xl !border-gray-500"
                    />
                </Form.Item>

                <div className="grid grid-cols-2 gap-3">
                    <Form.Item name="date">
                        <DatePicker className="w-full !border-gray-500" />
                    </Form.Item>

                    <Form.Item name="time">
                        <TimePicker className="w-full !border-gray-500" />
                    </Form.Item>
                </div>

                <h1 className="font-bold">Urgency</h1>

                <Form.Item name="urgency" initialValue="normal">
                    <Radio.Group>
                        <Radio value="normal">Normal</Radio>
                        <Radio value="emergency">Emergency</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                >
                    <Upload
                        ref={uploadRef}
                        beforeUpload={() => false}
                        showUploadList={false}
                        className="!w-full"
                    >
                        <Input
                            readOnly
                            placeholder="Upload Photo (Optional)"
                            onClick={() => uploadRef.current?.upload?.fileInput?.click()}
                            suffix={
                                <CameraOutlined className="text-gray-500 cursor-pointer" />
                            }
                            className="
                            !rounded-full 
                            !h-11 
                            !border-gray-400 
                            placeholder:!text-gray-600
                            focus:!border-blue-500 
                            focus:!shadow-none
                            !cursor-pointer
                            !w-full
                        "
                        />
                    </Upload>
                </Form.Item>

                <div className="flex justify-between items-center pt-2">
                    <Button type="primary" loading={loading} onClick={handleSubmit}>
                        Submit Request
                    </Button>

                    <Button type="link" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}

export default BookingModal;