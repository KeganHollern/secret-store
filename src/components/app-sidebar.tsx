// src/components/app-sidebar.tsx
import { Code, Home, Newspaper } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import NavUser from "@/components/nav-user";

// Menu items remain the same
const platform_items = [
  {
    title: "Home",
    url: "https://lystic.dev",
    icon: Home,
  },
  {
    title: "Blog",
    url: "https://blog.lystic.dev",
    icon: Newspaper,
  },
  {
    title: "Editor",
    url: "https://rustpad.lystic.dev",
    icon: Code,
  },
]

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Lystic's Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platform_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a target='_blank' href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar >
  )
}