import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Only registering the languages actually likely to show up in a backend-engineer's
// posts — keeps the highlighter's bundle small instead of pulling in Prism's full
// language set (100+ languages) for ones that will never be used.
SyntaxHighlighter.registerLanguage('java', java)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('sql', sql)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('html', markup)
SyntaxHighlighter.registerLanguage('css', css)

const customStyle = {
  background: 'var(--bg-soft)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '16px',
  fontSize: '13.5px',
  margin: 0,
}

export default function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : null
  const code = String(children).replace(/\n$/, '')

  // Inline code (no language, no newline) — render plain, not as a block
  if (!language && !code.includes('\n')) {
    return <code className="inline-code">{code}</code>
  }

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="code-block-wrapper">
      <button className="code-copy-btn" onClick={handleCopy} type="button">
        {copied ? 'Copied' : 'Copy'}
      </button>
      <SyntaxHighlighter language={language || 'text'} style={vscDarkPlus} customStyle={customStyle}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
