import { useMemo, useState } from "react";
import Header from "./components/Header";
import ControlsBar from "./components/ControlsBar";
import AttendanceTable from "./components/AttendanceTable";
import SummaryPanel from "./components/SummaryPanel";

function formatDateInput(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const initialProjects = [
  {
    id: "site-a",
    name: "Bridge Widening – Sector 12",
    workers: [
      { id: "W-001", name: "Ajay Kumar", role: "Foreman" },
      { id: "W-002", name: "Pooja Sharma", role: "Site Engineer" },
      { id: "W-003", name: "Rahul Verma", role: "Mason" },
      { id: "W-004", name: "S. Iyer", role: "Bar Bender" },
      { id: "W-005", name: "Imran Khan", role: "Carpenter" },
    ],
  },
  {
    id: "site-b",
    name: "Stormwater Drain – Phase 3",
    workers: [
      { id: "W-101", name: "Neha Gupta", role: "Site Engineer" },
      { id: "W-102", name: "Kiran Patil", role: "Surveyor" },
      { id: "W-103", name: "Thomas P.", role: "Helper" },
      { id: "W-104", name: "Deepak Singh", role: "Mason" },
    ],
  },
];

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0].id);
  const [date, setDate] = useState(formatDateInput(new Date()));
  // attendanceState structure: { [date]: { [workerId]: { status, note } } }
  const [attendanceState, setAttendanceState] = useState({});

  const currentProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) || projects[0],
    [projects, selectedProjectId]
  );

  const attendance = attendanceState[date]?.[selectedProjectId] || {};

  const updateAttendance = (workerId, value) => {
    setAttendanceState((prev) => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        [selectedProjectId]: {
          ...(prev[date]?.[selectedProjectId] || {}),
          [workerId]: value,
        },
      },
    }));
  };

  const projectWorkers = currentProject?.workers || [];

  const handleExport = () => {
    const rows = [
      ["Date", date],
      ["Project", currentProject?.name || ""],
      [],
      ["Worker ID", "Name", "Role", "Status", "Note"],
      ...projectWorkers.map((w) => [
        w.id,
        w.name,
        w.role,
        (attendance[w.id]?.status || "absent"),
        (attendance[w.id]?.note || ""),
      ]),
    ];

    const csv = rows
      .map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${selectedProjectId}_${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addWorker = () => {
    const name = prompt("Enter worker name");
    if (!name) return;
    const role = prompt("Enter role (e.g., Mason, Helper, Engineer)") || "Worker";
    const id = `W-${Math.floor(Math.random() * 900 + 100)}`;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId
          ? { ...p, workers: [...p.workers, { id, name, role }] }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <ControlsBar
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
          date={date}
          onChangeDate={setDate}
        />

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Crew Attendance</h2>
          <button
            onClick={addWorker}
            className="text-sm px-3 py-2 rounded-md border bg-white hover:bg-gray-50"
          >
            Add Worker
          </button>
        </div>

        <AttendanceTable
          workers={projectWorkers}
          attendance={attendance}
          onUpdate={updateAttendance}
        />

        <SummaryPanel
          workers={projectWorkers}
          attendance={attendance}
          date={date}
          projectName={currentProject?.name || ""}
          onExport={handleExport}
        />

        <p className="text-xs text-gray-500">
          Tip: Mark status for each person and add notes like overtime, shift, or location grid.
        </p>
      </main>
    </div>
  );
}
