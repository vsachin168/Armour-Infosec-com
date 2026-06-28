/**
 * Build-time generator: emits a print-ready A4 "Cybersecurity Roadmap"
 * into public/Cybersecurity-Roadmap.pdf — the curated learning path
 * (Foundation → Core → Specializations → CISE) with every course's full
 * module list. For student handouts, counselling, and print distribution.
 *
 * Theme: clean light palette (white background, ink body, blue accent),
 * matching the website and the other PDFs. Curation comes from
 * src/data/roadmap.ts; module content from src/data/training.ts.
 * Run via `npm run build:roadmap` or automatically via `prebuild`.
 */
import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import { trainingData } from '../src/data/training'
import { ROADMAP_TIERS, ROADMAP_CAPSTONE, type RoadmapCourse } from '../src/data/roadmap'

const REPO = path.resolve(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), '..')
const OUT_PATH = path.join(REPO, 'public', 'Cybersecurity-Roadmap.pdf')
const LOGO_PATH = path.join(REPO, 'public', 'logo', 'armour-infosec-red-black.png')

const BRAND = 'Armour Infosec'
const WEBSITE = 'armourinfosec.com'

// Clean professional palette (matches the redesigned website + other PDFs)
const BG = '#ffffff'
const PANEL = '#f5f8ff'
const ACCENT = '#2f6bff'
const INK = '#0b1220'
const SOFT = '#5b6678'
const HAIR = '#e6e9f0'

const PAGE = {
  size: 'A4' as const,
  // The bottom margin reserves the footer band so auto-flowing module
  // paragraphs paginate above it (pdfkit breaks flowing text at the
  // bottom margin, not at any manually-reserved zone).
  margins: { top: 56, bottom: 50, left: 56, right: 56 },
}

type Doc = InstanceType<typeof PDFDocument>

const contentWidth = (doc: Doc) => doc.page.width - doc.page.margins.left - doc.page.margins.right
const contentBottom = (doc: Doc) => doc.page.height - doc.page.margins.bottom
const ensureSpace = (doc: Doc, min: number) => {
  if (doc.y + min > contentBottom(doc)) doc.addPage()
}

function paintPageBackground(doc: Doc) {
  doc.save()
  doc.fillColor(BG).rect(0, 0, doc.page.width, doc.page.height).fill()
  doc.fillColor(ACCENT).rect(0, 0, doc.page.width, 3).fill()
  doc.restore()
}

// CSS vars (e.g. var(--color-accent)) can't be used in PDF — fall back to accent.
const resolveColor = (c: string) => (c.startsWith('var(') ? ACCENT : c)
const fmtLevel = (level: string) => level.replace(/\s+to\s+/i, ' to ')

type Resolved = { name: string; color: string; level: string; count: number; modules: string[] }

function resolveCourse(c: RoadmapCourse): Resolved {
  if (c.key && trainingData[c.key]) {
    const d = trainingData[c.key]
    return { name: c.name, color: resolveColor(c.color), level: fmtLevel(d.level), count: d.modules.length, modules: d.modules.map((m) => m.title) }
  }
  return { name: c.name, color: resolveColor(c.color), level: c.level ?? '', count: c.modules?.length ?? 0, modules: c.modules ?? [] }
}

const ALL_COURSES = ROADMAP_TIERS.flatMap((t) => t.courses)
const TOTAL_COURSES = ALL_COURSES.length
const TOTAL_MODULES = ALL_COURSES.reduce((n, c) => n + resolveCourse(c).count, 0)
const TOTAL_TIERS = ROADMAP_TIERS.length + 1

// ============================================================

