import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.name, form.password);
      navigate("/");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-emerald-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 shadow-md p-6 rounded-xl w-full max-w-sm border border-sky-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-sky-700 mb-6 tracking-wide">
          Iniciar Sesión
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-2">{error}</p>
        )}

        <label className="block font-medium text-slate-700 mb-1">
          Usuario
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg bg-sky-50 mb-3 outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="Ingresa tu usuario"
        />

        <label className="block font-medium text-slate-700 mb-1">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg bg-sky-50 mb-5 outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="Ingresa tu contraseña"
        />

        <button className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg shadow-sm font-semibold transition">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
