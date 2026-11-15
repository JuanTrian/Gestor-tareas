import { useState } from "react";
import TaskForm from "./TaskForm.jsx";

const STATUS = { pendiente: "Pendiente", en_progreso: "En progreso", completada: "Completada" };

function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const overdue = task.status !== "completada" && task.dueDate < new Date().toISOString().slice(0, 10);

  if (editing)
    return (
      <li className="card">
        <TaskForm initial={task} onCancel={() => setEditing(false)}
          onSave={(data) => { onUpdate({ ...task, ...data }); setEditing(false); }} />
      </li>
    );

  return (
    <li className={`card p-${task.priority}`}>
      <div className="card-head">
        <h3 className={task.status === "completada" ? "done" : ""}>{task.title}</h3>
        <span className={`badge ${task.priority}`}>{task.priority}</span>
      </div>
      {task.description && <p>{task.description}</p>}
      <p className={overdue ? "due overdue" : "due"}>Vence: {task.dueDate}{overdue && " (vencida)"}</p>
      <div className="actions">
        <select value={task.status} onChange={(e) => onUpdate({ ...task, status: e.target.value })} aria-label="Cambiar estado">
          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        {task.status !== "completada" && <button onClick={() => onUpdate({ ...task, status: "completada" })}>Completar</button>}
        <button onClick={() => setEditing(true)}>Editar</button>
        <button className="danger" onClick={() => window.confirm("¿Eliminar esta tarea?") && onDelete(task.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default function TaskColumn({ status, tasks, onUpdate, onDelete }) {
  return (
    <section className="column">
      <h2>{STATUS[status]} <span className="count">{tasks.length}</span></h2>
      <ul>
        {tasks.map((t) => <TaskCard key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />)}
        {tasks.length === 0 && <li className="empty">No hay tareas en este estado.</li>}
      </ul>
    </section>
  );
}
