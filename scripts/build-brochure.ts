/**
 * Build-time generator: emits the Armour Infosec course brochure into
 * public/Course-Brochure.pdf as ONE cohesive, print-ready A4 document.
 *
 * Design system — clean light palette, shared with Cybersecurity-Roadmap.pdf:
 *   · white / soft-blue surfaces, deep-ink text
 *   · blue primary accent (#2f6bff) for chrome (eyebrows, footer, stats)
 *   · per-course rainbow accents + per-tier band colours (from the roadmap)
 *   · monospace (Courier) for labels / numbers / module chips
 *   · clean sans (Helvetica) for headings and body
 *
 * Content authority is the live Training & Roadmap pages: course names,
 * level tags, module counts and tier order all come from src/data
 * (trainingData + roadmap), so the catalogue, the roadmap and the module
 * breakdown can never disagree. Nothing here is invented.
 *
 * Sections: Cover · About+Why · Learning Roadmap (4 tiers) · Course
 * Catalogue · Full Module Breakdown · Hacker's Arsenal · Training Modes ·
 * Certifications · Get In Touch. Self-contained — no external merge.
 *
 * Run via `npm run build:brochure` or automatically via `prebuild`.
 */
import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'
import { trainingData } from '../src/data/training'
import { formatDurationShort } from '../src/components/TrainingPageTemplate'
import { ROADMAP_TIERS, ROADMAP_CAPSTONE, type RoadmapCourse, type RoadmapTier } from '../src/data/roadmap'

const REPO = path.resolve(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), '..')
const OUT_PATH = path.join(REPO, 'public', 'Course-Brochure.pdf')
const LOGO_PATH = path.join(REPO, 'public', 'logo', 'armour-infosec-red-black.png')

const BRAND = 'Armour Infosec'
const WEBSITE = 'armourinfosec.com'
const WEBSITE_URL = 'https://www.armourinfosec.com'
const TRAINING_URL = 'https://www.armourinfosec.com/training/'
const PHONE = '+91 99777 47168'
const EMAIL = 'info@armourinfosec.com'
const ADDRESS = '674, Sudama Dwar, Narendra Tiwari Marg, Sudama Nagar, Indore, Madhya Pradesh 452009'

// ----- clean light palette (matches the website + roadmap PDF) -----
const BG = '#ffffff'
const PANEL = '#f5f8ff' // soft card surface
const PANEL_HI = '#eef3ff' // raised surface / chips
const HAIR = '#e6e9f0' // hairline borders
const ACCENT = '#2f6bff' // primary blue accent (chrome)
const CAPSTONE = '#d97706' // capstone tier colour
const INK = '#0b1220' // headings / body
const SOFT = '#5b6678' // muted text
const WHITE = '#ffffff'

const PAGE = {
  size: 'A4' as const,
  // bottom margin reserves the footer band so flowing content paginates above it
  margins: { top: 54, bottom: 48, left: 54, right: 54 },
}

type Doc = InstanceType<typeof PDFDocument>

// CSS vars (e.g. var(--color-accent)) can't be used in PDF — fall back to blue.
const courseColor = (c: RoadmapCourse) => (c.color.startsWith('var(') ? ACCENT : c.color)

// ============================================================
// Layout primitives
// ============================================================

const contentWidth = (doc: Doc) => doc.page.width - doc.page.margins.left - doc.page.margins.right
const contentBottom = (doc: Doc) => doc.page.height - doc.page.margins.bottom
const ensureSpace = (doc: Doc, min: number) => {
  if (doc.y + min > contentBottom(doc)) doc.addPage()
}

function paintPageBackground(doc: Doc) {
  doc.save()
  doc.fillColor(BG).rect(0, 0, doc.page.width, doc.page.height).fill()
  doc.fillColor(ACCENT).rect(0, 0, doc.page.width, 3).fill() // blue top accent bar
  doc.restore()
}

function accentOrb(doc: Doc, x: number, y: number, r: number, opacity: number, color = ACCENT) {
  doc.save()
  doc.fillColor(color).fillOpacity(opacity).circle(x, y, r).fill()
  doc.restore()
}

function panel(
  doc: Doc,
  x: number, y: number, w: number, h: number,
  opts: { fill?: string; stroke?: string; strokeOpacity?: number; radius?: number } = {},
) {
  const r = opts.radius ?? 8
  doc.save()
  doc.fillColor(opts.fill ?? PANEL).roundedRect(x, y, w, h, r).fill()
  doc.strokeColor(opts.stroke ?? HAIR).strokeOpacity(opts.strokeOpacity ?? 1).lineWidth(0.75)
    .roundedRect(x, y, w, h, r).stroke()
  doc.restore()
}

