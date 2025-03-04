import { FOOTER_MESSAGE } from "@/configuration/ui";
import Link from "next/link";

export default function ChatFooter() {
  return (
    <div className="w-full text-xs flex py-3 px-5 border-t transition-all duration-300 
      bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700">
      <div className="flex-grow text-left">
        {/* Left Pane - Terms of Service Link */}
        <Link href="/terms" className="hover:underline dark:hover:text-white">
          Terms of Service
        </Link>
      </div>
      <div className="flex-grow text-center">
        {/* Center Pane - Footer Message */}
        {FOOTER_MESSAGE}
      </div>
      <div className="flex-grow text-right">
        {/* Right Pane */}
        {/* Do not remove or modify the following message. Removal or modification violates the license agreement. */}
        <a
          href="http://www.ringel.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline dark:hover:text-white"
        >
          powered by ringel.AI
        </a>
      </div>
    </div>
  );
}
