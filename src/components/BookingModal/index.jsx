import { Modal, Form, Input, DatePicker, TimePicker, Radio, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

function BookingModal({ open, service, onClose }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            setLoading(true);

            setTimeout(() => {
                console.log("Form Data:", values);
                message.success("Service booked successfully!");
                setLoading(false);
                form.resetFields();
                onClose();
            }, 1500);

        } catch (error) {
            console.log("Validation failed");
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
                <div className="grid grid-cols-2 gap-3">
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: "Please enter your name" }]}
                    >
                        <Input placeholder="Your Name" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: "Please enter contact number" }]}
                    >
                        <Input placeholder="Contact Number" />
                    </Form.Item>
                </div>

                <Form.Item
                    name="address"
                    rules={[{ required: true, message: "Please enter address" }]}
                >
                    <Input placeholder="Address" />
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[{ required: true, message: "Describe your problem" }]}
                >
                    <Input.TextArea rows={3} placeholder="Problem Description" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-3">
                    <Form.Item name="date">
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item name="time">
                        <TimePicker className="w-full" />
                    </Form.Item>
                </div>

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
                    <Upload beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>
                            Upload Photo (Optional)
                        </Button>
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