function eyebrow(doc: Doc, label: string, color = ACCENT) {
  doc.fillColor(color).font('Courier-Bold').fontSize(9)
    .text(`// ${label.toUpperCase()}`, doc.page.margins.left, doc.y, { width: contentWidth(doc), characterSpacing: 1 })
}

function heading(doc: Doc, text: string, size = 21) {
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(size)
    .text(text, doc.page.margins.left, doc.y, { width: contentWidth(doc), lineGap: 1 })
}

function subhead(doc: Doc, text: string) {
  doc.fillColor(SOFT).font('Helvetica').fontSize(10.5)
    .text(text, doc.page.margins.left, doc.y, { width: contentWidth(doc), lineGap: 3 })
}

function sectionTop(doc: Doc, kicker: string, title: string, sub?: string, continueFlow = false) {
  if (continueFlow) doc.moveDown(3.2) // stack below the previous section on the same page
  else doc.y = doc.page.margins.top + 14 // a little air under the top accent bar
  eyebrow(doc, kicker)
  doc.moveDown(0.25)
  heading(doc, title)
  if (sub) {
    doc.moveDown(0.4)
    subhead(doc, sub)
  }
  doc.moveDown(1)
}

// ============================================================
// Content resolution (single source of truth — never invented)
// ============================================================

type Resolved = { name: string; level: string; duration: string; count: number; modules: string[]; summary: string; color: string }

function resolveCourse(c: RoadmapCourse): Resolved {
  const color = courseColor(c)
  if (c.key && trainingData[c.key]) {
    const d = trainingData[c.key]
    return {
      name: c.name,
      level: d.level,
      duration: formatDurationShort(d.duration),
      count: d.modules.length,
      modules: d.modules.map((m) => m.title),
      summary: d.description,
      color,
    }
  }
  return { name: c.name, level: c.level ?? '', duration: '', count: c.modules?.length ?? 0, modules: c.modules ?? [], summary: '', color }
}

const CATALOGUE = ROADMAP_TIERS.flatMap((t) => t.courses).filter((c) => c.key && trainingData[c.key])
const TOTAL_COURSES = CATALOGUE.length
const TOTAL_MODULES = CATALOGUE.reduce((n, c) => n + resolveCourse(c).count, 0)
const TOTAL_TIERS = ROADMAP_TIERS.length + 1 // + CISE capstone

// ============================================================
// 1 — Cover
// ============================================================

function drawCover(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  const savedBottom = doc.page.margins.bottom
  doc.page.margins.bottom = 0
  accentOrb(doc, doc.page.width - 40, 150, 230, 0.07)
  accentOrb(doc, 30, doc.page.height - 120, 150, 0.05, CAPSTONE)

  if (fs.existsSync(LOGO_PATH)) {
    try { doc.image(LOGO_PATH, left, 60, { height: 32 }) } catch { /* ignore */ }
  }
  doc.fillColor(SOFT).font('Helvetica').fontSize(9)
    .text('Hands-On Cyber Security Training · Indore, India', left, 100, { width: w })

  doc.y = 320
  doc.fillColor(ACCENT).font('Courier-Bold').fontSize(11)
    .text('// COURSE BROCHURE · 2026', left, doc.y, { width: w, characterSpacing: 2 })
  doc.moveDown(0.6)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(34)
    .text('Enterprise Cybersecurity', left, doc.y, { width: w, lineGap: 2 })
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(34)
    .text('Training Programs', left, doc.y, { width: w, lineGap: 2 })
  doc.moveDown(0.5)
  doc.fillColor(SOFT).font('Helvetica').fontSize(13)
    .text('Hands-on offensive security training & real-world penetration testing.', left, doc.y, { width: w, lineGap: 3 })
  doc.moveDown(0.7)
  doc.fillColor(ACCENT).font('Courier-Oblique').fontSize(11)
    .text('// Built by Hackers, for Defenders.', left, doc.y, { width: w })

  // stat strip
  doc.fillColor(ACCENT).font('Courier-Bold').fontSize(10)
    .text(`${TOTAL_COURSES} COURSES     ${TOTAL_MODULES} MODULES     ${TOTAL_TIERS} TIERS     18 MONTHS`, left, 540, { width: w, characterSpacing: 1 })

  // contact strip at the bottom (use the real margin, not the zeroed one)
  const by = doc.page.height - savedBottom - 6
  doc.save()
  doc.strokeColor(HAIR).lineWidth(0.75).moveTo(left, by - 14).lineTo(left + w, by - 14).stroke()
  doc.restore()
  doc.fillColor(SOFT).font('Helvetica').fontSize(9).text('Indore, India', left, by, { width: w / 3, lineBreak: false })
  doc.fillColor(ACCENT).font('Courier-Bold').fontSize(9).text(WEBSITE, left + w / 3, by, { width: w / 3, align: 'center', lineBreak: false })
  doc.fillColor(SOFT).font('Helvetica').fontSize(9).text(PHONE, left + (2 * w) / 3, by, { width: w / 3, align: 'right', lineBreak: false })
  doc.page.margins.bottom = savedBottom
}

