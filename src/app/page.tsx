import { AppSidebar } from "@/components/app-sidebar"
import { ClientContent } from "@/components/client-content"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <ClientContent />
      </SidebarInset>
    </SidebarProvider>
  )
}