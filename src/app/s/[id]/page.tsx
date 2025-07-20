import { cookies } from "next/headers"

import { AppSidebar } from "@/components/app-sidebar";
import { SecretViewer } from "@/components/secrets/secret-viewer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function SecretPage() {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <SecretViewer />
      </SidebarInset>
    </SidebarProvider>
  );
}