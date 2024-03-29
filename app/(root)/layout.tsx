import { Sidebar } from "@/components/sidebar";
import { Mobilenav } from "@/components/mobilenav";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Footer from "@/components/footer/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="root">
      <SignedIn>
        <Sidebar />
      </SignedIn>
      <Mobilenav />

      <div className="root-container dark:bg-slate-950 bg-slate-100 flex flex-col">
        <div className="wrapper lg:mt-20">{children}</div>
        <SignedOut>
          <Footer />
        </SignedOut>
      </div>

      <Toaster richColors />
    </main>
  );
}
