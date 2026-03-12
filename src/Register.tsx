import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resp = await api.post("/register", {
        name,
        email,
        password,
      });

      if (resp.status === 200 || resp.status === 201) {
        alert("Registration successful");
        navigate("/login");
      }
    } catch (err: any) {
      console.log("Register error:", err);

      if (err.response) {
        alert(err.response.data.message || "Registration failed");
      } else {
        alert("Server error. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-green-600 font-medium cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;