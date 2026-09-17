import { Sidebar } from "@/components/admin/Sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: LayoutProps<"/admin">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="grid min-h-screen bg-admin-bg text-admin-text max-[1200px]:grid-rows-[auto_1fr] min-[1201px]:grid-cols-[260px_1fr]">
      <div className="min-[1201px]:sticky min-[1201px]:top-0 min-[1201px]:h-screen">
        <Sidebar userEmail={user?.email ?? null} />
      </div>
      <main className="min-w-0 px-8 py-10 max-[860px]:px-5">{children}</main>
    </div>
  );
}
