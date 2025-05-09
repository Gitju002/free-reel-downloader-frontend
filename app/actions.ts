"use server"

import { detectPlatform } from "@/lib/utils"
import { downloadInstagramReel, downloadYoutubeReel, downloadFacebookReel } from "@/lib/downloaders"

export async function downloadReel(url: string, platform: string) {
  try {
    // Validate URL
    try {
      new URL(url)
    } catch (e) {
      return { error: "Invalid URL. Please enter a valid URL." }
    }

    // Auto-detect platform if not specified
    if (platform === "auto") {
      platform = detectPlatform(url)
      if (!platform) {
        return { error: "Could not detect platform. Please select manually." }
      }
    }

    // Download based on platform
    switch (platform) {
      case "instagram":
        return await downloadInstagramReel(url)
      case "youtube":
        return await downloadYoutubeReel(url)
      case "facebook":
        return await downloadFacebookReel(url)
      default:
        return { error: "Unsupported platform" }
    }
  } catch (error) {
    console.error("Download error:", error)
    return { error: "Failed to download. Please try again." }
  }
}
