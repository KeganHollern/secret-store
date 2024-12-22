// src/app/page.tsx
"use client"

import FlexokiEditor from "@/components/editor"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Save } from "lucide-react"
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
  const isMobile = useMediaQuery("(max-width: 768px)")
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
    <Layout>
      <div className="relative h-full">
        {/* Mobile save button */}
        {isMobile && (
          <div className="absolute bottom-4 right-4 z-50">
            <Button size="lg" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        )}

        {/* Editor taking up full space */}
        <div className="h-full">
          <FlexokiEditor
            height="100%"
            defaultLanguage="markdown"
            defaultValue={DEFAULT_CONTENT}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              wordWrap: "on",
              padding: { top: 16 },
              lineNumbers: "on",
            }}
          />
        </div>
      </div>
    </Layout>
  )
}