// ============================================================
// 2 — About + Why Us
// ============================================================

function drawAbout(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  sectionTop(doc, 'About Armour Infosec', 'Built by Hackers, for Defenders')

  const paras = [
    'Armour Infosec is an offensive-security training and consulting firm based in Indore. We have spent 15+ years on the live edge of penetration testing — and we teach the same tradecraft our consulting team uses to break enterprise networks for paying clients.',
    'Our training philosophy is simple: you cannot defend what you cannot attack. Every course is lab-first — students compromise real targets, escalate privileges, pivot through Active Directory, and write the reports they will deliver on the job.',
    'Programmes run as a unified hybrid: Online Live Instructor-Led sessions and On-Premise Classroom training at our Sudama Nagar centre. Both modes share one curriculum, one trainer, and one certification track.',
  ]
  doc.fillColor(INK).font('Helvetica').fontSize(10.5)
  for (const p of paras) {
    doc.text(p, left, doc.y, { width: w, lineGap: 4 })
    doc.moveDown(0.6)
  }

  doc.moveDown(0.6)
  eyebrow(doc, 'Why Choose Us')
  doc.moveDown(0.3)
  heading(doc, 'Adversary-Tested. Enterprise-Ready.', 17)
  doc.moveDown(0.8)

  const stats: [string, string, string][] = [
    ['5,000+', 'Assessments Completed', '#16a34a'],
    ['500+', 'Enterprise Clients Served', ACCENT],
    ['15+', 'Years of Industry Experience', '#7c3aed'],
    ['10,000+', 'Students Trained', CAPSTONE],
  ]
  const gap = 14
  const cardW = (w - gap) / 2
  const cardH = 78
  const baseY = doc.y // capture once — text() below mutates doc.y
  stats.forEach(([value, label, color], i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = left + col * (cardW + gap)
    const y = baseY + row * (cardH + gap)
    panel(doc, x, y, cardW, cardH)
    doc.save()
    doc.fillColor(color).roundedRect(x, y, 4, cardH, 2).fill()
    doc.restore()
    doc.fillColor(color).font('Helvetica-Bold').fontSize(26).text(value, x + 22, y + 18, { width: cardW - 40, lineBreak: false })
    doc.fillColor(SOFT).font('Helvetica').fontSize(9.5).text(label, x + 22, y + 52, { width: cardW - 40, lineBreak: false })
  })
  doc.y = baseY + 2 * (cardH + gap)
}

// ============================================================
// 3 — Learning Roadmap (4 tiers, vertical beginner -> advanced)
// ============================================================

function drawRoadmap(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  sectionTop(
    doc,
    'Learning Roadmap',
    'One Path: Foundation to Expert',
    `Four tiers, ${TOTAL_COURSES} courses and ${TOTAL_MODULES} modules — take any course on its own or follow the full progression toward the CISE expert program.`,
  )

  const railX = left + 16
  const nodeR = 13
  const rowGap = 16
  const startY = doc.y

  type Row = { num: string; label: string; level: string; color: string; courses: string[] }
  const rows: Row[] = ROADMAP_TIERS.map((t: RoadmapTier) => ({
    num: t.id,
    label: t.label,
    level: t.core ? 'Intermediate' : t.id === '01' ? 'Beginner' : 'Advanced',
    color: t.accent,
    courses: t.courses.map((c) => c.name),
  }))
  rows.push({ num: '04', label: 'Capstone — CISE', level: 'Expert', color: CAPSTONE, courses: ['Certified Information Security Expert · all tracks unified'] })

  const layout = rows.map((r) => {
    doc.font('Helvetica').fontSize(9.5)
    const coursesH = r.courses.reduce((h, c) => h + doc.heightOfString(c, { width: w - 56, lineGap: 1 }) + 3, 0)
    const h = Math.max(nodeR * 2 + 4, 22 + coursesH)
    return { r, h }
  })
  const totalH = layout.reduce((s, l) => s + l.h + rowGap, 0)

  // vertical rail (gradient-ish: just a neutral dashed line behind)
  doc.save()
  doc.dash(2.5, { space: 2.5 })
  doc.strokeColor(ACCENT).strokeOpacity(0.4).lineWidth(2)
    .moveTo(railX, startY + nodeR).lineTo(railX, startY + totalH - rowGap - nodeR).stroke()
  doc.undash()
  doc.restore()

  let y = startY
  for (const { r, h } of layout) {
    doc.save()
    doc.fillColor(r.color).circle(railX, y + nodeR, nodeR).fill()
    doc.restore()
    doc.fillColor(WHITE).font('Courier-Bold').fontSize(9)
      .text(r.num, railX - nodeR, y + nodeR - 4.5, { width: nodeR * 2, align: 'center', lineBreak: false })

    const tx = railX + nodeR + 14
    const tw = left + w - tx
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(13).text(r.label, tx, y + 1, { width: tw - 90, lineBreak: false })
    doc.fillColor(r.color).font('Courier-Bold').fontSize(7.5)
      .text(r.level.toUpperCase(), tx + tw - 90, y + 4, { width: 90, align: 'right', lineBreak: false })
    let cy = y + 20
    for (const c of r.courses) {
      doc.fillColor(r.color).font('Courier-Bold').fontSize(8).text('>', tx, cy + 1, { width: 10, lineBreak: false })
      doc.fillColor(INK).font('Helvetica').fontSize(9.5).text(c, tx + 12, cy, { width: tw - 12, lineGap: 1 })
      cy = doc.y + 3
    }
    y += h + rowGap
  }
  doc.y = y
}

