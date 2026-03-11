'use client'

import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import type { Components } from 'react-markdown'
import { slugHash } from '@/lib/slugHash'

interface HNode {
  type: string
  value?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HNode[]
}

// Rehype plugin: adds id to h1–h6 based on hash of text content
function rehypeHeadingIds() {
  function getText(node: HNode): string {
    if (node.type === 'text') return node.value ?? ''
    return (node.children ?? []).map(getText).join('')
  }
  function walk(node: HNode) {
    if (node.type === 'element' && /^h[1-6]$/.test(node.tagName ?? '')) {
      const id = slugHash(getText(node))
      if (id) node.properties = { ...node.properties, id }
    }
    ;(node.children ?? []).forEach(walk)
  }
  return (tree: HNode) => walk(tree)
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? ''
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative mt-4 group/codeblock">
      <pre ref={preRef} className="overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm leading-relaxed">
        {children}
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2 right-2 opacity-0 group-hover/codeblock:opacity-100 transition-opacity size-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground touch-manipulation"
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        )}
      </button>
    </div>
  )
}

const components: Components = {
  h1: ({ children, id }) => (
    <h1 id={id} className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-foreground">{children}</h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4 id={id} className="mt-6 scroll-m-20 text-base font-semibold tracking-tight text-foreground">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="leading-7 text-foreground/90 [&:not(:first-child)]:mt-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 ml-6 list-disc space-y-1.5 text-foreground/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 ml-6 list-decimal space-y-1.5 text-foreground/90">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-2 border-border pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) return <code className={className}>{children}</code>
    return (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground">
        {children}
      </code>
    )
  },
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-border px-4 py-2.5 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-4 py-2.5 text-muted-foreground last:border-0">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="transition-colors hover:bg-muted/30">{children}</tr>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
}

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="prose-doc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHeadingIds, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
