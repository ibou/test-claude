import Sidebar from "@/components/Sidebar";
import { TasksProvider } from "@/lib/tasks-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TasksProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          {/* Mobile brand bar (sidebar hidden < md) */}
          <div className="md:hidden bg-gray-900 dark:bg-gray-950 text-white px-4 py-3 flex items-center justify-between border-b border-transparent dark:border-gray-800">
            <div>
              <span className="text-base font-bold tracking-tight">Workspace</span>
              <span aria-hidden="true" className="ml-1 text-indigo-400 font-bold">.</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold" aria-hidden="true">
              IB
            </div>
          </div>

          {children}
        </main>
      </div>
    </TasksProvider>
  );
}
