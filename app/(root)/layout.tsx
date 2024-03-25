import { Sidebar } from "@/components/sidebar";
import { Mobilenav } from "@/components/mobilenav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="root">
      <Sidebar />
      <Mobilenav />
      <div className="root-container">
        <div className="wrapper mt-20">{children}</div>
      </div>
    </main>
  );
}