// ============================================================
// 3B — Roadmap map (visual spine, mirrors Cybersecurity-Roadmap.pdf)
// ============================================================

function mapPill(doc: Doc, cx: number, y: number, h: number, id: string, label: string, accent: string) {
  const text = `${id}     ${label}`
  doc.font('Helvetica-Bold').fontSize(10)
  const pw = doc.widthOfString(text) + 30
  const x = cx - pw / 2
  doc.save()
  doc.fillColor(accent).roundedRect(x, y, pw, h, h / 2).fill()
  doc.restore()
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(10).text(text, x, y + h / 2 - 5, { width: pw, align: 'center', lineBreak: false })
}

function mapNode(doc: Doc, x: number, y: number, w: number, h: number, r: Resolved, cx: number) {
  doc.save()
  doc.fillColor(WHITE).roundedRect(x, y, w, h, 6).fill()
  doc.strokeColor(HAIR).lineWidth(0.75).roundedRect(x, y, w, h, 6).stroke()
  doc.restore()
  doc.save()
  doc.fillColor(r.color).roundedRect(x, y, 3.5, h, 1.5).fill()
  doc.restore()
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(7.8).text(r.name, x + 9, y + 5, { width: w - 16, height: 18, lineGap: 0, ellipsis: true })
  const meta = `${r.level ? r.level.toUpperCase() + '  ·  ' : ''}${r.count} MODULES`
  doc.fillColor(r.color).font('Courier-Bold').fontSize(6).text(meta, x + 9, y + h - 10, { width: w - 16, lineBreak: false })
  const midY = y + h / 2
  doc.save()
  doc.fillColor(WHITE).circle(cx, midY, 5).fill()
  doc.fillColor(r.color).circle(cx, midY, 3.1).fill()
  doc.restore()
}

function mapCapstone(doc: Doc, cx: number, y: number, h: number) {
  const w = 332
  const x = cx - w / 2
  doc.save()
  doc.fillColor(ACCENT).roundedRect(x, y, w, h, 8).fill()
  doc.restore()
  doc.fillColor(WHITE).font('Courier-Bold').fontSize(7).text('// CISE', x, y + 6, { width: w, align: 'center', characterSpacing: 1.5 })
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(11).text('Certified Information Security Expert', x + 10, y + 17, { width: w - 20, align: 'center', lineBreak: false })
  doc.fillColor(WHITE).font('Helvetica').fontSize(7.5).text(`all ${TOTAL_COURSES} courses  ·  ${TOTAL_MODULES} modules`, x, y + 32, { width: w, align: 'center' })
}

function drawRoadmapMap(doc: Doc) {
  sectionTop(
    doc,
    'Roadmap At A Glance',
    'Your Cybersecurity Roadmap',
    'The full guided path on one page — courses branch off a central spine, colour-coded by tier, converging on the CISE expert program.',
  )

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
    | { kind: 'node'; y: number; side: 'left' | 'right'; r: Resolved }
    | { kind: 'core'; y: number; r: Resolved }
    | { kind: 'capstone'; y: number }
  const els: El[] = []
  let y = doc.y

  for (const tier of ROADMAP_TIERS) {
    els.push({ kind: 'pill', y, id: tier.id, label: tier.label, accent: tier.accent })
    y += PILL_H + PILL_GAP
    if (tier.core) {
      els.push({ kind: 'core', y, r: resolveCourse(tier.courses[0]) })
      y += NODE_H + GAP
    } else {
      for (const c of tier.courses) {
        els.push({ kind: 'node', y, side: c.side ?? 'left', r: resolveCourse(c) })
        y += NODE_H + GAP
      }
    }
    y += 2
  }
  els.push({ kind: 'pill', y, id: '04', label: 'Capstone', accent: CAPSTONE })
  y += PILL_H + PILL_GAP
  els.push({ kind: 'capstone', y })
  y += CAP_H

  doc.save()
  doc.dash(2.5, { space: 2.5 })
  doc.strokeColor(ACCENT).strokeOpacity(0.4).lineWidth(2).moveTo(cx, els[0].y).lineTo(cx, y - CAP_H / 2).stroke()
  doc.undash()
  doc.restore()

  for (const el of els) {
    if (el.kind === 'pill') {
      mapPill(doc, cx, el.y, PILL_H, el.id, el.label, el.accent)
    } else if (el.kind === 'core') {
      mapNode(doc, cx - NODE_W / 2, el.y, NODE_W, NODE_H, el.r, cx)
    } else if (el.kind === 'node') {
      const x = el.side === 'left' ? cx - CONN - NODE_W : cx + CONN
      const midY = el.y + NODE_H / 2
      doc.save()
      doc.strokeColor(HAIR).lineWidth(1).moveTo(el.side === 'left' ? cx - CONN : cx + CONN, midY).lineTo(cx, midY).stroke()
      doc.restore()
      mapNode(doc, x, el.y, NODE_W, NODE_H, el.r, cx)
    } else {
      mapCapstone(doc, cx, el.y, CAP_H)
    }
  }
  doc.y = y + 6
}

