"use client";

import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">SensiStream</h1>
        <p className="text-sm text-muted-foreground">Enterprise Video Intelligence Platform</p>
      </div>
      
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-8 shadow-xl shadow-primary/5">
        {children}
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} SensiStream Inc. All rights reserved.
      </div>
    </div>
  );
}
