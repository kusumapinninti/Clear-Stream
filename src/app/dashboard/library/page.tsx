"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Play, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ListFilter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const videos = [
  {
    id: "v1",
    title: "Product_Launch_2024.mp4",
    thumbnail: "https://images.unsplash.com/photo-1492691523567-6170c3295db5?auto=format&fit=crop&q=80&w=200",
    date: "Dec 12, 2024",
    duration: "04:22",
    size: "128 MB",
    sensitivity: "Safe",
    status: "Completed",
    uploader: "Alex Rivera"
  },
  {
    id: "v2",
    title: "Customer_Interview_Sarah.mov",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200",
    date: "Dec 11, 2024",
    duration: "12:15",
    size: "842 MB",
    sensitivity: "Processing",
    status: "Processing",
    uploader: "Sarah Chen"
  },
  {
    id: "v3",
    title: "Ad_Campaign_Draft_B.mp4",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=200",
    date: "Dec 10, 2024",
    duration: "00:30",
    size: "15 MB",
    sensitivity: "Flagged",
    status: "Completed",
    uploader: "Mike Johnson"
  },
  {
    id: "v4",
    title: "Internal_Training_Module_01.mp4",
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=200",
    date: "Dec 08, 2024",
    duration: "45:00",
    size: "2.4 GB",
    sensitivity: "Safe",
    status: "Completed",
    uploader: "System"
  },
  {
    id: "v5",
    title: "Event_Recap_NYC.mp4",
    thumbnail: "https://images.unsplash.com/photo-1475721027187-402ad2989a38?auto=format&fit=crop&q=80&w=200",
    date: "Dec 05, 2024",
    duration: "02:15",
    size: "45 MB",
    sensitivity: "Safe",
    status: "Completed",
    uploader: "Alex Rivera"
  }
];

export default function LibraryPage() {
  const [view, setView] = useState<"table" | "grid">("table");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Video Library</h2>
          <p className="text-muted-foreground">Manage and review your organization&apos;s video assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button size="sm">
             <Play className="mr-2 h-4 w-4 fill-current" />
             Live Stream
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by title, uploader, or tag..." 
            className="pl-9 h-10 border-none bg-muted/50 focus:bg-background transition-all"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[140px] h-10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-sensitivity">
            <SelectTrigger className="w-[140px] h-10">
              <SelectValue placeholder="Sensitivity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sensitivity">All Content</SelectItem>
              <SelectItem value="safe">Safe Only</SelectItem>
              <SelectItem value="flagged">Flagged Only</SelectItem>
              <SelectItem value="manual">Requires Review</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-6 w-[1px] bg-border mx-1 hidden md:block" />

          <Button variant="ghost" size="icon" className="h-10 w-10">
             <ListFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 transition-colors">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[400px]">Video Asset</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Upload Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Duration</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sensitivity</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-center">Status</th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {videos.map((video) => (
                <tr key={video.id} className="group transition-colors hover:bg-muted/30">
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-4">
                      <div className="relative aspect-video w-24 overflow-hidden rounded-lg border bg-muted shadow-sm">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                           <Play className="h-6 w-6 text-white fill-current" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-foreground truncate max-w-[240px]">{video.title}</span>
                        <span className="text-xs text-muted-foreground">By {video.uploader} • {video.size}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground">{video.date}</td>
                  <td className="p-4 align-middle font-mono text-xs">{video.duration}</td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        video.sensitivity === "Safe" ? "bg-emerald-500" :
                        video.sensitivity === "Flagged" ? "bg-rose-500" :
                        "bg-amber-500 animate-pulse"
                      }`} />
                      <span className={`text-xs font-medium ${
                        video.sensitivity === "Safe" ? "text-emerald-700" :
                        video.sensitivity === "Flagged" ? "text-rose-700" :
                        "text-amber-700"
                      }`}>
                        {video.sensitivity}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-center">
                    <Badge variant="outline" className={`rounded-full border-none px-3 py-1 text-[11px] font-bold ${
                      video.status === "Completed" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {video.status}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="cursor-pointer">
                          <Play className="mr-2 h-4 w-4" />
                          View Stream
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Source
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Asset
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t bg-muted/10 px-6 py-4">
           <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">1-5</span> of <span className="font-semibold text-foreground">1,284</span> videos
           </p>
           <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                 <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                 <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-primary text-primary-foreground">1</Button>
                 <Button size="sm" variant="ghost" className="h-8 w-8 p-0">2</Button>
                 <Button size="sm" variant="ghost" className="h-8 w-8 p-0">3</Button>
                 <span className="text-muted-foreground mx-1 text-xs">...</span>
                 <Button size="sm" variant="ghost" className="h-8 w-8 p-0">12</Button>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                 <ChevronRight className="h-4 w-4" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