function drawHeader(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)

  if (fs.existsSync(LOGO_PATH)) {
    try {
      doc.image(LOGO_PATH, left, 40, { height: 26 })
    } catch {
      /* ignore */
    }
  }
  doc.fillColor(SOFT).font('Helvetica').fontSize(8.5)
    .text(WEBSITE.toUpperCase(), left, 48, { width: w, align: 'right', characterSpacing: 1 })

  doc.y = 78
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(8.5)
    .text('// LEARNING PATH', left, doc.y, { width: w, characterSpacing: 1.6 })
  doc.moveDown(0.2)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(25)
    .text('Cybersecurity Roadmap', left, doc.y, { width: w, lineGap: 0 })
  doc.moveDown(0.25)
  doc.fillColor(SOFT).font('Helvetica').fontSize(10)
    .text(
      'Foundation to Core Offensive Security to Specializations, converging on the CISE expert program.',
      left, doc.y, { width: w, lineGap: 2 },
    )
  doc.moveDown(0.35)
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(9)
    .text(
      `${TOTAL_COURSES} COURSES     ·     ${TOTAL_MODULES} MODULES     ·     ${TOTAL_TIERS} TIERS     ·     18 MONTHS (CISE)`,
      left, doc.y, { width: w, characterSpacing: 0.5 },
    )
  doc.moveDown(0.8)
}

// ---------- visual roadmap map (mirrors the website layout) ----------

function drawMapPill(doc: Doc, cx: number, y: number, h: number, id: string, label: string, accent: string) {
  const text = `${id}     ${label}`
  doc.font('Helvetica-Bold').fontSize(10)
  const pw = doc.widthOfString(text) + 30
  const x = cx - pw / 2
  doc.save()
  doc.fillColor(accent).roundedRect(x, y, pw, h, h / 2).fill()
  doc.restore()
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(10)
    .text(text, x, y + h / 2 - 5, { width: pw, align: 'center', lineBreak: false })
}

function drawMapNode(doc: Doc, x: number, y: number, w: number, h: number, c: Resolved, cx: number) {
  doc.save()
  doc.fillColor('#ffffff').roundedRect(x, y, w, h, 6).fill()
  doc.strokeColor(HAIR).lineWidth(0.75).roundedRect(x, y, w, h, 6).stroke()
  doc.restore()
  doc.save()
  doc.fillColor(c.color).roundedRect(x, y, 3.5, h, 1.5).fill()
  doc.restore()
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(7.8)
    .text(c.name, x + 9, y + 5, { width: w - 16, height: 18, lineGap: 0, ellipsis: true })
  const meta = `${c.level ? c.level.toUpperCase() + '  ·  ' : ''}${c.count} MODULES`
  doc.fillColor(c.color).font('Helvetica-Bold').fontSize(6)
    .text(meta, x + 9, y + h - 11, { width: w - 16, lineBreak: false, characterSpacing: 0.3 })
  // dot on the spine
  const midY = y + h / 2
  doc.save()
  doc.fillColor('#ffffff').circle(cx, midY, 5).fill()
  doc.fillColor(c.color).circle(cx, midY, 3.1).fill()
  doc.restore()
}

function drawMapCapstone(doc: Doc, cx: number, y: number, h: number) {
  const w = 332
  const x = cx - w / 2
  doc.save()
  doc.fillColor(ACCENT).roundedRect(x, y, w, h, 8).fill()
  doc.restore()
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7)
    .text('// CISE', x, y + 8, { width: w, align: 'center', characterSpacing: 1.5 })
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(11)
    .text('Certified Information Security Expert', x + 10, y + 19, { width: w - 20, align: 'center', lineBreak: false })
  doc.fillColor('#ffffff').font('Helvetica').fontSize(7.5)
    .text(`all ${TOTAL_COURSES} courses  ·  ${TOTAL_MODULES} modules`, x, y + 35, { width: w, align: 'center' })
}

