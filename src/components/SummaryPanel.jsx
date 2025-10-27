import { Users, CheckCircle2, XCircle, Moon, Download } from "lucide-react";

export default function SummaryPanel({ workers, attendance, date, projectName, onExport }) {
  const totals = workers.reduce(
    (acc, w) => {
      const st = attendance[w.id]?.status || "absent";
      acc.total += 1;
      acc[st] += 1;
      return acc;
    },
    { total: 0, present: 0, absent: 0, leave: 0 }
  );

  return (
    <div className="bg-white border rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">Crew Summary</span>
        </div>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Total" value={totals.total} color="text-gray-700" bg="bg-gray-50" />
        <StatCard icon={CheckCircle2} label="Present" value={totals.present} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard icon={XCircle} label="Absent" value={totals.absent} color="text-rose-600" bg="bg-rose-50" />
        <StatCard icon={Moon} label="Leave" value={totals.leave} color="text-amber-600" bg="bg-amber-50" />
      </div>

      <div className="text-xs text-gray-500 leading-relaxed">
        <div><span className="font-medium text-gray-700">Project:</span> {projectName}</div>
        <div><span className="font-medium text-gray-700">Date:</span> {date}</div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className={`rounded-lg border ${bg} p-3 flex items-center justify-between`}>
      <div className="flex items-center gap-2 text-gray-600">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="text-sm">{label}</span>
      </div>
      <div className={`text-lg font-semibold ${color}`}>{value}</div>
    </div>
  );
}
