import { useState } from "react";
import { Modal } from "antd";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import SupportWorkspace from "../support/SupportWorkspace";

function Layout({ children }) {
    const [supportOpen, setSupportOpen] = useState(false);

    return (
        <div className="min-h-screen w-full flex flex-col overflow-x-hidden">

            <Navbar onOpenSupport={() => setSupportOpen(true)} />

            <main className="flex-1">
                {children}
            </main>

            <Footer />

            <Modal
                open={supportOpen}
                onCancel={() => setSupportOpen(false)}
                footer={null}
                centered
                width="95%"
                style={{ maxWidth: 1300 }}
                maskStyle={{ backdropFilter: "blur(8px)" }}
                classNames={{
                    content: "rounded-3xl overflow-hidden",
                    body: "p-8 bg-transparent",
                }}
            >
                <SupportWorkspace />
            </Modal>

        </div>
    );
}

export default Layout;