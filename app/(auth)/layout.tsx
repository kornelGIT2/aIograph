"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <main className="flex min-h-screen items-center justify-center">
      {children}
      <Button
        onClick={() => {
          router.push("/");
        }}
        className="absolute justify-center flex items-center top-0 left-0 m-10 bg-secondary text-slate-400 rounded-3xl p-6 hover:bg-slate-200 "
      >
        <Image
          src={"back.svg"}
          height={15}
          width={15}
          alt={"back"}
          className="opacity-30 mr-[1px]"
        />{" "}
        <p>Back</p>
      </Button>
    </main>
  );
}
