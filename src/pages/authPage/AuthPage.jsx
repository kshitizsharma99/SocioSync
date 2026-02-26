import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      navigate("/services");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

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


        <div className="flex flex-col justify-center p-10 md:p-16">

          {role === null ? (
            <div className="flex flex-col items-center sm:w-auto justify-center text-center space-y-6">

              <img
                src="/img/Icon-2.jpeg"
                alt="Service Illustration"
                className=" w-auto object-contain mx-auto"
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


                {!isLogin && role === "resident" && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                )}


                {!isLogin && role === "admin" && (
                  <input
                    type="text"
                    placeholder="Admin Code"
                    className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-5 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />


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


              {role === "resident" && (
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
              )}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default AuthPage;