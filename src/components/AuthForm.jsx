import { useState } from "react";
import { login, register } from "../storage.js";

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const user = mode === "login" ? await login(f.email, f.password) : await register(f.name, f.email, f.password);
      onAuth(user);
    } catch (err) { setError(err.message); }
  }

  return (
    <main className="auth">
      <h1>Gestor de tareas</h1>
      <p className="muted">{mode === "login" ? "Inicia sesión para ver tus tareas." : "Crea tu cuenta para empezar."}</p>
      <form onSubmit={submit}>
        {mode === "register" && (
          <label>Nombre<input name="name" value={f.name} onChange={change} required /></label>
        )}
        <label>Correo<input name="email" type="email" value={f.email} onChange={change} required /></label>
        <label>Contraseña<input name="password" type="password" minLength={6} value={f.password} onChange={change} required /></label>
        {error && <p role="alert" className="error">{error}</p>}
        <button className="primary">{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</button>
      </form>
      <button className="link" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
        {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </main>
  );
}
