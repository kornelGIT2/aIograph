"use client";
import React from "react";
import { heroImages } from "@/const";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function HeroPage() {
  const router = useRouter();
  return (
    <main className=" flex justify-center items-center">
      <section
        className="relative flex place-items-center before:absolute before:h-[300px]
       before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
         before:blur-3xl before:content-[''] after:absolute after:-z-20
         after:h-[250px] after:w-full sm:after:w-[1000px] after:translate-x-1/5  after:bg-gradient-conic after:from-sky-200
          after:via-blue-200 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent
       before:dark:to-blue-800 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40  z-[1] flex-col gap-6 justify-center p-10 mt-20"
      >
        <div className="justify-center gap-10 flex flex-col items-center text-center">
          <h1 className="lg:text-7xl dark:text-white text-6xl text-blue-950 font-bold lg:leading-tight leading-tight">
            AI Powered{" "}
            <span className="inline-block bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
              SaaS Platform
            </span>
          </h1>
          <p className="font-semibold text-lg text-blue-950 opacity-80 dark:text-slate-200">
            Whether you are a professional photographer, a graphic designer, or
            an amateur enthusiast, my platform offers intuitive tools and
            powerful features to take your images to the next level.
          </p>
          <div className="">
            <Button
              className="flex justify-center items-center font-semibold bg-gradient-to-r from-blue-500 to-blue-800 rounded-3xl p-6 tracking-wide hover:to-blue-600"
              onClick={() => {
                router.push("/sign-up");
              }}
            >
              Start for free
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HeroPage;
