import { cookies } from "next/headers"

import { AppSidebar } from "@/components/app-sidebar"
import { ClientContent } from "@/components/client-content"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function Page() {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <ClientContent />
      </SidebarInset>
    </SidebarProvider>
  )
}