// ============================================================
// 4 — Course Catalogue
// ============================================================

function courseCard(doc: Doc, x: number, y: number, cw: number, ch: number, c: RoadmapCourse) {
  const r = resolveCourse(c)
  panel(doc, x, y, cw, ch)
  doc.save()
  doc.fillColor(r.color).roundedRect(x, y, 4, ch, 2).fill()
  doc.restore()
  const px = x + 16
  const pw = cw - 30
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(11)
    .text(r.name, px, y + 13, { width: pw, height: 30, lineGap: 1, ellipsis: true })
  const meta = [r.level.toUpperCase(), r.duration.toUpperCase(), `${r.count} MODULES`].filter(Boolean).join('  ·  ')
  doc.fillColor(r.color).font('Courier-Bold').fontSize(6.5).text(meta, px, y + 46, { width: pw, lineBreak: false })
  doc.fillColor(SOFT).font('Helvetica').fontSize(8.6).text(r.summary, px, y + 61, { width: pw, height: ch - 71, lineGap: 2.5, ellipsis: true })
}

function drawCatalogue(doc: Doc) {
  sectionTop(
    doc,
    'Course Catalogue',
    'Twelve Hands-On Courses',
    `${TOTAL_COURSES} specialist programmes · ${TOTAL_MODULES} modules across one progression — from systems fundamentals to advanced enterprise attacks and the CISE expert track.`,
  )
  const gap = 14
  const cardW = (contentWidth(doc) - gap) / 2
  const cardH = 116
  let i = 0
  while (i < CATALOGUE.length) {
    if (doc.y + cardH > contentBottom(doc)) doc.addPage()
    const rowY = doc.y
    for (let col = 0; col < 2 && i < CATALOGUE.length; col++, i++) {
      const x = doc.page.margins.left + col * (cardW + gap)
      courseCard(doc, x, rowY, cardW, cardH, CATALOGUE[i])
    }
    doc.y = rowY + cardH + gap
  }
}

// ============================================================
// 5 — Full Module Breakdown (every course, every module, by tier)
// ============================================================

const CHIP_H = 19
const CHIP_NUM_D = 13
const CHIP_PAD_L = 6
const CHIP_NUM_GAP = 5
const CHIP_PAD_R = 10
const CHIP_FONT = 8.3
const CHIP_ROW_GAP = 7
const CHEV_W = 12

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
    if (chipW > maxRowW) { chipW = maxRowW; textW = maxRowW - overhead; capped = true }
    const needChevron = x > startX
    if (x + (needChevron ? CHEV_W : 0) + chipW > rightEdge + 0.5) { x = startX; y += CHIP_H + CHIP_ROW_GAP }
    if (x > startX) {
      if (draw) doc.fillColor(SOFT).font('Helvetica-Bold').fontSize(10).text('›', x, y + CHIP_H / 2 - 6, { width: CHEV_W, align: 'center', lineBreak: false })
      x += CHEV_W
    }
    if (draw) {
      doc.save()
      doc.fillColor(WHITE).roundedRect(x, y, chipW, CHIP_H, 5).fill()
      doc.strokeColor(HAIR).lineWidth(0.6).roundedRect(x, y, chipW, CHIP_H, 5).stroke()
      doc.restore()
      const ncx = x + CHIP_PAD_L + CHIP_NUM_D / 2
      const ncy = y + CHIP_H / 2
      doc.save(); doc.fillColor(color).circle(ncx, ncy, CHIP_NUM_D / 2).fill(); doc.restore()
      doc.fillColor(WHITE).font('Courier-Bold').fontSize(6.8).text(String(i + 1), x + CHIP_PAD_L, y + CHIP_H / 2 - 3.4, { width: CHIP_NUM_D, align: 'center', lineBreak: false })
      doc.fillColor(INK).font('Helvetica').fontSize(CHIP_FONT).text(title, x + CHIP_PAD_L + CHIP_NUM_D + CHIP_NUM_GAP, y + CHIP_H / 2 - 4.3, { width: textW, height: CHIP_H, lineBreak: false, ellipsis: capped })
    }
    x += chipW
  }
  return y + CHIP_H
}

