import { useEffect, useMemo, useState } from "react";
import AuthForm from "./components/AuthForm.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Filters from "./components/Filters.jsx";
import TaskColumn from "./components/TaskColumn.jsx";
import { currentUser, logout, loadTasks, saveTasks } from "./storage.js";

export default function App() {
  const [user, setUser] = useState(currentUser());
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ q: "", status: "", priority: "" });

  useEffect(() => { if (user) setTasks(loadTasks(user.email)); }, [user]);
  const persist = (next) => { setTasks(next); saveTasks(user.email, next); };

  const addTask = (data) => persist([{ ...data, id: crypto.randomUUID(), status: "pendiente" }, ...tasks]);
  const updateTask = (t) => persist(tasks.map((x) => (x.id === t.id ? t : x)));
  const deleteTask = (id) => persist(tasks.filter((x) => x.id !== id));

  const visible = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return tasks.filter((t) =>
      (!q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) &&
      (!filters.status || t.status === filters.status) &&
      (!filters.priority || t.priority === filters.priority));
  }, [tasks, filters]);

  if (!user) return <AuthForm onAuth={setUser} />;

  return (
    <div className="app">
      <header>
        <h1>Tareas de {user.name}</h1>
        <button onClick={() => { logout(); setUser(null); setTasks([]); }}>Cerrar sesión</button>
      </header>
      <details className="new" open>
        <summary>Nueva tarea</summary>
        <TaskForm onSave={addTask} />
      </details>
      <Filters filters={filters} onChange={setFilters} />
      <div className="board">
        {["pendiente", "en_progreso", "completada"].map((s) => (
          <TaskColumn key={s} status={s} tasks={visible.filter((t) => t.status === s)} onUpdate={updateTask} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}
