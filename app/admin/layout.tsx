import Link from "next/link";
import { requireAdminScaffoldEnabled } from "@/lib/admin";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  requireAdminScaffoldEnabled();

  return (
    <section className="section">
      <div className="site-shell grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="card h-fit stack">
          <strong>NOVA Admin</strong>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/inquiries">Inquiries</Link>
          <Link href="/admin/gallery">Gallery</Link>
          <Link href="/admin/reviews">Reviews</Link>
          <p className="form-help">Scaffold only. Cognito auth must be added before enabling.</p>
        </aside>
        <div>{children}</div>
      </div>
    </section>
  );
}
