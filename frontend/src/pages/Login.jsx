import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user } = res.data;


      // Store token and employee information in localStorage

      localStorage.setItem("token", token);
      localStorage.setItem("employee", JSON.stringify(user));

      // console.log("Login successful:", res.data);

      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className=" min-h-[80vh] flex item-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-white rounded-lg text-sm shadow-lg">
        <p className="text-2xl font-semibold">Login</p>
        <p>Please Login</p>

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          className="bg-blue-500 text-white w-full py-2 rounded-md text-base "
          type="submit"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}

        <p>
          {/* Forgot Password?{" "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            click here
          </span> */}
        </p>
      </div>
    </form>
  );
}

export default Login;
