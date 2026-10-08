"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FileText,
  FolderTree,
  ExternalLink,
  Star,
  GitFork,
  Copy,
  Check,
  Terminal,
  Loader2,
  Folder,
  FileCode,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface RepoModalProps {
  repoName: string | null;
  isOpen: boolean;
  onClose: () => void;
  stars?: number;
  forks?: number;
  language?: string;
  description?: string;
  url?: string;
}

type RepoDetails = {
  name: string;
  readme: string;
  tree: string;
  url: string;
};

export function RepoModal({
  repoName,
  isOpen,
  onClose,
  stars = 0,
  forks = 0,
  language = "Code",
  description = "",
  url = "",
}: RepoModalProps) {
  const [activeTab, setActiveTab] = useState<"readme" | "tree" | "clone">("readme");
  const [data, setData] = useState<RepoDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedTree, setCopiedTree] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedReadme, setCopiedReadme] = useState(false);

  useEffect(() => {
    if (!isOpen || !repoName) {
      setData(null);
      return;
    }

    setLoading(true);
    setActiveTab("readme");

    fetch(`/api/github/repo?name=${encodeURIComponent(repoName)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((details) => {
        setData(details);
        setLoading(false);
      })
      .catch(() => {
        setData({
          name: repoName,
          readme: `# ${repoName}\n\n${description || "Public repository on Subhan Kashif's GitHub."}\n\n- Primary Language: **${language}**\n- Repository URL: [https://github.com/Subhan696/${repoName}](https://github.com/Subhan696/${repoName})`,
          tree: `├── src\n│   └── index.ts\n├── package.json\n└── README.md`,
          url: url || `https://github.com/Subhan696/${repoName}`,
        });
        setLoading(false);
      });
  }, [isOpen, repoName, description, language, url]);

  const copyToClipboard = (text: string, type: "tree" | "clone" | "readme") => {
    navigator.clipboard.writeText(text);
    if (type === "tree") {
      setCopiedTree(true);
      setTimeout(() => setCopiedTree(false), 2000);
      toast.success("Folder structure copied to clipboard!");
    } else if (type === "clone") {
      setCopiedClone(true);
      setTimeout(() => setCopiedClone(false), 2000);
      toast.success("Clone command copied!");
    } else {
      setCopiedReadme(true);
      setTimeout(() => setCopiedReadme(false), 2000);
      toast.success("README raw text copied!");
    }
  };

  const cloneCmd = `git clone https://github.com/Subhan696/${repoName}.git`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[94vw] sm:w-[90vw] md:w-[85vw] lg:max-w-4xl max-h-[88vh] flex flex-col p-0 overflow-hidden bg-[#0A0D14] border border-white/10 text-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] bg-gradient-to-r from-white/[0.03] to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                <span className="font-mono text-xs text-sky-400 font-medium px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
                  Subhan696
                </span>
                <span className="text-white/30 text-xs">/</span>
                <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight text-white font-mono">
                  {repoName}
                </DialogTitle>
                {language && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white/60 bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                    {language}
                  </span>
                )}
              </div>
              <DialogDescription className="text-xs sm:text-sm text-white/60 line-clamp-2 max-w-xl">
                {description || "Explore project architecture, README, and repository folder tree."}
              </DialogDescription>
            </div>

            {/* Quick Stats & External Link */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-white/70">
                <span className="flex items-center gap-1 text-amber-300">
                  <Star className="h-3 w-3 fill-amber-300" />
                  {stars}
                </span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-1 text-white/60">
                  <GitFork className="h-3 w-3" />
                  {forks}
                </span>
              </div>
              <a
                href={data?.url || `https://github.com/Subhan696/${repoName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-medium transition-all"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 mt-5 border-b border-white/[0.06] -mb-5 sm:-mb-6 pt-1">
            <button
              onClick={() => setActiveTab("readme")}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-all border-b-2 ${
                activeTab === "readme"
                  ? "border-sky-400 text-sky-300 bg-sky-400/5"
                  : "border-transparent text-white/60 hover:text-white"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>README.md</span>
            </button>
            <button
              onClick={() => setActiveTab("tree")}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-all border-b-2 ${
                activeTab === "tree"
                  ? "border-sky-400 text-sky-300 bg-sky-400/5"
                  : "border-transparent text-white/60 hover:text-white"
              }`}
            >
              <FolderTree className="h-3.5 w-3.5" />
              <span>Folder Structure</span>
            </button>
            <button
              onClick={() => setActiveTab("clone")}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-all border-b-2 ${
                activeTab === "clone"
                  ? "border-sky-400 text-sky-300 bg-sky-400/5"
                  : "border-transparent text-white/60 hover:text-white"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Clone & Specs</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#080B10]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-white/50">
              <Loader2 className="h-7 w-7 animate-spin text-sky-400" />
              <p className="text-xs font-mono">Fetching repository contents & README...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: README.md */}
              {activeTab === "readme" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                      <FileCode className="h-4 w-4 text-sky-400" />
                      <span>README.md</span>
                    </div>
                    {data?.readme && (
                      <button
                        onClick={() => copyToClipboard(data.readme, "readme")}
                        className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-md border border-white/10 transition-colors"
                      >
                        {copiedReadme ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Markdown</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="prose prose-invert max-w-none text-white/80 text-xs sm:text-sm font-sans leading-relaxed">
                    <SimpleMarkdown text={data?.readme || "No README available."} />
                  </div>
                </div>
              )}

              {/* TAB 2: Folder Structure Tree */}
              {activeTab === "tree" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                      <Folder className="h-4 w-4 text-amber-400" />
                      <span>Project Directory Architecture</span>
                    </div>
                    {data?.tree && (
                      <button
                        onClick={() => copyToClipboard(data.tree, "tree")}
                        className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-md border border-white/10 transition-colors"
                      >
                        {copiedTree ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied Tree</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Structure</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Terminal / Code Viewer */}
                  <div className="rounded-xl border border-white/10 bg-[#05070A] p-4 sm:p-5 overflow-x-auto shadow-inner">
                    <pre className="font-mono text-xs sm:text-sm leading-relaxed text-sky-200/90 whitespace-pre">
                      {data?.tree ? formatTreeColors(data.tree) : "Tree data loading..."}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 3: Clone & Quick Specs */}
              {activeTab === "clone" && (
                <div className="space-y-6">
                  {/* Git Clone Box */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                      Clone Repository
                    </h4>
                    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-white/10 bg-[#05070A] font-mono text-xs">
                      <div className="flex items-center gap-2 overflow-x-auto text-emerald-300">
                        <Terminal className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <code>{cloneCmd}</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(cloneCmd, "clone")}
                        className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors"
                      >
                        {copiedClone ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Specs Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                      <span className="text-xs text-white/40 block mb-1">Primary Language</span>
                      <span className="text-sm font-semibold font-mono text-sky-300">
                        {language}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                      <span className="text-xs text-white/40 block mb-1">GitHub Stars</span>
                      <span className="text-sm font-semibold font-mono text-amber-300">
                        {stars} Stars
                      </span>
                    </div>
                    <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                      <span className="text-xs text-white/40 block mb-1">Repository Owner</span>
                      <span className="text-sm font-semibold font-mono text-white/90">
                        Subhan Kashif (@Subhan696)
                      </span>
                    </div>
                    <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                      <span className="text-xs text-white/40 block mb-1">Direct Link</span>
                      <a
                        href={data?.url || `https://github.com/Subhan696/${repoName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-mono mt-0.5 truncate"
                      >
                        github.com/Subhan696/{repoName}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Lightweight Markdown Renderer tailored for READMEs
function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  lines.forEach((line, index) => {
    // Code block toggle
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // closing code block
        elements.push(
          <div
            key={`code-${index}`}
            className="my-3 rounded-xl border border-white/10 bg-[#040608] p-3.5 font-mono text-xs text-sky-200/90 overflow-x-auto shadow-inner"
          >
            <pre>{codeBuffer.join("\n")}</pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={index} className="text-xl sm:text-2xl font-bold text-white mt-5 mb-2 font-display">
          {line.replace("# ", "")}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="text-base sm:text-lg font-bold text-sky-300 mt-4 mb-2 border-b border-white/10 pb-1">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="text-sm sm:text-base font-semibold text-white/90 mt-3 mb-1">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={index} className="ml-5 list-disc text-white/75 my-0.5 text-xs sm:text-sm">
          {renderInline(line.replace(/^[-*]\s+/, ""))}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={index} className="h-2" />);
    } else {
      elements.push(
        <p key={index} className="text-white/75 leading-relaxed my-1.5 text-xs sm:text-sm">
          {renderInline(line)}
        </p>
      );
    }
  });

  return <div>{elements}</div>;
}

// Format inline markdown (bold, links, code)
function renderInline(text: string): React.ReactNode {
  // Simple regex parser for bold, inline code, and links
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    // Check inline code `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={keyIdx++} className="px-1.5 py-0.5 rounded bg-white/[0.08] text-sky-300 font-mono text-[11px]">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Check bold **bold**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={keyIdx++} className="font-semibold text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Check link [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={keyIdx++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:underline inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Regular char
    const nextSpecial = remaining.search(/[`*[]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return <>{parts}</>;
}

function formatTreeColors(tree: string): string {
  return tree;
}