function tierBand(doc: Doc, id: string, label: string, sub: string, accent: string) {
  ensureSpace(doc, 50)
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  const y = doc.y
  const h = 30
  doc.save()
  doc.fillColor(accent).roundedRect(left, y, w, h, 7).fill()
  doc.restore()
  doc.fillColor(WHITE).font('Courier-Bold').fontSize(11).text(id, left + 14, y + 9.5, { width: 28, lineBreak: false })
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(13).text(label, left + 44, y + 8.5, { width: w - 200, lineBreak: false })
  doc.fillColor(WHITE).fillOpacity(0.85).font('Helvetica').fontSize(9).text(sub, left + 44, y + 10.5, { width: w - 58, align: 'right', lineBreak: false })
  doc.fillOpacity(1)
  doc.y = y + h + 12
}

function moduleBlock(doc: Doc, r: Resolved, index?: number) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  const textX = left + 14
  const numPrefix = index != null ? `${index}. ` : ''
  const meta = [r.level, `${r.count} modules`].filter(Boolean).join('  ·  ')

  doc.font('Helvetica-Bold').fontSize(12)
  const titleH = doc.heightOfString(`${numPrefix}${r.name}`, { width: w - 14, lineGap: 1 })
  const chipsH = r.modules.length ? flowChips(doc, r.modules, textX, left + w, 0, r.color, false) : 0
  ensureSpace(doc, titleH + 15 + chipsH + 8)

  const startY = doc.y
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(12).text(`${numPrefix}${r.name}`, textX, startY, { width: w - 14, lineGap: 1 })
  doc.fillColor(r.color).font('Courier-Bold').fontSize(8).text(meta.toUpperCase(), textX, doc.y + 1, { width: w - 14 })

  let endY = doc.y
  if (r.modules.length) endY = flowChips(doc, r.modules, textX, left + w, doc.y + 8, r.color, true)
  doc.save()
  doc.fillColor(r.color).roundedRect(left, startY, 3.5, Math.max(endY - startY, 14), 2).fill()
  doc.restore()
  doc.y = endY
  doc.moveDown(2.5) // breathing room between consecutive course blocks
}

function drawBreakdown(doc: Doc) {
  sectionTop(
    doc,
    'Full Module Breakdown',
    'Every Course, Every Module',
    'The complete syllabus for each course, grouped by tier. Each numbered chip is one module.',
  )
  ROADMAP_TIERS.forEach((tier, ti) => {
    if (ti > 0) doc.addPage() // every tier starts on a fresh page
    tierBand(doc, tier.id, tier.label, `${tier.courses.length} course${tier.courses.length > 1 ? 's' : ''}`, tier.accent)
    tier.courses.forEach((c, i) => moduleBlock(doc, resolveCourse(c), tier.core ? undefined : i + 1))
  })
  doc.addPage()
  tierBand(doc, '04', 'Capstone', 'the complete program', CAPSTONE)
  moduleBlock(doc, resolveCourse(ROADMAP_CAPSTONE))
}

// ============================================================
// 6 — Hacker's Arsenal (tools — from the Training page)
// ============================================================

const TOOL_GROUPS: { title: string; tools: string[] }[] = [
  { title: 'Offensive Security', tools: ['Nmap', 'Metasploit', 'Wireshark', 'Aircrack-ng', 'Hydra', 'sqlmap', 'ffuf', 'Gobuster', 'Responder', 'Impacket', 'BloodHound', 'Mimikatz', 'John the Ripper', 'Hashcat'] },
  { title: 'Web & API Testing', tools: ['Burp Suite', 'Postman', 'OWASP ZAP', 'JWT Toolkit', 'Dirsearch'] },
  { title: 'Development & Automation', tools: ['Python', 'Bash', 'PowerShell', 'Git', 'Docker'] },
  { title: 'Cloud / DevOps / Enterprise', tools: ['Active Directory', 'Linux Servers', 'Windows Server', 'VMware', 'Kali Linux'] },
]

