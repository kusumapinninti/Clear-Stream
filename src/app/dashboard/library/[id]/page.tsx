"use client";

import React from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Play, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  User, 
  History,
  Download,
  Share2,
  ExternalLink,
  Lock,
  Eye,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function VideoDetailPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/library">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Product_Launch_2024.mp4</h2>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-none font-bold">Safe</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Uploaded by Alex Rivera • Dec 12, 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm">
            <Play className="mr-2 h-4 w-4 fill-current" />
            Stream Now
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content: Player & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Mockup */}
          <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-border/50">
            <img 
              src="https://images.unsplash.com/photo-1492691523567-6170c3295db5?auto=format&fit=crop&q=80&w=1200" 
              className="h-full w-full object-cover opacity-60"
              alt="Video thumbnail"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform group-hover:scale-110 cursor-pointer">
                  <Play className="h-8 w-8 text-white fill-current" />
               </div>
            </div>
            {/* Player Controls Mock */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between">
               <div className="flex items-center gap-4 text-white">
                  <Play className="h-4 w-4 fill-current" />
                  <div className="h-1 w-64 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full w-1/3 bg-primary" />
                  </div>
                  <span className="text-[10px] font-medium">01:24 / 04:22</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-sm border border-white/40" />
                  <div className="h-4 w-4 rounded-sm border border-white/40" />
               </div>
            </div>
          </div>

          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
              <TabsTrigger value="analysis">Sensitivity Analysis</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analysis" className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-none shadow-sm ring-1 ring-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Safety Classification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span>Visual Content</span>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">99.8% Confidence</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span>Audio / Speech</span>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">98.2% Confidence</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm ring-1 ring-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Detected Flags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between opacity-50">
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Sensitive Symbols</span>
                      </div>
                      <span className="text-xs font-medium">None detected</span>
                    </div>
                    <div className="flex items-center justify-between opacity-50">
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Restricted PII</span>
                      </div>
                      <span className="text-xs font-medium">None detected</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-sm ring-1 ring-border/50">
                <CardHeader>
                  <CardTitle>Processing Timeline</CardTitle>
                  <CardDescription>Step-by-step processing and validation history.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { step: "Upload Validation", status: "Success", time: "Dec 12, 14:20:01", icon: ShieldCheck },
                      { step: "Sensitivity Scanning", status: "Success", time: "Dec 12, 14:21:15", icon: ShieldCheck },
                      { step: "Adaptive Bitrate Encoding", status: "Success", time: "Dec 12, 14:22:30", icon: ShieldCheck },
                      { step: "CDN Distribution", status: "Success", time: "Dec 12, 14:23:45", icon: ShieldCheck }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm ring-1 ring-emerald-200">
                             <item.icon className="h-4 w-4" />
                          </div>
                          {i < 3 && <div className="h-8 w-[2px] bg-emerald-100" />}
                        </div>
                        <div className="pt-1">
                          <h4 className="text-sm font-semibold">{item.step}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                             <span>{item.status}</span>
                             <span>•</span>
                             <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metadata">
               <Card className="border-none shadow-sm ring-1 ring-border/50">
                  <CardContent className="pt-6 grid grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <div className="space-y-1">
                           <Label className="text-muted-foreground uppercase text-[10px] tracking-wider font-bold">Original Filename</Label>
                           <p className="text-sm font-medium">Product_Launch_2024_Final_Master.mp4</p>
                        </div>
                        <div className="space-y-1">
                           <Label className="text-muted-foreground uppercase text-[10px] tracking-wider font-bold">Format</Label>
                           <p className="text-sm font-medium">HEVC / H.265 (MP4 Container)</p>
                        </div>
                        <div className="space-y-1">
                           <Label className="text-muted-foreground uppercase text-[10px] tracking-wider font-bold">Resolution</Label>
                           <p className="text-sm font-medium">3840 x 2160 (4K Ultra HD)</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="space-y-1">
                           <Label className="text-muted-foreground uppercase text-[10px] tracking-wider font-bold">Bitrate</Label>
                           <p className="text-sm font-medium">45.2 Mbps (Average)</p>
                        </div>
                        <div className="space-y-1">
                           <Label className="text-muted-foreground uppercase text-[10px] tracking-wider font-bold">Color Space</Label>
                           <p className="text-sm font-medium">BT.2020 (HDR10)</p>
                        </div>
                        <div className="space-y-1">
                           <Label className="text-muted-foreground uppercase text-[10px] tracking-wider font-bold">Frame Rate</Label>
                           <p className="text-sm font-medium">23.976 fps</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="audit">
               <Card className="border-none shadow-sm ring-1 ring-border/50">
                  <CardContent className="pt-6 space-y-4">
                     {[
                        { action: "Video uploaded", user: "Alex Rivera", time: "Dec 12, 14:20:00" },
                        { action: "Sensitivity report approved", user: "System (Auto)", time: "Dec 12, 14:21:20" },
                        { action: "Metadata updated", user: "Sarah Chen", time: "Dec 12, 15:10:45" },
                        { action: "Shared with external partner", user: "John Doe", time: "Dec 13, 09:30:12" }
                     ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                           <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                                 <History className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                 <p className="text-sm font-medium">{log.action}</p>
                                 <p className="text-xs text-muted-foreground">By {log.user}</p>
                              </div>
                           </div>
                           <span className="text-xs text-muted-foreground">{log.time}</span>
                        </div>
                     ))}
                  </CardContent>
               </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Actions & Stats */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm ring-1 ring-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Storage & Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                     <span className="text-muted-foreground">Original File Size</span>
                     <span className="font-medium">128.4 MB</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                     <span className="text-muted-foreground">Optimized for Stream</span>
                     <span className="font-medium">42.1 MB</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-600">
                     <span>Space Saved</span>
                     <span>67%</span>
                  </div>
                  <Progress value={33} className="h-1.5 mt-2" />
               </div>

               <div className="h-[1px] bg-border" />

               <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Actions</h4>
                  <div className="grid gap-2">
                     <Button variant="outline" className="justify-start h-10">
                        <Download className="mr-2 h-4 w-4" />
                        Download Source
                     </Button>
                     <Button variant="outline" className="justify-start h-10 text-rose-600 hover:text-rose-600 hover:bg-rose-50 border-rose-100">
                        <Lock className="mr-2 h-4 w-4" />
                        Restrict Access
                     </Button>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-border/50 bg-primary/5">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                   <Eye className="h-4 w-4 text-primary" />
                   Streaming Analytics
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Views</p>
                      <p className="text-lg font-bold">1,204</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Avg. Playtime</p>
                      <p className="text-lg font-bold">03:45</p>
                   </div>
                </div>
                <div className="h-16 w-full flex items-end gap-1 px-1">
                   {[30, 45, 25, 60, 40, 55, 35, 70, 50, 65, 45, 80].map((h, i) => (
                      <div 
                         key={i} 
                         className="flex-1 bg-primary/20 rounded-t-sm" 
                         style={{ height: `${h}%` }}
                      />
                   ))}
                </div>
             </CardContent>
          </Card>

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 space-y-3">
             <div className="flex items-center gap-2 text-amber-700">
                <Settings className="h-4 w-4" />
                <h4 className="text-sm font-semibold">Admin Configuration</h4>
             </div>
             <p className="text-xs text-amber-600 leading-relaxed">
                Sensitivity processing parameters can be adjusted in the 
                <Link href="/dashboard/settings" className="underline font-bold ml-1">system settings</Link>.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
