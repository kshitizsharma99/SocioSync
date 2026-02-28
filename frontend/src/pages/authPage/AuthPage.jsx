import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    flatNo: "",
    buildingName: "",
    adminCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {

      // Resident Validation
      if (role === "resident") {
        if (
          !formData.fullName ||
          !formData.flatNo ||
          !formData.buildingName
        ) {
          alert("Please fill all resident details");
          return;
        }
      }

      // Admin Validation
      if (role === "admin") {
        if (!formData.fullName || !formData.adminCode) {
          alert("Please fill admin details");
          return;
        }
      }

      // Password Check
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    if (isLogin) navigate("/services");
    else navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE SECTION (UNCHANGED) */}
        <div className="hidden md:flex items-center justify-center bg-[#F5F7FA] p-10">

          <div className="text-center">

            <img
              src="/img/login-illustration.png"
              alt="Service Illustration"
              className="max-h-[60vh] w-auto object-contain mx-auto"
            />

            <h1 className="text-4xl font-serif font-semibold mt-8 text-gray-800">
              Get Connected
            </h1>

            <p className="text-gray-500 mt-4 max-w-sm mx-auto">
              Easily connect with trusted mechanics, plumbers,
              electricians and carpenters near you.
            </p>

          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="flex flex-col justify-center p-10 md:p-16">

          {role === null ? (

            <div className="flex flex-col items-center text-center space-y-6">

              <img
                src="/img/Icon-2.jpeg"
                alt="Icon"
                className="w-auto object-contain mx-auto"
              />

              <button
                onClick={() => setRole("resident")}
                className="w-60 bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                Continue as Resident
              </button>

              <button
                onClick={() => setRole("admin")}
                className="w-60 border py-3 rounded-xl font-medium hover:bg-gray-100 transition"
              >
                Continue as Admin
              </button>

            </div>

          ) : (

            <div>

              <button
                onClick={() => setRole(null)}
                className="mb-6 text-sm text-gray-500 hover:underline"
              >
                ← Back
              </button>

              <div className="mb-8 text-center md:text-left">

                <p className="text-sm text-gray-400 mb-2">
                  {role === "admin" ? "Admin Panel" : "Resident Portal"}
                </p>

                <h2 className="text-4xl font-serif font-semibold text-gray-900">
                  {isLogin
                    ? `Welcome Back ${role === "admin" ? "Admin" : ""}`
                    : `Create ${role === "admin" ? "Admin" : "Resident"} Account`}
                </h2>

                <p className="text-gray-500 mt-2">
                  {isLogin
                    ? "Enter your email and password to access your account"
                    : "Fill the details below to create your account"}
                </p>

              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* SIGNUP EXTRA FIELDS */}
                {!isLogin && (
                  <>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      onChange={handleChange}
                      className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    {role === "resident" && (
                      <>
                        <input
                          type="text"
                          name="flatNo"
                          placeholder="House / Flat No."
                          onChange={handleChange}
                          className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                          type="text"
                          name="buildingName"
                          placeholder="Building Name"
                          onChange={handleChange}
                          className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </>
                    )}

                    {role === "admin" && (
                      <input
                        type="text"
                        name="adminCode"
                        placeholder="Admin Code"
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    )}
                  </>
                )}

                {/* EMAIL */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* PASSWORD */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* CONFIRM PASSWORD */}
                {!isLogin && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                )}

                {isLogin && (
                  <div className="flex justify-between text-sm text-gray-500">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <button type="button" className="hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </button>

              </form>

              <p className="text-center mt-8 text-gray-500">

                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-semibold ml-2 text-black hover:underline"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>

              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AuthPage;