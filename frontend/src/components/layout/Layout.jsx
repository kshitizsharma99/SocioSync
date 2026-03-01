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
                mask={{ enabled: true, blur: true }}
                styles={{
                    root: {
                        padding: "16px"
                    },
                    container: {
                        background: "rgb(255, 255, 255)",
                        backdropFilter: "blur(0px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "32px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.25)"
                    },
                    body: {
                        background: "transparent",
                        padding: "16px"
                    },
                    header: {
                        background: "transparent"
                    }
                }}
            >
                <SupportWorkspace />

            </Modal>

        </div>
    );
}

export default Layout;