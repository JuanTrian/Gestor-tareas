export default function Filters({ filters, onChange }) {
  const set = (e) => onChange({ ...filters, [e.target.name]: e.target.value });
  return (
    <div className="filters">
      <input name="q" type="search" placeholder="Buscar por título o descripción" value={filters.q} onChange={set} aria-label="Buscar tareas" />
      <select name="status" value={filters.status} onChange={set} aria-label="Filtrar por estado">
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="en_progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
      <select name="priority" value={filters.priority} onChange={set} aria-label="Filtrar por prioridad">
        <option value="">Todas las prioridades</option>
        <option value="alta">Alta</option><option value="media">Media</option><option value="baja">Baja</option>
      </select>
    </div>
  );
}
