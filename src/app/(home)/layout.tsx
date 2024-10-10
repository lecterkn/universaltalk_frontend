import Sidebar from "../components/layouts/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
  );
}
