export default function AdminPage() {
  return (
    <div>
      <p className="eyebrow">Admin</p>
      <h1>Dashboard</h1>
      <div className="grid grid-3">
        <div className="card"><h3>New inquiries</h3><p className="text-3xl font-black">—</p></div>
        <div className="card"><h3>Gallery jobs</h3><p className="text-3xl font-black">—</p></div>
        <div className="card"><h3>Published reviews</h3><p className="text-3xl font-black">—</p></div>
      </div>
      <p className="muted mt-6">Data queries and Cognito authorization come in the admin implementation pass.</p>
    </div>
  );
}
