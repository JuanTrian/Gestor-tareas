import { useState } from "react";

const empty = { title: "", description: "", dueDate: "", priority: "media" };

export default function TaskForm({ initial, onSave, onCancel }) {
  const [t, setT] = useState(initial ?? empty);
  const change = (e) => setT({ ...t, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); onSave(t); if (!initial) setT(empty); };

  return (
    <form className="task-form" onSubmit={submit}>
      <label>Título<input name="title" value={t.title} onChange={change} required maxLength={80} /></label>
      <label>Descripción<textarea name="description" rows={2} value={t.description} onChange={change} /></label>
      <div className="row">
        <label>Vence<input name="dueDate" type="date" value={t.dueDate} onChange={change} required /></label>
        <label>Prioridad
          <select name="priority" value={t.priority} onChange={change}>
            <option value="alta">Alta</option><option value="media">Media</option><option value="baja">Baja</option>
          </select>
        </label>
      </div>
      <div className="row end">
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
        <button className="primary">{initial ? "Guardar cambios" : "Agregar tarea"}</button>
      </div>
    </form>
  );
}
