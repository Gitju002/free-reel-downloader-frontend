"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Download, Instagram, Youtube, Facebook } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { downloadReel } from "@/app/actions"
import { detectPlatform } from "@/lib/utils"

export default function DownloadForm() {
  const [url, setUrl] = useState("")
  const [platform, setPlatform] = useState("auto")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [downloadUrl, setDownloadUrl] = useState("")
  const [downloadFilename, setDownloadFilename] = useState("")

  // Handle shared content from apps
  useEffect(() => {
    if (navigator.share) {
      // Check if the page was opened via share intent
      if (window.location.search) {
        const params = new URLSearchParams(window.location.search)
        const sharedUrl = params.get("url") || params.get("text")

        if (sharedUrl) {
          setUrl(sharedUrl)
          const detectedPlatform = detectPlatform(sharedUrl)
          if (detectedPlatform) {
            setPlatform(detectedPlatform)
            handleDownload(sharedUrl, detectedPlatform)
          }
        }
      }
    }
  }, [])

  const handleDownload = async (inputUrl = url, inputPlatform = platform) => {
    try {
      setLoading(true)
      setError("")
      setDownloadUrl("")

      if (!inputUrl) {
        setError("Please enter a URL")
        return
      }

      // Auto-detect platform if set to auto
      let finalPlatform = inputPlatform
      if (finalPlatform === "auto") {
        finalPlatform = detectPlatform(inputUrl)
        if (!finalPlatform) {
          setError("Could not detect platform. Please select manually.")
          return
        }
      }

      const result = await downloadReel(inputUrl, finalPlatform)

      if (result.error) {
        setError(result.error)
      } else if (result.downloadUrl) {
        setDownloadUrl(result.downloadUrl)
        setDownloadFilename(result.filename || `download.${result.fileType || "mp4"}`)

        // Auto download
        const link = document.createElement("a")
        link.href = result.downloadUrl
        link.download = result.filename || `download.${result.fileType || "mp4"}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (err) {
      setError("An error occurred while downloading. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Paste reel URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>

          <Tabs defaultValue="auto" value={platform} onValueChange={setPlatform}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="auto">Auto</TabsTrigger>
              <TabsTrigger value="instagram" className="flex items-center gap-1">
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline">Instagram</span>
              </TabsTrigger>
              <TabsTrigger value="youtube" className="flex items-center gap-1">
                <Youtube className="w-4 h-4" />
                <span className="hidden sm:inline">YouTube</span>
              </TabsTrigger>
              <TabsTrigger value="facebook" className="flex items-center gap-1">
                <Facebook className="w-4 h-4" />
                <span className="hidden sm:inline">Facebook</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button className="w-full" onClick={() => handleDownload()} disabled={loading || !url}>
            {loading ? "Processing..." : "Download Reel"}
            {!loading && <Download className="ml-2 h-4 w-4" />}
          </Button>

          {downloadUrl && (
            <Button variant="outline" className="w-full" asChild>
              <a href={downloadUrl} download={downloadFilename}>
                Download Again
                <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
