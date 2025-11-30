import { useEffect, useState } from "react";
import { DiVim } from "react-icons/di";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownViewerProps {
  url: string;
}

export default function MarkdownViewer({ url }: MarkdownViewerProps) {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Derive base URL for relative image paths
  // Assumes url is like "https://raw.githubusercontent.com/user/repo/main/README.md"
  // Base URL will be "https://raw.githubusercontent.com/user/repo/main/"
  const baseUrl = url.substring(0, url.lastIndexOf("/") + 1);

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch markdown");
        }
        const content = await res.text();
        setText(content);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    if (url) {
      fetchMarkdown();
    }
  }, [url]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!text) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[white] border-t-[white] rounded-full animate-spin"></div>
          <p className="text-[white] text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prose prose-invert prose-sm md:prose-base w-full max-w-full min-w-0 p-4 md:p-6 2xl:p-8">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ node, ...props }) => {
            let src = props.src;
            if (src && !src.startsWith("http")) {
              src = `${baseUrl}${src}`;
            }
            const isGif = src?.toLowerCase().endsWith('.gif');
            return (
              <img
                src={src}
                className={`max-w-full h-auto rounded-lg shadow-md block ${isGif ? 'w-[50%] sm:w-[30%] lg:w-[30%] object-contain' : ''}`}
                alt={props.alt}
                title={props.alt}
                loading="lazy"

              />
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
