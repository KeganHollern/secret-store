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
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { enc } from 'crypto-js'
import AES from 'crypto-js/aes'
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

export function SecretViewer() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const fetchedRef = useRef(false)

  const handleNew = useCallback(() => {
    router.push('/')
  }, [router])

  useEffect(() => {
    // Only fetch once
    if (fetchedRef.current) return;
    fetchedRef.current = true;


    const fetchSecret = async () => {
      try {
        // Get the decryption key from the URL hash
        const key = window.location.hash.slice(1)
        
        if (!key) {
          throw new Error('No decryption key provided')
        }

        // Fetch the encrypted data
        const response = await fetch(`/api/secrets?id=${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch secret')
        }

        const { data: encryptedData } = await response.json()
        
        // Decrypt the data
        const decryptedBytes = AES.decrypt(encryptedData, key)
        const decryptedContent = decryptedBytes.toString(enc.Utf8)

        if (!decryptedContent) {
          throw new Error('Failed to decrypt content')
        }

        setContent(decryptedContent)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        console.error('Error fetching secret:', err)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err instanceof Error ? err.message : "Failed to load secret",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSecret()
  }, [params.id, toast])

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
                <BreadcrumbPage>View Secret</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button 
          onClick={handleNew}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          New
        </Button>
      </header>
      <main className="flex flex-1 flex-col overflow-hidden">
        <FlexokiEditor
          defaultLanguage="markdown"
          value={content}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            wordWrap: "on",
            padding: { top: 16 },
            lineNumbers: "on",
            automaticLayout: true,
            readOnly: true,
            domReadOnly: true,
          }}
          loading={loading}
        />
      </main>
      <Toaster />
    </>
  )
}