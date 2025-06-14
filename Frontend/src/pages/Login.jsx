import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setVendor } = useContext(AppContext);

  const [authEntity, setAuthEntity] = useState("user"); // "user" or "vendor"
  const [authAction, setAuthAction] = useState("login"); // "login" or "register"

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");

    const payload = { email, password };
    if (authAction === "register" && authEntity === "user") {
      payload.name = name;
      payload.mobile = mobile;
    }

    try {
      const baseURL = import.meta.env.VITE_BASE_URL;

      // 🔁 Frontend-only: ensure other session is logged out before proceeding
      if (authEntity === "user") {
        await axios
          .post(`${baseURL}/vendors/logout`, {}, { withCredentials: true })
          .catch(() => {});
      } else {
        await axios
          .post(`${baseURL}/users/logout`, {}, { withCredentials: true })
          .catch(() => {});
      }

      const url = `${baseURL}/${authEntity}s/${authAction}`;
      const response = await axios.post(url, payload, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        const { user, vendor } = response.data;

        if (authEntity === "user") {
          setUser(user);
          setVendor(null); // ensure vendor state is cleared
          navigate(authAction === "login" ? "/" : "/login");
        } else {
          setVendor(vendor);
          setUser(null); // ensure user state is cleared
          navigate("/vendor/dashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md"
      >
        <div className="flex justify-center gap-4 mb-4">
          {["user", "vendor"].map((ent) => (
            <button
              key={ent}
              type="button"
              onClick={() => {
                setAuthEntity(ent);
                if (ent === "vendor") setAuthAction("login");
              }}
              className={`px-4 py-1 rounded-full ${
                authEntity === ent
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300"
              }`}
            >
              {ent.charAt(0).toUpperCase() + ent.slice(1)}
            </button>
          ))}
        </div>

        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {authAction === "login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm mb-4 text-center">
          {authAction === "login"
            ? "Welcome back! Please sign in to continue"
            : "Create your account"}
        </p>

        {authAction === "register" && authEntity === "user" && (
          <>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <User size={20} className="text-slate-500" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="outline-none text-sm w-full"
                required
              />
            </div>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <User size={20} className="text-slate-500" />
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="tel"
                placeholder="Mobile Number"
                className="outline-none text-sm w-full"
                required
              />
            </div>
          </>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mb-4">
          <Mail size={20} className="text-slate-500" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="outline-none text-sm w-full"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mb-4">
          <Lock size={20} className="text-slate-500" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="outline-none text-sm w-full"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mb-4"
        >
          {authAction === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm">
          {authAction === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className={`text-blue-500 cursor-pointer ${
              authEntity === "vendor" ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={() => {
              if (authEntity === "vendor") return;
              setAuthAction(authAction === "login" ? "register" : "login");
            }}
          >
            {authAction === "login" ? "Sign Up" : "Login"}
          </span>
        </p>

        <X
          onClick={() => navigate("/")}
          size={20}
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
