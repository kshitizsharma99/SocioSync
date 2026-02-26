
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Layout({ children }) {
    return (
        <div className="min-h-screen w-full flex flex-col overflow-x-hidden">

            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default Layout;