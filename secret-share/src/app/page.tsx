"use client"

import { AppSidebar } from "@/components/app-sidebar"
import FlexokiEditor from "@/components/editor"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import React, { useCallback, useState } from "react"

const DEFAULT_CONTENT = `# Secret Title

Write your secret below in **Markdown**.

## Instructions

- Press **CTRL+S** to save your secret.
- The secret is **one-time-use**: once you generate the link, do not visit it before sharing, or it will be deleted.
- Use **bold** text for emphasis.
- Use *italic* text for subtle highlights.
- Add [links](https://example.com) if needed.
- Use \`inline code\` for short code snippets.

> Keep your secrets safe and secure.

\`\`\`
# Code block
print("This is an example of a code block.")
\`\`\`
`

export default function Page() {
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareUrl, setShareUrl] = useState<string>("")
  const { toast } = useToast()

  const handleSave = useCallback(() => {
    // Generate a new URL only when saving
    const secretId = Math.random().toString(36).substring(2, 15)
    const newShareUrl = `https://localhost/s/${secretId}`
    setShareUrl(newShareUrl)
    setShowShareDialog(true)
  }, [])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        description: "URL copied to clipboard",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy URL to clipboard",
      })
    }
  }, [shareUrl, toast])

  // Handle CTRL+S
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleSave])

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1"/>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  lystic.dev
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Secret Share</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col overflow-hidden">
          <FlexokiEditor
            defaultLanguage="markdown"
            defaultValue={DEFAULT_CONTENT}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              wordWrap: "on",
              padding: { top: 16 },
              lineNumbers: "on",
              automaticLayout: true
            }}
          />
        </main>
      </SidebarInset>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Secret</DialogTitle>
            <DialogDescription>
              Your secret has been saved. Share this one-time URL with someone. The content will be deleted after the first view.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={shareUrl}
              className="font-mono text-sm"
            />
            <Button 
              type="button" 
              variant="secondary"
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </SidebarProvider>
  )
}