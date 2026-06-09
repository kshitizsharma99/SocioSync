import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function AuthPage({ setUser }) {
  const [staffRole, setStaffRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {

      if (role === "resident") {
        if (!formData.fullName || !formData.flatNo || !formData.buildingName) {
          message.error("Please fill all resident details");
          return;
        }
      }

      if (staffRole === "admin") {
        if (!formData.fullName || !formData.adminCode) {
          message.error("Please fill admin details");
          return;
        }
      }
      if (staffRole === "mechanic") {
        if (!formData.fullName) {
          message.error("Please fill mechanic details");
          return;
        }
      }

      if (formData.password !== formData.confirmPassword) {
        message.error("Passwords do not match");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: role === "staff" ? staffRole : role,
            houseNo: formData.flatNo,
            buildingName: formData.buildingName,
            adminCode: formData.adminCode
          })
        });

        const data = await response.json();

        if (response.ok) {
          message.success("Signup successful. Please login.");
          setIsLogin(true);
        } else {
          message.error(data.message);
        }

      } catch (error) {
        message.error("Server error");
      }

    } else {


      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            rememberMe,
            roleGroup: role === "resident" ? "resident" : "staff"
          })
        });

        const data = await response.json();

        if (!response.ok) {
          message.error(data.message);
          return;
        }


        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);

          if (data.user.role === "admin") {
            navigate("/services");
          } else {
            navigate("/services");
          }

        } else {
          alert(data.message);
        }

      } catch (error) {
        message.error(error.message);
      }
    }
  };

  return (
    <div className=" flex items-center justify-center bg-transparent px-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden">


        <div className="hidden md:flex items-center justify-center bg-[#F5F7FA] p-10">

          <div className="text-center">

            <img
              src="/img/login-illustration.png"
              alt="Service Illustration"
              className="max-h-[50vh] w-auto object-contain mx-auto"
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

        <div className="flex flex-col justify-center p-10">

          {role === null ? (

            <div className="flex flex-col items-center text-center space-y-6">

              <img
                src="/img/Icon-2.jpeg"
                alt="Icon"
                className="w-auto max-h-[50vh] object-contain mx-auto"
              />

              <button
                onClick={() => setRole("resident")}
                className="w-60 bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                Continue as Resident
              </button>

              <button
                onClick={() => setRole("staff")}
                className="w-60 border py-3 rounded-xl font-medium hover:bg-gray-100 transition"
              >
                Continue as Staff
              </button>

            </div>

          ) : (

            <div>

              <button
                onClick={() => {
                  setRole(null);
                  setStaffRole(null);
                }}
                className="mb-6 text-sm text-gray-500 hover:underline"
              >
                ← Back
              </button>

              <div className="mb-8 text-center md:text-left">

                <p className="text-sm text-gray-400 mb-2">
                  {role === "resident" ? "Resident Portal" : "Staff Portal"}
                </p>

                <h2 className="text-4xl font-serif font-semibold text-gray-900">
                  {isLogin
                    ? `Welcome Back ${role === "resident" ? "Resident" : "Staff"}`
                    : `Create ${role === "resident" ? "Resident" : "Staff"} Account`}
                </h2>

                <p className="text-gray-500 mt-2">
                  {isLogin
                    ? "Enter your email and password to access your account"
                    : "Fill the details below to create your account"}
                </p>

              </div>

              {role === "staff" && !isLogin && staffRole === null && (
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <button
                    onClick={() => setStaffRole("admin")}
                    className="w-full border py-3 rounded-xl hover:bg-gray-100"
                  >
                    Sign up as Admin
                  </button>

                  <button
                    onClick={() => setStaffRole("mechanic")}
                    className="w-full border py-3 rounded-xl hover:bg-gray-100"
                  >
                    Sign up as Mechanic
                  </button>
                </div>
              )}
              {!(role === "staff" && !isLogin && staffRole === null) && (
                <form onSubmit={handleSubmit} className="space-y-5">

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

                      {staffRole === "admin" && (
                        <input
                          type="text"
                          name="adminCode"
                          placeholder="Admin Code"
                          onChange={handleChange}
                          className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      )}

                      {staffRole === "mechanic" && (
                        <input
                          type="text"
                          name="adminCode"
                          placeholder="Mechanic Code"
                          onChange={handleChange}
                          className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      )}
                    </>
                  )}

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />

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
                        <input
                          type="checkbox"
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
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
              )}

              <p className="text-center mt-8 text-gray-500">

                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setStaffRole(null);
                  }}
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