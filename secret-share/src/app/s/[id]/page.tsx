import { AppSidebar } from "@/components/app-sidebar";
import { SecretViewer } from "@/components/secrets/secret-viewer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function SecretPage() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <SecretViewer />
      </SidebarInset>
    </SidebarProvider>
  );
}