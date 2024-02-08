"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const r = useRouter();

  useEffect(() => {
    verifyLogin();
  }, []);

  /*const getUsers = async (token) => {
    const res = await fetch("/api/user", { headers: { "authorization": token } });
    const users = await res.json();
  };*/
  const verifyLogin = () => {
    const token = localStorage.getItem("authorization");
    if (token) r.push("/sys/censadores");
  };
  const verifyCredentials = () => {
    if (email === "" || password === "") {
      toast("Campos vacios", { type: "error" });
      return true;
    }
    return false;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const isIncorrect = verifyCredentials();
    if (isIncorrect) return;
    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ password, email }),
    });
    const { user, token, error } = await res.json();
    if (error) return toast(error, { type: "error" });
    if (user.rol !== "Admin")
      return toast("No tienes permisos para acceder", { type: "error" });
    localStorage.setItem("authorization", token);
    r.push("/sys/censadores");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="card w-96 space-y-3 bg-base-100 shadow-xl p-5"
    >
      <h2 className="card-title">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary text-white">
        Enter
      </button>
    </form>
  );
}
