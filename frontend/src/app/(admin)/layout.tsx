import { Header } from "@/components/ui/dashboard/header";
import { Sidebar } from "@/components/ui/dashboard/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Sidebar - Visível apenas em telas md ou maiores */}
      <aside className="hidden w-64 overflow-y-auto border-r bg-white dark:bg-slate-950 md:block">
        <Sidebar />
      </aside>

      {/* Área Principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
