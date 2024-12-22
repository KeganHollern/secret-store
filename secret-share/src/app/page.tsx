// src/app/page.tsx
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
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React, { useCallback, useRef } from "react"

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
  const editorRef = useRef<any>(null)

  const handleSave = useCallback(() => {
    // TODO: Implement save functionality
    console.log("Saving...", editorRef.current?.getValue())
  }, [])

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

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      
      <SidebarInset >
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
        { /* the div below will overflow as the parent container shrinks */}
        { /* i want the div below to shrink with the parent container */}
        <div className="flex flex-1 flex-col">
          <FlexokiEditor
            className="w-full h-full flex-shrink min-w-0 min-h-0"
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
        
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
};