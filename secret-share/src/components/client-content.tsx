"use client"

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
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import AES from 'crypto-js/aes'
import { Save } from "lucide-react"
import React, { useCallback, useRef, useState } from "react"

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

export function ClientContent() {
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareUrl, setShareUrl] = useState<string>("")
  const { toast } = useToast()
  const editorRef = useRef<any>(null)

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleSave = useCallback(async () => {
    console.log("Save triggered");
    if (!editorRef.current) {
      console.log("No editor reference!");
      return;
    }

    try {
      // Get the current content
      const content = editorRef.current.getValue();
      console.log("Editor content:", content.substring(0, 50) + "...");

      // Generate a random key for AES encryption
      const key = Math.random().toString(36).substring(2) + 
                 Math.random().toString(36).substring(2) + 
                 Math.random().toString(36).substring(2);
      console.log("Generated key:", key);

      // Encrypt the content
      const encryptedData = AES.encrypt(content, key).toString();
      console.log("Encrypted data length:", encryptedData.length);

      console.log("Making POST request to /api/secrets");
      // Send to server
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encryptedData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response error:', errorData);
        throw new Error(`Failed to save secret: ${errorData.error}`);
      }

      const { id } = await response.json();
      console.log("Received ID from server:", id);

      // Create the share URL with the key in the hash (never sent to server)
      const shareUrl = `${window.location.origin}/s/${id}#${key}`;
      setShareUrl(shareUrl);
      setShowShareDialog(true);
    } catch (err) {
      console.error('Error saving secret:', err);
      toast({
        variant: "destructive",
        description: "Failed to save secret",
      });
    }
  }, [toast]);

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
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1"/>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="https://lystic.dev">
                  lystic.dev
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Secret Share</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button 
          onClick={(e) => {
            console.log("Save button clicked");
            handleSave();
          }} 
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
      </header>
      <main className="flex flex-1 flex-col overflow-hidden">
        <FlexokiEditor
          defaultLanguage="markdown"
          defaultValue={DEFAULT_CONTENT}
          onMount={handleEditorMount}
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
    </>
  )
}