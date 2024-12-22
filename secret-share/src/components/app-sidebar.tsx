import MD5 from 'crypto-js/md5';
import { Code, Home, LayoutDashboard, MessageCircleCode, Newspaper } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import NavUser from "@/components/nav-user";

// Menu items.
const platform_items = [
  {
    title: "Home",
    url: "https://lystic.dev",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "https://dash.lystic.dev",
    icon: LayoutDashboard,
  },
  {
    title: "Blog",
    url: "https://blog.lystic.dev",
    icon: Newspaper,
  },
  {
    title: "Chat",
    url: "https://chat.lystic.dev",
    icon: MessageCircleCode,
  },
  {
    title: "Editor",
    url: "https://rustpad.lystic.dev",
    icon: Code,
  },
]

const getGravatarUrl = (email: string) => {
  const emailHash = MD5(email.trim().toLowerCase()).toString();
  return `https://www.gravatar.com/avatar/${emailHash}?s=200`;
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
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
      <SidebarFooter>
        <NavUser user={{
          name: "Kegan",
          email: "keganhollern@gmail.com",
          avatar: getGravatarUrl("keganhollern@gmail.com"),
        }} />
        
      </SidebarFooter>
    </Sidebar>
  )
}
