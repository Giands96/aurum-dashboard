import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { PageTransition } from "@/components/layout/page-transition";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#eef5fb] flex items-start justify-center p-0 sm:p-4 lg:p-6">
      <div className="flex w-full min-h-screen sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-3rem)] bg-white rounded-none sm:rounded-[28px] lg:rounded-[36px] shadow-[0_16px_45px_rgba(30,50,70,0.10)] overflow-hidden">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
