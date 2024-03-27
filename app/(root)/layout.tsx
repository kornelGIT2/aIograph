import { Sidebar } from "@/components/sidebar";
import { Mobilenav } from "@/components/mobilenav";
import { SignedIn } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="root ">
      <SignedIn>
        <Sidebar />
      </SignedIn>
      <Mobilenav />
      <div className="root-container dark:bg-slate-950 bg-slate-100">
        <div className="wrapper lg:mt-20 mt-4">{children}</div>
      </div>
    </main>
  );
}
