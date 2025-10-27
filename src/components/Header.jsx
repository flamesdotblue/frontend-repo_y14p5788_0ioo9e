import { HardHat } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="p-2 rounded-md bg-yellow-100 text-yellow-700">
          <HardHat className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Site Attendance</h1>
          <p className="text-sm text-gray-500">Daily workforce tracker for civil engineering projects</p>
        </div>
      </div>
    </header>
  );
}
