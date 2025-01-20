"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Dashboard from "../components/Dashboard/Dashboard";
import GlobalContextProvider from "../contextApi";

export default function DashboardPage() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      redirect("/sign-in");
    }
  }, [isSignedIn]);

  return (
    <GlobalContextProvider>
      <div className="flex w-full h-auto relative">
        <Dashboard />
      </div>
    </GlobalContextProvider>
  );
}