"use client";

import React from "react";
import { Lock, FileQuestion, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PermissionDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center animate-in fade-in duration-500">
      <div className="h-20 w-20 rounded-full bg-rose-50 flex items-center justify-center mb-6">
        <Lock className="h-10 w-10 text-rose-600" />
      </div>
      <h3 className="text-xl font-bold tracking-tight">Access Restricted</h3>
      <p className="text-muted-foreground max-w-sm mt-2">
        You don&apos;t have the necessary permissions to view this section. Please contact your organization administrator.
      </p>
      <Button variant="outline" className="mt-8 px-8" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
}

export function EmptyState({ 
  title = "No assets found", 
  description = "Get started by uploading your first video asset.",
  actionLabel = "Upload Video",
  onAction
}: { 
  title?: string; 
  description?: string; 
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center border-2 border-dashed rounded-2xl bg-muted/30">
      <div className="h-16 w-16 rounded-full bg-background shadow-sm flex items-center justify-center mb-6">
        <FileQuestion className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mt-2">
        {description}
      </p>
      <Button className="mt-8 px-10" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}

export function ErrorState({ message = "Something went wrong" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mb-6">
        <AlertCircle className="h-8 w-8 text-amber-600" />
      </div>
      <h3 className="text-lg font-semibold">{message}</h3>
      <p className="text-sm text-muted-foreground mt-2">
        We encountered an error while loading this data. Please try again.
      </p>
      <Button variant="outline" className="mt-8 px-8 gap-2">
        <RefreshCcw className="h-4 w-4" />
        Retry Loading
      </Button>
    </div>
  );
}
