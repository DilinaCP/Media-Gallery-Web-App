import type { ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header"

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-linear-to-br from-slate-950 via-purple-900 to-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