function drawMap(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  const cx = left + w / 2
  const NODE_W = 214
  const NODE_H = 32
  const GAP = 4
  const PILL_H = 22
  const PILL_GAP = 6
  const CONN = 24
  const CAP_H = 44

  type El =
    | { kind: 'pill'; y: number; id: string; label: string; accent: string }
    | { kind: 'node'; y: number; side: 'left' | 'right'; c: Resolved }
    | { kind: 'core'; y: number; c: Resolved }
    | { kind: 'capstone'; y: number }
  const els: El[] = []
  let y = doc.y

  for (const tier of ROADMAP_TIERS) {
    els.push({ kind: 'pill', y, id: tier.id, label: tier.label, accent: tier.accent })
    y += PILL_H + PILL_GAP
    if (tier.core) {
      els.push({ kind: 'core', y, c: resolveCourse(tier.courses[0]) })
      y += NODE_H + GAP
    } else {
      for (const c of tier.courses) {
        els.push({ kind: 'node', y, side: c.side ?? 'left', c: resolveCourse(c) })
        y += NODE_H + GAP
      }
    }
    y += 2
  }
  els.push({ kind: 'pill', y, id: '04', label: 'Capstone', accent: '#d97706' })
  y += PILL_H + PILL_GAP
  els.push({ kind: 'capstone', y })
  y += CAP_H

  // spine behind everything
  doc.save()
  doc.dash(2.5, { space: 2.5 })
  doc.strokeColor(ACCENT).strokeOpacity(0.45).lineWidth(2)
    .moveTo(cx, els[0].y).lineTo(cx, y - CAP_H / 2).stroke()
  doc.undash()
  doc.restore()

  for (const el of els) {
    if (el.kind === 'pill') {
      drawMapPill(doc, cx, el.y, PILL_H, el.id, el.label, el.accent)
    } else if (el.kind === 'core') {
      drawMapNode(doc, cx - NODE_W / 2, el.y, NODE_W, NODE_H, el.c, cx)
    } else if (el.kind === 'node') {
      const x = el.side === 'left' ? cx - CONN - NODE_W : cx + CONN
      const midY = el.y + NODE_H / 2
      doc.save()
      doc.strokeColor(HAIR).lineWidth(1)
        .moveTo(el.side === 'left' ? cx - CONN : cx + CONN, midY).lineTo(cx, midY).stroke()
      doc.restore()
      drawMapNode(doc, x, el.y, NODE_W, NODE_H, el.c, cx)
    } else {
      drawMapCapstone(doc, cx, el.y, CAP_H)
    }
  }
  doc.y = y + 6
}

function drawTierBand(doc: Doc, id: string, label: string, accent: string, sub: string) {
  ensureSpace(doc, 60)
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  const y = doc.y
  const h = 30
  doc.save()
  doc.fillColor(accent).roundedRect(left, y, w, h, 7).fill()
  doc.restore()
  doc.fillColor('#ffffff').fillOpacity(0.85).font('Helvetica-Bold').fontSize(13)
    .text(id, left + 14, y + 8.5, { width: 30, lineBreak: false })
  doc.fillOpacity(1).fillColor('#ffffff').font('Helvetica-Bold').fontSize(13)
    .text(label, left + 42, y + 8.5, { width: w - 200, lineBreak: false })
  doc.fillColor('#ffffff').fillOpacity(0.85).font('Helvetica').fontSize(9)
    .text(sub, left + 42, y + 8.5, { width: w - 56, align: 'right', lineBreak: false })
  doc.fillOpacity(1)
  doc.y = y + h + 12
}

// ----- numbered module mini-roadmap (mirrors the website drill-down) -----
const CHIP_H = 19
const CHIP_NUM_D = 13
const CHIP_PAD_L = 6
const CHIP_NUM_GAP = 5
const CHIP_PAD_R = 10
const CHIP_FONT = 8.3
const CHIP_ROW_GAP = 7
const CHEV_W = 12

/**
 * Lay numbered module chips left-to-right, wrapping rows, joined by chevrons.
 * When `draw` is false it only simulates to measure height. Returns the y at
 * the bottom of the last row.
 */
