#!/usr/bin/env bun
/**
 * Content management CLI for Nknsblog.
 *
 * Usage (via npm scripts):
 *   bun new  note  <notebook>        Create a new notebook
 *   bun new  post  <postname>        Create a new blog post
 *   bun chapter  <notebook> <chapter>    Add a chapter to a notebook
 *
 * Direct invocation:
 *   bun scripts/content.ts new  note  <notebook>
 *   bun scripts/content.ts new  post  <postname>
 *   bun scripts/content.ts chapter  <notebook> <chapter>
 */

import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

// ── Paths ──────────────────────────────────────────────────────────────────
const ROOT = resolve(import.meta.dirname, '..')
const NOTES_DIR = join(ROOT, 'src', 'content', 'notes')
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog')

// ── Helpers ────────────────────────────────────────────────────────────────

/** Generate an ISO-ish timestamp string: "YYYY-MM-DD HH:MM:SS" */
function now(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

/** Sanitise a user-provided name into a filename-safe slug (preserves spaces). */
function sanitiseFilename(raw: string): string {
  return raw.replace(/[/\\?%*:|"<>]/g, '-').trim()
}

/** Convert a name to Title Case. */
function titleCase(raw: string): string {
  return raw
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Count existing markdown files in a directory to infer the next order number. */
function nextOrder(dir: string): number {
  if (!existsSync(dir)) return 1
  const files = readdirSync(dir).filter((f) => /\.(md|mdx)$/i.test(f))
  return files.length + 1
}

/** Craft frontmatter string from a key-value record. */
function frontmatter(fields: Record<string, unknown>): string {
  const lines = ['---']
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue
    if (Array.isArray(value)) {
      if (value.length === 0) continue // skip empty arrays
      lines.push(`${key}:`)
      for (const item of value) lines.push(`  - ${item}`)
    } else if (typeof value === 'string') {
      if (value === '') continue // skip empty strings
      // Quote strings that contain special YAML chars
      const needsQuotes = /[:{;}#&*!|>'"]/.test(value) || value.includes('\n')
      lines.push(needsQuotes ? `${key}: '${value}'` : `${key}: ${value}`)
    } else {
      lines.push(`${key}: ${value}`)
    }
  }
  lines.push('---', '', '')
  return lines.join('\n')
}

// ── Commands ───────────────────────────────────────────────────────────────

function cmdNewNote(notebook: string) {
  if (!notebook) {
    console.error('Usage: bun new note <notebook-name>')
    process.exit(1)
  }

  const dir = join(NOTES_DIR, notebook)
  if (existsSync(dir)) {
    console.error(`❌ Notebook "${notebook}" already exists at ${dir}`)
    process.exit(1)
  }

  mkdirSync(dir, { recursive: true })

  // Create a default intro chapter so the notebook isn't empty
  const filename = 'intro.md'
  const filepath = join(dir, filename)
  const fm = frontmatter({
    title: `${titleCase(notebook)} — Intro`,
    description: `Introduction to ${titleCase(notebook)}`,
    publishDate: now(),
    tags: ['Learn'],
    language: '中文',
    order: 1,
  })
  writeFileSync(filepath, fm + `# Intro\n\nGetting started with ${titleCase(notebook)}.\n`)
  console.log(`✅ Created notebook  "${notebook}"`)
  console.log(`   📁 ${join('src/content/notes', notebook, filename)}`)
}

function cmdAddChapter(notebook: string, chapter: string) {
  if (!notebook || !chapter) {
    console.error('Usage: bun chapter <notebook> <chapter-name>')
    process.exit(1)
  }

  const dir = join(NOTES_DIR, notebook)
  if (!existsSync(dir)) {
    console.error(`❌ Notebook "${notebook}" does not exist. Create it first with: bun new note ${notebook}`)
    process.exit(1)
  }

  const filename = sanitiseFilename(chapter).endsWith('.md')
    ? sanitiseFilename(chapter)
    : sanitiseFilename(chapter) + '.md'

  const filepath = join(dir, filename)
  if (existsSync(filepath)) {
    console.error(`❌ Chapter "${filename}" already exists in "${notebook}"`)
    process.exit(1)
  }

  const order = nextOrder(dir)
  const title = titleCase(chapter.replace(/\.(md|mdx)$/i, ''))
  const fm = frontmatter({
    title,
    description: `${title}`,
    publishDate: now(),
    tags: ['Code', 'Learn'],
    language: '中文',
    order,
  })
  writeFileSync(filepath, fm + `# ${title}\n\n`)
  console.log(`✅ Added chapter "${title}" to notebook "${notebook}"`)
  console.log(`   📄 ${join('src/content/notes', notebook, filename)}  (order: ${order})`)
}

function cmdNewPost(postname: string) {
  if (!postname) {
    console.error('Usage: bun new post <post-name>')
    process.exit(1)
  }

  const filename = sanitiseFilename(postname).endsWith('.md')
    ? sanitiseFilename(postname)
    : sanitiseFilename(postname) + '.md'

  const filepath = join(BLOG_DIR, filename)
  if (existsSync(filepath)) {
    console.error(`❌ Post "${filename}" already exists`)
    process.exit(1)
  }

  const title = titleCase(postname.replace(/\.(md|mdx)$/i, ''))
  const fm = frontmatter({
    title,
    description: '',
    publishDate: now(),
    tags: [],
    language: '中文',
  })
  writeFileSync(filepath, fm + `# ${title}\n\n`)
  console.log(`✅ Created post "${title}"`)
  console.log(`   📝 ${join('src/content/blog', filename)}`)
}

function showHelp() {
  console.log(`
  Content management CLI for Nknsblog

  Usage:
    bun new  note  <notebook>        Create a new notebook
    bun new  post  <postname>        Create a new blog post
    bun chapter  <notebook> <chapter>    Add a chapter to a notebook

  Examples:
    bun new note dm
    bun new post my-awesome-post
    bun chapter dm "Set Theory"
  `)
}

// ── Main ───────────────────────────────────────────────────────────────────

const args = process.argv.slice(2) // strip "bun" and script path
const [cmd, sub, ...rest] = args

switch (cmd) {
  case 'new': {
    if (sub === 'note') cmdNewNote(rest[0])
    else if (sub === 'post') cmdNewPost(rest[0])
    else showHelp()
    break
  }
  case 'chapter': {
    cmdAddChapter(sub, rest.join(' ')) // sub = notebook, rest joined = chapter name
    break
  }
  default:
    showHelp()
}
