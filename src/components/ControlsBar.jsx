import { Calendar, Building2 } from "lucide-react";

export default function ControlsBar({
  projects,
  selectedProjectId,
  onSelectProject,
  date,
  onChangeDate,
}) {
  return (
    <div className="w-full bg-white rounded-xl border p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-blue-50 text-blue-600"><Building2 className="h-5 w-5" /></div>
        <div className="flex items-center gap-2">
          <label htmlFor="project" className="text-sm text-gray-600">Project</label>
          <select
            id="project"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedProjectId}
            onChange={(e) => onSelectProject(e.target.value)}
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-emerald-50 text-emerald-600"><Calendar className="h-5 w-5" /></div>
        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
        />
      </div>
    </div>
  );
}