function flowChips(doc: Doc, modules: string[], startX: number, rightEdge: number, startY: number, color: string, draw: boolean): number {
  const maxRowW = rightEdge - startX
  const overhead = CHIP_PAD_L + CHIP_NUM_D + CHIP_NUM_GAP + CHIP_PAD_R
  let x = startX
  let y = startY
  for (let i = 0; i < modules.length; i++) {
    const title = modules[i]
    doc.font('Helvetica').fontSize(CHIP_FONT)
    let textW = doc.widthOfString(title) + 2
    let capped = false
    let chipW = overhead + textW
    if (chipW > maxRowW) {
      chipW = maxRowW
      textW = maxRowW - overhead
      capped = true
    }
    const needChevron = x > startX
    if (x + (needChevron ? CHEV_W : 0) + chipW > rightEdge + 0.5) {
      x = startX
      y += CHIP_H + CHIP_ROW_GAP
    }
    if (x > startX) {
      if (draw) {
        doc.fillColor(SOFT).font('Helvetica-Bold').fontSize(10)
          .text('›', x, y + CHIP_H / 2 - 6, { width: CHEV_W, align: 'center', lineBreak: false })
      }
      x += CHEV_W
    }
    if (draw) {
      doc.save()
      doc.fillColor('#ffffff').roundedRect(x, y, chipW, CHIP_H, 5).fill()
      doc.strokeColor(HAIR).lineWidth(0.6).roundedRect(x, y, chipW, CHIP_H, 5).stroke()
      doc.restore()
      const ncx = x + CHIP_PAD_L + CHIP_NUM_D / 2
      const ncy = y + CHIP_H / 2
      doc.save()
      doc.fillColor(color).circle(ncx, ncy, CHIP_NUM_D / 2).fill()
      doc.restore()
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(6.8)
        .text(String(i + 1), x + CHIP_PAD_L, y + CHIP_H / 2 - 3.4, { width: CHIP_NUM_D, align: 'center', lineBreak: false })
      doc.fillColor(INK).font('Helvetica').fontSize(CHIP_FONT)
        .text(title, x + CHIP_PAD_L + CHIP_NUM_D + CHIP_NUM_GAP, y + CHIP_H / 2 - 4.3, { width: textW, height: CHIP_H, lineBreak: false, ellipsis: capped })
    }
    x += chipW
  }
  return y + CHIP_H
}

function drawCourse(doc: Doc, r: Resolved, index?: number) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  const textX = left + 14
  const barX = left
  const numPrefix = index != null ? `${index}. ` : ''
  const meta = [r.level, `${r.count} modules`].filter(Boolean).join('  ·  ')

  // Measure the full block so it never splits across a page (which would
  // mis-place the coloured left bar). Page-break before it if it won't fit.
  doc.font('Helvetica-Bold').fontSize(12)
  const titleH = doc.heightOfString(`${numPrefix}${r.name}`, { width: w - 14, lineGap: 1 })
  const chipsH = r.modules.length ? flowChips(doc, r.modules, textX, left + w, 0, r.color, false) : 0
  const blockH = titleH + 15 + chipsH + 8
  ensureSpace(doc, blockH)

  const startY = doc.y

  // title
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(12)
    .text(`${numPrefix}${r.name}`, textX, startY, { width: w - 14, lineGap: 1 })
  // meta line
  doc.fillColor(r.color).font('Helvetica-Bold').fontSize(8.5)
    .text(meta.toUpperCase(), textX, doc.y + 1, { width: w - 14, characterSpacing: 0.6 })

  // module chips
  let endY = doc.y
  if (r.modules.length) {
    endY = flowChips(doc, r.modules, textX, left + w, doc.y + 8, r.color, true)
  }

  // coloured left bar spanning the block
  doc.save()
  doc.fillColor(r.color).roundedRect(barX, startY, 3.5, Math.max(endY - startY, 14), 2).fill()
  doc.restore()

  doc.y = endY
  doc.moveDown(1)
}

