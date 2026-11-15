// Persistencia simulada en localStorage (sin backend). Ver README.
const get = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));

async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function register(name, email, password) {
  const users = get("tf_users", []);
  email = email.trim().toLowerCase();
  if (users.some((u) => u.email === email)) throw new Error("Ese correo ya está registrado.");
  users.push({ name: name.trim(), email, pass: await hash(password) });
  set("tf_users", users);
  return login(email, password);
}

export async function login(email, password) {
  email = email.trim().toLowerCase();
  const u = get("tf_users", []).find((x) => x.email === email);
  if (!u || u.pass !== (await hash(password))) throw new Error("Correo o contraseña incorrectos.");
  const session = { name: u.name, email: u.email };
  set("tf_session", session);
  return session;
}

export const currentUser = () => get("tf_session", null);
export const logout = () => localStorage.removeItem("tf_session");
export const loadTasks = (email) => get("tf_tasks_" + email, []);
export const saveTasks = (email, tasks) => set("tf_tasks_" + email, tasks);
