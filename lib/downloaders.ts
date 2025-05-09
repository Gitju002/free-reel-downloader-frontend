// File: lib/downloaders.ts
"use server";

import { generateRandomFilename } from "./utils";

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function downloadInstagramReel(url: string) {
  try {
    const response = await fetch(
      `${backendBaseUrl}/download?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) throw new Error("Download failed");

    return {
      downloadUrl: `${backendBaseUrl}/download?url=${encodeURIComponent(url)}`,
      filename: generateRandomFilename("mp4"),
      fileType: "mp4",
    };
  } catch (error) {
    console.error("Instagram download error:", error);
    return { error: "Failed to download Instagram reel. Please try again." };
  }
}

export async function downloadYoutubeReel(url: string) {
  try {
    const response = await fetch(
      `${backendBaseUrl}/download?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) throw new Error("Download failed");

    return {
      downloadUrl: `${backendBaseUrl}/download?url=${encodeURIComponent(url)}`,
      filename: generateRandomFilename("mp4"),
      fileType: "mp4",
    };
  } catch (error) {
    console.error("YouTube download error:", error);
    return { error: "Failed to download YouTube video. Please try again." };
  }
}

export async function downloadFacebookReel(url: string) {
  try {
    const response = await fetch(
      `${backendBaseUrl}/download?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) throw new Error("Download failed");

    return {
      downloadUrl: `${backendBaseUrl}/download?url=${encodeURIComponent(url)}`,
      filename: generateRandomFilename("mp4"),
      fileType: "mp4",
    };
  } catch (error) {
    console.error("Facebook download error:", error);
    return { error: "Failed to download Facebook reel. Please try again." };
  }
}
