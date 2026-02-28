import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import AuthPage from "./pages/authPage/AuthPage";
import ServicePage from "./pages/servicePage/servicePage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/services" element={<ServicePage />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;