"use client";

import React from "react";
import {
   UserPlus,
   Search,
   MoreVertical,
   Mail,
   Shield,
   UserCircle,
   CheckCircle2,
   XCircle,
   Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const users = [
   {
      id: 1,
      name: "Alex Rivera",
      email: "alex@sensistream.io",
      role: "Admin",
      status: "Active",
      joined: "Oct 12, 2024",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
   },
   {
      id: 2,
      name: "Sarah Chen",
      email: "sarah.c@sensistream.io",
      role: "Editor",
      status: "Active",
      joined: "Nov 05, 2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
   },
   {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@sensistream.io",
      role: "Viewer",
      status: "Suspended",
      joined: "Dec 01, 2024",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
   },
   {
      id: 4,
      name: "John Doe",
      email: "john@sensistream.io",
      role: "Admin",
      status: "Active",
      joined: "Sep 15, 2024",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
   }
];

export default function UsersPage() {
   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
               <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
               <p className="text-muted-foreground">Manage user permissions and organization roles.</p>
            </div>
            <Button className="h-10">
               <UserPlus className="mr-2 h-4 w-4" />
               Invite Member
            </Button>
         </div>

         <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-3 space-y-6">
               <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                     <Input
                        placeholder="Filter by name, email, or role..."
                        className="pl-9 h-10 border-none bg-muted/50 focus:bg-background transition-all"
                     />
                  </div>
                  <div className="flex items-center gap-3">
                     <Select defaultValue="all-roles">
                        <SelectTrigger className="w-[140px] h-10">
                           <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all-roles">All Roles</SelectItem>
                           <SelectItem value="admin">Admin</SelectItem>
                           <SelectItem value="editor">Editor</SelectItem>
                           <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                     </Select>
                     <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Filter className="h-4 w-4" />
                     </Button>
                  </div>
               </div>

               <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                  <div className="relative w-full overflow-auto">
                     <table className="w-full text-sm">
                        <thead className="bg-muted/30">
                           <tr className="border-b transition-colors">
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Member</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-center">Role</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-center">Status</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                              <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right"></th>
                           </tr>
                        </thead>
                        <tbody className="divide-y">
                           {users.map((user) => (
                              <tr key={user.id} className="group transition-colors hover:bg-muted/30">
                                 <td className="p-4 align-middle">
                                    <div className="flex items-center gap-3">
                                       <Avatar className="h-9 w-9 border shadow-sm transition-transform group-hover:scale-105">
                                          <AvatarImage src={user.avatar} />
                                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                       </Avatar>
                                       <div className="flex flex-col">
                                          <span className="font-semibold">{user.name}</span>
                                          <span className="text-xs text-muted-foreground">{user.email}</span>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="p-4 align-middle text-center">
                                    <Badge variant="outline" className={`rounded-full border-none px-3 py-0.5 text-[10px] font-bold ${user.role === "Admin" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                                       }`}>
                                       {user.role}
                                    </Badge>
                                 </td>
                                 <td className="p-4 align-middle text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                       {user.status === "Active" ? (
                                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                       ) : (
                                          <XCircle className="h-3 w-3 text-rose-500" />
                                       )}
                                       <span className={`text-xs font-medium ${user.status === "Active" ? "text-emerald-700" : "text-rose-700"
                                          }`}>
                                          {user.status}
                                       </span>
                                    </div>
                                 </td>
                                 <td className="p-4 align-middle text-muted-foreground text-xs">{user.joined}</td>
                                 <td className="p-4 align-middle text-right">
                                    <DropdownMenu>
                                       <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <MoreVertical className="h-4 w-4" />
                                          </Button>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent align="end" className="w-48">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="cursor-pointer">
                                             <UserCircle className="mr-2 h-4 w-4" />
                                             View Profile
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="cursor-pointer">
                                             <Shield className="mr-2 h-4 w-4" />
                                             Change Role
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="cursor-pointer">
                                             <Mail className="mr-2 h-4 w-4" />
                                             Send Message
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                                             {user.status === "Active" ? "Suspend Account" : "Activate Account"}
                                          </DropdownMenuItem>
                                       </DropdownMenuContent>
                                    </DropdownMenu>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
               <Card className="border-none shadow-sm ring-1 ring-border/50">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-sm font-bold">Organization Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Seats Occupied</p>
                        <p className="text-2xl font-bold">12 / 20</p>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1">
                           <div className="h-full w-[60%] bg-primary" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                           <p className="text-[10px] text-muted-foreground font-bold">Active Now</p>
                           <p className="text-lg font-bold">8</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] text-muted-foreground font-bold">Pending</p>
                           <p className="text-lg font-bold">2</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="rounded-xl border p-5 space-y-4 bg-primary/5">
                  <div className="flex items-center gap-2 text-primary">
                     <Shield className="h-5 w-5" />
                     <h4 className="font-semibold text-sm">Role Definitions</h4>
                  </div>
                  <div className="space-y-3">
                     <div className="space-y-1">
                        <p className="text-[11px] font-bold">Admin</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Full system access, billing management, and user governance.</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[11px] font-bold">Editor</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Can upload, edit metadata, and manage library content.</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[11px] font-bold">Viewer</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Read-only access to library and streaming services.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