function drawCapstone(doc: Doc) {
  ensureSpace(doc, 90)
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  const r = resolveCourse(ROADMAP_CAPSTONE)
  const y = doc.y
  const h = 86
  doc.save()
  doc.fillColor(ACCENT).roundedRect(left, y, w, h, 9).fill()
  doc.restore()
  doc.fillColor('#ffffff').fillOpacity(0.85).font('Helvetica-Bold').fontSize(8.5)
    .text('// CAPSTONE · CISE', left + 18, y + 14, { width: w - 36, characterSpacing: 1.4 })
  doc.fillOpacity(1).fillColor('#ffffff').font('Helvetica-Bold').fontSize(16)
    .text('Certified Information Security Expert', left + 18, y + 28, { width: w - 36 })
  doc.fillColor('#ffffff').fillOpacity(0.9).font('Helvetica').fontSize(9.5)
    .text(
      `The complete program that unifies every track into one career-defining qualification — all ${TOTAL_COURSES} courses · ${TOTAL_MODULES} modules.`,
      left + 18, y + 50, { width: w - 36, lineGap: 2 },
    )
  doc.fillOpacity(1)
  doc.y = y + h + 10
}

function drawFooter(doc: Doc) {
  const range = doc.bufferedPageRange()
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)
    const left = doc.page.margins.left
    const w = contentWidth(doc)
    const y = doc.page.height - doc.page.margins.bottom + 16
    // Writing in the bottom-margin band would otherwise make pdfkit
    // auto-insert blank pages — neutralise the margin while drawing.
    const savedBottom = doc.page.margins.bottom
    doc.page.margins.bottom = 0
    doc.save()
    doc.strokeColor(HAIR).lineWidth(0.75).moveTo(left, y).lineTo(left + w, y).stroke()
    doc.restore()
    doc.fillColor(SOFT).font('Helvetica').fontSize(8)
      .text(`${BRAND} · ${WEBSITE}`, left, y + 7, { width: w / 2, lineBreak: false })
    doc.fillColor(SOFT).font('Helvetica').fontSize(8)
      .text(`Page ${i - range.start + 1} of ${range.count}`, left + w / 2, y + 7, { width: w / 2, align: 'right', lineBreak: false })
    doc.page.margins.bottom = savedBottom
  }
}

async function main() {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  const stream = fs.createWriteStream(OUT_PATH)
  const doc = new PDFDocument({
    size: PAGE.size,
    margins: PAGE.margins,
    bufferPages: true,
    info: {
      Title: `${BRAND} — Cybersecurity Roadmap`,
      Author: BRAND,
      Subject: 'Cybersecurity learning roadmap and full module path',
      Keywords: 'cybersecurity roadmap, ethical hacking, penetration testing, learning path, modules, CISE, Indore',
    },
  })

  paintPageBackground(doc)
  doc.on('pageAdded', () => paintPageBackground(doc))
  doc.pipe(stream)

  // Page 1 — visual roadmap map (mirrors the website)
  drawHeader(doc)
  drawMap(doc)

  // Page 2+ — full module breakdown
  doc.addPage()
  const left = doc.page.margins.left
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(8.5)
    .text('// FULL MODULE BREAKDOWN', left, doc.y, { width: contentWidth(doc), characterSpacing: 1.6 })
  doc.moveDown(0.15)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(18)
    .text('Every course, every module', left, doc.y, { width: contentWidth(doc) })
  doc.moveDown(0.7)

  ROADMAP_TIERS.forEach((tier, ti) => {
    if (ti > 0) doc.addPage() // every tier starts on a new page
    const sub = `${tier.courses.length} course${tier.courses.length > 1 ? 's' : ''}`
    drawTierBand(doc, tier.id, tier.label, tier.accent, sub)
    tier.courses.forEach((c, i) => drawCourse(doc, resolveCourse(c), tier.core ? undefined : i + 1))
  })

  doc.addPage()
  drawTierBand(doc, '04', 'Capstone', '#d97706', 'the complete program')
  drawCapstone(doc)

  drawFooter(doc)
  doc.end()

  await new Promise<void>((resolve, reject) => {
    stream.on('finish', () => resolve())
    stream.on('error', reject)
  })
  const size = (fs.statSync(OUT_PATH).size / 1024).toFixed(1)
  console.log(`Cybersecurity roadmap written to ${path.relative(REPO, OUT_PATH)} (${size} KB)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
