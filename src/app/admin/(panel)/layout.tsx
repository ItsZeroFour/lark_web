import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/Sidebar";

/**
 * Authenticated admin shell. The middleware already guards `/admin/*`, but we
 * re-check here so server components below can rely on a present session.
 */
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text lg:flex-row">
      <AdminSidebar user={session.user} />
      <main className="flex-1 px-5 py-7 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