function drawTools(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  sectionTop(doc, "Hacker's Arsenal", "Tools You'll Master", 'Industry-standard offensive tools — learned from the ground up, not just clicked through.')

  const gap = 10
  const cols = 4
  const chipW = (w - gap * (cols - 1)) / cols
  const chipH = 22
  for (const group of TOOL_GROUPS) {
    const rowCount = Math.ceil(group.tools.length / cols)
    ensureSpace(doc, 24 + rowCount * (chipH + gap))
    doc.fillColor(ACCENT).font('Courier-Bold').fontSize(8).text(`// ${group.title.toUpperCase()}`, left, doc.y, { width: w, characterSpacing: 0.8 })
    doc.moveDown(0.5)
    const baseY = doc.y // capture once — text() below mutates doc.y
    for (let i = 0; i < group.tools.length; i += cols) {
      const rowTools = group.tools.slice(i, i + cols)
      const ry = baseY + (i / cols) * (chipH + gap)
      rowTools.forEach((tool, j) => {
        const x = left + j * (chipW + gap)
        panel(doc, x, ry, chipW, chipH, { fill: PANEL_HI, radius: 5 })
        doc.fillColor(ACCENT).font('Courier-Bold').fontSize(9).text('>', x + 8, ry + 6.5, { width: 10, lineBreak: false })
        doc.fillColor(INK).font('Helvetica').fontSize(9).text(tool, x + 20, ry + 6.5, { width: chipW - 26, lineBreak: false, ellipsis: true })
      })
    }
    doc.y = baseY + rowCount * (chipH + gap) + 8
  }
}

// ============================================================
// 7 — Training Modes
// ============================================================

function drawModes(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  sectionTop(doc, 'Training Modes', 'One Programme. Two Modes. Same Result.', 'Choose the format that fits your schedule — both modes share one curriculum, one trainer, and one certification track.')

  const gap = 14
  const cardW = (w - gap) / 2
  const cardH = 110
  const y = doc.y
  const modes: [string, string][] = [
    ['Online Live Instructor-Led', 'Real-time, interactive sessions delivered by Indore-based trainers. Live labs, recordings, and dedicated support during each batch window.'],
    ['On-Premise Classroom', 'In-person training at our Sudama Nagar centre. Dedicated lab benches, peer collaboration, and walk-in mentor hours after every class.'],
  ]
  modes.forEach(([title, body], i) => {
    const x = left + i * (cardW + gap)
    panel(doc, x, y, cardW, cardH)
    doc.save(); doc.fillColor(ACCENT).fillOpacity(0.12).roundedRect(x + 16, y + 16, 26, 26, 6).fill(); doc.restore()
    doc.fillColor(ACCENT).font('Courier-Bold').fontSize(13).text('>_', x + 22, y + 23, { lineBreak: false })
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(12).text(title, x + 52, y + 22, { width: cardW - 64, lineBreak: false })
    doc.fillColor(SOFT).font('Helvetica').fontSize(9.5).text(body, x + 16, y + 54, { width: cardW - 32, lineGap: 3 })
  })
  doc.y = y + cardH + 16

  const bullets = [
    'Weekend + Weekday Batches — pick the cadence that fits your job or studies',
    'Hands-on Labs Included — dedicated VMs, intentionally vulnerable targets, isolated lab networks',
    'Placement Assistance — resume reviews, interview prep, referrals to hiring partners',
  ]
  const by = doc.y
  const bh = 20 + bullets.length * 22
  panel(doc, left, by, w, bh)
  let cy = by + 14
  for (const b of bullets) {
    doc.fillColor(ACCENT).font('Courier-Bold').fontSize(10).text('[x]', left + 14, cy, { width: 26, lineBreak: false })
    doc.fillColor(INK).font('Helvetica').fontSize(9.5).text(b, left + 44, cy + 1, { width: w - 60, lineGap: 2 })
    cy = doc.y + 8
  }
}

// ============================================================
// 8 — Certifications & Skill Tracks
// ============================================================

function drawCerts(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  sectionTop(doc, 'Certifications & Skill Tracks', 'Industry-Recognised Outcomes', undefined, true)

  const certs = ['OSCP+', 'CEH Practical', 'Practical Pentesting', 'Enterprise Attack Sim']
  const gap = 12
  const pillW = (w - gap * (certs.length - 1)) / certs.length
  const pillH = 34
  const y = doc.y
  certs.forEach((c, i) => {
    const x = left + i * (pillW + gap)
    doc.save()
    doc.fillColor(PANEL_HI).roundedRect(x, y, pillW, pillH, pillH / 2).fill()
    doc.strokeColor(ACCENT).strokeOpacity(0.5).lineWidth(1).roundedRect(x, y, pillW, pillH, pillH / 2).stroke()
    doc.restore()
    doc.fillColor(ACCENT).font('Courier-Bold').fontSize(9.5).text(c, x, y + 11.5, { width: pillW, align: 'center', lineBreak: false })
  })
  doc.y = y + pillH + 18
  doc.fillColor(SOFT).font('Helvetica').fontSize(10.5)
    .text('Course content prepares students for offensive-security certifications and the practical skills employers expect — penetration testing tradecraft, enterprise attack simulation, and clear executive reporting.', left, doc.y, { width: w, lineGap: 4 })
}

