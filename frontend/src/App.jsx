import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import AuthPage from "./pages/authPage/AuthPage";
import ServicePage from "./pages/servicePage/ServicePage";
import Layout from "./components/layout/Layout";
import AdminPage from "./pages/AdminPage";
import MechanicDashboard from "./pages/mechanicDashboard";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  return (
    <BrowserRouter>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          {user ? (
            user.role === "admin" ? (
              <Route path="/services" element={<AdminPage />} />
            ) : user.role === "mechanic" ? (
              <Route path="/services" element={<MechanicDashboard />} />
            ) : (
              <Route path="/services" element={<ServicePage />} />
            )
          ) : (
            <Route path="/services" element={<ServicePage />} />
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;