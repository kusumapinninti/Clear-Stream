"use client";

import React from "react";
import { 
  User, 
  Building, 
  Database, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Key,
  Smartphone,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Preferences</h2>
        <p className="text-muted-foreground">Configure your profile, organization, and security settings.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
             <TabsList className="flex flex-col h-auto bg-transparent border-none space-y-1 p-0">
               {[
                 { value: "profile", label: "Profile", icon: User },
                 { value: "org", label: "Organization", icon: Building },
                 { value: "storage", label: "Storage & API", icon: Database },
                 { value: "security", label: "Security", icon: ShieldCheck },
                 { value: "billing", label: "Plan & Billing", icon: CreditCard }
               ].map((tab) => (
                  <TabsTrigger 
                     key={tab.value}
                     value={tab.value}
                     className="justify-start gap-3 h-10 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground transition-all rounded-lg"
                  >
                     <tab.icon className="h-4 w-4" />
                     {tab.label}
                  </TabsTrigger>
               ))}
             </TabsList>
          </aside>

          <div className="flex-1">
             <TabsContent value="profile" className="mt-0 space-y-6">
                <Card className="border-none shadow-sm ring-1 ring-border/50">
                   <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal details and how others see you.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="flex items-center gap-6">
                         <div className="relative group">
                            <div className="h-20 w-20 rounded-full border bg-muted flex items-center justify-center overflow-hidden">
                               <img 
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                 alt="Avatar" 
                               />
                            </div>
                            <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full shadow-md">
                               <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            </Button>
                         </div>
                         <div className="space-y-2">
                            <Button size="sm">Change Avatar</Button>
                            <p className="text-[10px] text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Alex" />
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Rivera" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label htmlFor="email">Work Email</Label>
                         <Input id="email" defaultValue="alex@sensistream.io" readOnly />
                         <p className="text-[10px] text-muted-foreground">Email is managed by your organization admin.</p>
                      </div>
                      <div className="flex justify-end pt-4">
                         <Button className="px-8">Save Changes</Button>
                      </div>
                   </CardContent>
                </Card>

                <Card className="border-none shadow-sm ring-1 ring-border/50">
                   <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Configure how and when you receive alerts.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      {[
                        { label: "New video processing completed", desc: "Get notified when an asset is ready for review." },
                        { label: "Sensitivity flag detected", desc: "High priority alerts for flagged content." },
                        { label: "System health alerts", desc: "Infrastructure and storage threshold notifications." }
                      ].map((item, i) => (
                         <div key={i} className="flex items-center justify-between py-2">
                            <div className="space-y-0.5">
                               <p className="text-sm font-medium">{item.label}</p>
                               <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                            <Switch defaultChecked={i < 2} />
                         </div>
                      ))}
                   </CardContent>
                </Card>
             </TabsContent>

             <TabsContent value="storage" className="mt-0 space-y-6">
                <Card className="border-none shadow-sm ring-1 ring-border/50">
                   <CardHeader>
                      <CardTitle>API Configuration</CardTitle>
                      <CardDescription>Manage your organization&apos;s API keys for custom integrations.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="rounded-xl border p-4 space-y-4">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="bg-primary/10 p-2 rounded-lg">
                                  <Key className="h-5 w-5 text-primary" />
                               </div>
                               <div>
                                  <p className="text-sm font-semibold">Production API Key</p>
                                  <p className="text-xs text-muted-foreground">Created on Dec 01, 2024</p>
                               </div>
                            </div>
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">Active</Badge>
                         </div>
                         <div className="flex items-center gap-2">
                            <Input value="sk_live_51PjB..." readOnly className="font-mono text-xs bg-muted/50" />
                            <Button variant="outline" size="sm">Reveal</Button>
                            <Button variant="outline" size="sm">Copy</Button>
                         </div>
                      </div>
                      <Button variant="outline" className="w-full h-11 border-dashed">
                         <Key className="mr-2 h-4 w-4" />
                         Generate New API Key
                      </Button>
                   </CardContent>
                </Card>

                <Card className="border-none shadow-sm ring-1 ring-border/50">
                   <CardHeader>
                      <CardTitle>Storage Preferences</CardTitle>
                      <CardDescription>Configure retention policies and default buckets.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="space-y-2">
                         <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current Utilization</span>
                            <span className="font-bold">84.2%</span>
                         </div>
                         <Progress value={84.2} className="h-2" />
                         <p className="text-[10px] text-muted-foreground mt-2">
                            Approaching limit. Consider upgrading your <span className="font-bold text-primary">Enterprise Plan</span> for unlimited storage.
                         </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t">
                         <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                               <p className="text-sm font-medium">Automatic Purge</p>
                               <p className="text-xs text-muted-foreground">Delete processing logs after 90 days.</p>
                            </div>
                            <Switch defaultChecked />
                         </div>
                         <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                               <p className="text-sm font-medium">Multi-Region Replication</p>
                               <p className="text-xs text-muted-foreground">Duplicate assets across 3 global regions.</p>
                            </div>
                            <Switch />
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </TabsContent>

             <TabsContent value="security" className="mt-0 space-y-6">
                <Card className="border-none shadow-sm ring-1 ring-border/50">
                   <CardHeader>
                      <CardTitle>Security & Authentication</CardTitle>
                      <CardDescription>Protect your account with enterprise security layers.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl border bg-primary/5 border-primary/10">
                         <div className="flex gap-4">
                            <Smartphone className="h-6 w-6 text-primary mt-1" />
                            <div>
                               <p className="text-sm font-bold">Two-Factor Authentication (2FA)</p>
                               <p className="text-xs text-muted-foreground max-w-sm mt-1">
                                  Add an extra layer of security to your account by requiring more than just a password to log in.
                               </p>
                            </div>
                         </div>
                         <Button size="sm">Enable 2FA</Button>
                      </div>

                      <div className="space-y-4 pt-4">
                         <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Sessions</h4>
                         {[
                            { device: "Chrome on MacOS", location: "San Francisco, US", ip: "192.168.1.1", current: true },
                            { device: "Safari on iPhone", location: "San Francisco, US", ip: "172.16.0.12", current: false }
                         ].map((session, i) => (
                            <div key={i} className="flex items-center justify-between py-2">
                               <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                                     <Smartphone className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <div>
                                     <p className="text-sm font-medium">
                                        {session.device} 
                                        {session.current && <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700 text-[9px] py-0 px-1 border-none">Current</Badge>}
                                     </p>
                                     <p className="text-[10px] text-muted-foreground">{session.location} • {session.ip}</p>
                                  </div>
                               </div>
                               {!session.current && <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600"><Trash2 className="h-4 w-4" /></Button>}
                            </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>
             </TabsContent>

             <TabsContent value="billing" className="mt-0 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                   <Card className="border-none shadow-sm ring-1 ring-border/50 bg-primary text-primary-foreground">
                      <CardHeader>
                         <CardTitle className="text-lg">Enterprise Pro</CardTitle>
                         <CardDescription className="text-primary-foreground/70">Our most popular plan for scaling teams.</CardDescription>
                      </CardHeader>
                      <CardContent>
                         <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$499</span>
                            <span className="text-sm opacity-70">/ month</span>
                         </div>
                         <ul className="mt-6 space-y-2 text-sm opacity-90">
                            <li className="flex items-center gap-2 font-medium">
                               <CheckCircle2 className="h-4 w-4" />
                               Unlimited Video Processing
                            </li>
                            <li className="flex items-center gap-2 font-medium">
                               <CheckCircle2 className="h-4 w-4" />
                               4K Adaptive Bitrate
                            </li>
                            <li className="flex items-center gap-2 font-medium">
                               <CheckCircle2 className="h-4 w-4" />
                               Priority Support (2h SLA)
                            </li>
                         </ul>
                         <Button variant="secondary" className="w-full mt-8 h-11">Manage Subscription</Button>
                      </CardContent>
                   </Card>

                   <Card className="border-none shadow-sm ring-1 ring-border/50">
                      <CardHeader>
                         <CardTitle>Usage Metrics</CardTitle>
                         <CardDescription>Current billing cycle usage.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                               <span className="text-muted-foreground">Streaming Hours</span>
                               <span className="font-bold">1,240 / 5,000</span>
                            </div>
                            <Progress value={25} className="h-1.5" />
                         </div>
                         <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                               <span className="text-muted-foreground">Processing API Calls</span>
                               <span className="font-bold">42,500 / 100,000</span>
                            </div>
                            <Progress value={42.5} className="h-1.5" />
                         </div>
                         <div className="pt-4 border-t">
                            <h4 className="text-xs font-bold uppercase mb-4">Payment Method</h4>
                            <div className="flex items-center justify-between p-3 rounded-lg border">
                               <div className="flex items-center gap-3">
                                  <div className="h-8 w-12 bg-muted rounded flex items-center justify-center font-bold text-[10px] tracking-tighter">VISA</div>
                                  <div>
                                     <p className="text-xs font-bold">•••• 4242</p>
                                     <p className="text-[10px] text-muted-foreground">Expires 12/28</p>
                                  </div>
                               </div>
                               <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                            </div>
                         </div>
                      </CardContent>
                   </Card>
                </div>
             </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
