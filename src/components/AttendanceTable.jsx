import { CheckCircle2, XCircle, Moon, StickyNote } from "lucide-react";

const STATUS_OPTIONS = [
  { key: "present", label: "Present", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { key: "absent", label: "Absent", icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
  { key: "leave", label: "Leave", icon: Moon, color: "text-amber-600", bg: "bg-amber-50" },
];

export default function AttendanceTable({ workers, attendance, onUpdate }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Role</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {workers.map((w) => {
              const row = attendance[w.id] || { status: "absent", note: "" };
              return (
                <tr key={w.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{w.name}</div>
                    <div className="text-xs text-gray-500">ID: {w.id}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{w.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map(({ key, label, icon: Icon, color, bg }) => {
                        const active = row.status === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => onUpdate(w.id, { ...row, status: key })}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-sm transition ${
                              active ? `${bg} ${color} border-current` : "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StickyNote className="h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={row.note}
                        onChange={(e) => onUpdate(w.id, { ...row, note: e.target.value })}
                        placeholder="Optional note (overtime, shift, etc.)"
                        className="w-full md:w-80 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
