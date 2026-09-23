// Admin layout — no Navbar, no Footer, no ThemeProvider
// ClerkProvider is in root layout, no need to duplicate here
export const metadata = {
  title: "Admin — Guts N Glory Defence",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" data-admin="true">
      {children}
    </div>
  );
}