// ============================================================
// 9 — Get In Touch
// ============================================================

async function drawContact(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  sectionTop(doc, 'Get In Touch', 'Start Your Cybersecurity Journey', 'Reach out for enrolment, batch schedule, lab access, or corporate training proposals.')

  const rows: [string, string][] = [
    ['PHONE', PHONE],
    ['WHATSAPP', PHONE],
    ['EMAIL', EMAIL],
    ['WEBSITE', WEBSITE_URL],
    ['ADDRESS', ADDRESS],
  ]
  for (const [label, value] of rows) {
    const ry = doc.y
    doc.fillColor(ACCENT).font('Courier-Bold').fontSize(8.5).text(label, left, ry + 1, { width: 90, lineBreak: false })
    doc.fillColor(INK).font('Helvetica').fontSize(10.5).text(value, left + 100, ry, { width: w - 100, lineGap: 2 })
    doc.y = doc.y + 8
  }

  doc.moveDown(1.2)
  const qrBuffer = await QRCode.toBuffer(TRAINING_URL, { type: 'png', width: 240, margin: 1, errorCorrectionLevel: 'M', color: { dark: '#0b1220', light: '#ffffff' } })
  const qrSize = 128
  const qrPad = 12
  const cardSize = qrSize + qrPad * 2
  const qrX = (doc.page.width - cardSize) / 2
  const qrY = doc.y
  panel(doc, qrX, qrY, cardSize, cardSize, { fill: WHITE })
  doc.image(qrBuffer, qrX + qrPad, qrY + qrPad, { width: qrSize, height: qrSize })
  doc.y = qrY + cardSize + 12
  doc.fillColor(SOFT).font('Courier-Bold').fontSize(8.5).text('SCAN TO VIEW THE COURSE CATALOGUE', left, doc.y, { width: w, align: 'center', characterSpacing: 1 })
  doc.moveDown(0.3)
  doc.fillColor(ACCENT).font('Courier-Oblique').fontSize(10).text('// Built by Hackers, for Defenders.', left, doc.y, { width: w, align: 'center' })
}

// ============================================================
// Footer (unified across every page)
// ============================================================

function drawFooter(doc: Doc) {
  const range = doc.bufferedPageRange()
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)
    const left = doc.page.margins.left
    const w = contentWidth(doc)
    const y = doc.page.height - doc.page.margins.bottom + 16
    const savedBottom = doc.page.margins.bottom
    doc.page.margins.bottom = 0
    doc.save()
    doc.strokeColor(HAIR).lineWidth(0.75).moveTo(left, y).lineTo(left + w, y).stroke()
    doc.restore()
    doc.fillColor(SOFT).font('Courier').fontSize(7)
      .text(ADDRESS, left, y + 6, { width: w - 78, lineBreak: false })
      .text(`Page ${i - range.start + 1} of ${range.count}`, left + w - 78, y + 6, { width: 78, align: 'right', lineBreak: false })
    doc.fillColor(SOFT).font('Courier').fontSize(7)
      .text(`${PHONE}   ·   ${EMAIL}   ·   ${WEBSITE}`, left, y + 16, { width: w, lineBreak: false })
    doc.page.margins.bottom = savedBottom
  }
}

// ============================================================
// Main
// ============================================================

async function main() {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  const stream = fs.createWriteStream(OUT_PATH)
  const doc = new PDFDocument({
    size: PAGE.size,
    margins: PAGE.margins,
    bufferPages: true,
    info: {
      Title: `${BRAND} — Enterprise Cybersecurity Training Programs`,
      Author: BRAND,
      Subject: 'Course Brochure',
      Keywords: 'cybersecurity, ethical hacking, penetration testing, training, roadmap, modules, Indore, brochure',
    },
  })

  paintPageBackground(doc)
  doc.on('pageAdded', () => paintPageBackground(doc))
  doc.pipe(stream)

  drawCover(doc)
  doc.addPage(); drawAbout(doc)
  doc.addPage(); drawRoadmap(doc)
  doc.addPage(); drawRoadmapMap(doc)
  doc.addPage(); drawBreakdown(doc)
  doc.addPage(); drawTools(doc)
  doc.addPage(); drawModes(doc); drawCerts(doc) // modes + certs share one page
  doc.addPage(); await drawContact(doc)

  drawFooter(doc)
  doc.end()

  await new Promise<void>((resolve, reject) => {
    stream.on('finish', () => resolve())
    stream.on('error', reject)
  })
  const size = (fs.statSync(OUT_PATH).size / 1024).toFixed(1)
  console.log(`Course brochure written to ${path.relative(REPO, OUT_PATH)} (${size} KB)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
