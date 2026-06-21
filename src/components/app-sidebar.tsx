"use client"

import * as React from "react"
import {
  Laptop,
  Folder,
  Code2,
  Settings,
  Clock,
  MoreHorizontal,
  Plus,
  Network,
  Bell
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarTrigger,
  SidebarSeparator
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <SidebarHeader className="p-4 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="size-6 text-zinc-900 dark:text-zinc-100" />
          </div>
          <SidebarTrigger />
        </div>
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <Plus className="size-4" />
          <span className="font-medium">New</span>
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Computer">
                  <Laptop className="size-4" />
                  <span>Computer</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Spaces">
                  <Folder className="size-4" />
                  <span>Spaces</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Artifacts">
                  <Code2 className="size-4" />
                  <span>Artifacts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Customize">
                  <Settings className="size-4" />
                  <span>Customize</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Connectors" className="text-zinc-500 dark:text-zinc-400 font-medium">
                  <span>Connectors</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Skills" className="text-zinc-500 dark:text-zinc-400 font-medium">
                  <span>Skills</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Workflows" className="text-zinc-500 dark:text-zinc-400 font-medium">
                  <span>Workflows</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Memory" className="text-zinc-500 dark:text-zinc-400 font-medium">
                  <span>Memory</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold px-2 mb-2 text-sm">
            <Clock className="size-4" />
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sm">
                  <span>pakistan top forces</span>
                </SidebarMenuButton>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal className="size-4" />
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sm">
                  <span className="truncate">Agha Khan top best ski...</span>
                </SidebarMenuButton>
                <SidebarMenuAction>
                  <div className="size-1.5 rounded-full bg-teal-500" />
                </SidebarMenuAction>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-4 px-2 pb-4">
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-zinc-300 dark:border-zinc-700 rounded-full text-xs h-8 px-3">
            <Plus className="size-3" />
            Upgrade plan
          </Button>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-zinc-200 dark:border-zinc-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="w-full justify-start rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 gap-2">
              <Avatar className="size-6">
                <AvatarFallback className="bg-purple-600 text-white text-xs">M</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate text-sm font-medium">Muhammad Fa...</div>
              <Bell className="size-4 text-zinc-500" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
