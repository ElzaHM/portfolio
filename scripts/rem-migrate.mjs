/**
 * Converts layout px → rem assuming 14.4px root and 80% density: rem = px / 18
 * Preserves @media / @supports (...) preludes (max-width:, min-width:, etc.).
 * Leaves full pill radii at 999px unchanged.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const files = [
  '../src/pages/HomePage/styles.module.css',
  '../src/components/HeroSection/styles.module.css',
  '../src/pages/AboutPage/styles.module.css',
  '../src/pages/ContactPage/styles.module.css',
  '../src/pages/ChatAssistantPage/styles.module.css',
  '../src/components/Chat/Chat.module.css',
]

function extractMediaBlocks(css) {
  /** @type {string[]} */
  const blocks = []
  let out = ''
  let i = 0
  while (i < css.length) {
    if (css.startsWith('@media', i) || css.startsWith('@supports', i)) {
      let depth = 0
      let j = css.indexOf('{', i)
      if (j < 0) {
        out += css[i++]
        continue
      }
      depth = 1
      j++
      while (j < css.length && depth > 0) {
        if (css[j] === '{') depth++
        else if (css[j] === '}') depth--
        j++
      }
      blocks.push(css.slice(i, j))
      out += `\n@@@RULE_BLOCK_${blocks.length - 1}@@@\n`
      i = j
    } else {
      out += css[i++]
    }
  }
  return { body: out, blocks }
}

function restoreRuleBlocks(css, blocks) {
  let s = css
  for (let idx = blocks.length - 1; idx >= 0; idx--) {
    s = s.replace(`@@@RULE_BLOCK_${idx}@@@`, blocks[idx])
  }
  return s
}

function pxToRem(str) {
  return str.replace(/(\d+(?:\.\d+)?)\s*px/g, (m, numStr) => {
    const n = parseFloat(numStr)
    /** Full-round pill token (do not shrink) */
    if (n === 999) return m
    if (Number.isNaN(n)) return m
    const rem = n / 18
    const r = Math.round(rem * 10000) / 10000
    return `${String(r).replace(/\.?0+$/, '')}rem`
  })
}

/** @param {string} block — full `@media...{...}` / `@supports...{...}` span */
function convertRuleBlockFully(block) {
  const braceIdx = block.indexOf('{')
  if (braceIdx < 0) return pxToRem(block)
  const prelude = block.slice(0, braceIdx + 1)
  let depth = 1
  let i = braceIdx + 1
  while (i < block.length && depth > 0) {
    if (block[i] === '{') depth++
    else if (block[i] === '}') depth--
    i++
  }
  const inner = block.slice(braceIdx + 1, i - 1)
  const tail = block.slice(i)
  /* prelude includes opening `{`; `inner` excludes both braces; omitting `}` duplicated the truncation bug */
  return prelude + processCss(inner) + '}' + tail
}

/** Recursively convert px everywhere except inside `(...)` preludes of nested at-rules */
function processCss(css) {
  const { body, blocks } = extractMediaBlocks(css)
  const convertedBody = pxToRem(body)
  const convertedBlocks = blocks.map(convertRuleBlockFully)
  return restoreRuleBlocks(convertedBody, convertedBlocks)
}

function processFile(rel) {
  const abs = path.resolve(__dirname, rel)
  let raw = fs.readFileSync(abs, 'utf8')
  fs.writeFileSync(abs, processCss(raw), 'utf8')
  console.log('OK:', abs)
}

for (const f of files) {
  processFile(f)
}
