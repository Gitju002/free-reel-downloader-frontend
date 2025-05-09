import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function detectPlatform(url: string): string | null {
  const urlLower = url.toLowerCase()

  if (urlLower.includes("instagram.com") || urlLower.includes("instagr.am")) {
    return "instagram"
  } else if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be") || urlLower.includes("shorts")) {
    return "youtube"
  } else if (urlLower.includes("facebook.com") || urlLower.includes("fb.com") || urlLower.includes("fb.watch")) {
    return "facebook"
  }

  return null
}

export function generateRandomFilename(extension = "mp4"): string {
  const timestamp = new Date().getTime()
  const random = Math.floor(Math.random() * 10000)
  return `reel_${timestamp}_${random}.${extension}`
}
