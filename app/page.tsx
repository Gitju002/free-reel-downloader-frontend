import { Download } from "lucide-react";
import DownloadForm from "@/components/download-form";
import InstallButton from "@/components/install-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-24">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Reel Downloader</h1>
          <p className="text-muted-foreground">
            Download reels from Instagram, YouTube, and Facebook in one click
          </p>
          <div className="flex items-center justify-center mt-4 p-2 bg-muted rounded-full">
            <Download className="w-5 h-5 mr-2" />
            <span className="text-sm">
              Share directly from apps or paste URL
            </span>
          </div>
        </div>
        <InstallButton />
        <DownloadForm />
      </div>
    </main>
  );
}
