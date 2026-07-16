/**
 * Build-time generator: a 2-page "inquiry handout" version of the course
 * brochure into public/Course-Brochure-Short.pdf.
 *
 *   Page 1 — the CISE program: flagship intro, about, why-choose-us, and the
 *            fee / payment-plan options.
 *   Page 2 — the visual cybersecurity roadmap (spine map).
 *
 * Same clean light palette as Course-Brochure.pdf / Cybersecurity-Roadmap.pdf.
 * Course/module counts and the roadmap come from src/data (single source of
 * truth). Fees are the values supplied by Armour Infosec.
 *
 * Note: pdfkit's standard fonts have no Rupee glyph (₹), so prices use "Rs".
 * Run via `npm run build:short` or automatically via `prebuild`.
 */
import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'
import { trainingData } from '../src/data/training'
import { ROADMAP_TIERS, type RoadmapCourse } from '../src/data/roadmap'

const REPO = path.resolve(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), '..')
const OUT_PATH = path.join(REPO, 'public', 'Course-Brochure-Short.pdf')
const LOGO_PATH = path.join(REPO, 'public', 'logo', 'armour-infosec-red-black.png')

const BRAND = 'Armour Infosec'
const WEBSITE = 'armourinfosec.com'
const PHONE = '+91 99777 47168'
const EMAIL = 'info@armourinfosec.com'
const ADDRESS = '674, Sudama Dwar, Narendra Tiwari Marg, Sudama Nagar, Indore, Madhya Pradesh 452009'
const TRAINING_URL = 'https://www.armourinfosec.com/training/'

// ----- shared light palette -----
const BG = '#ffffff'
const PANEL = '#f5f8ff'
const PANEL_HI = '#eef3ff'
const HAIR = '#e6e9f0'
const ACCENT = '#2f6bff'
const GREEN = '#16a34a'
const VIOLET = '#7c3aed'
const CAPSTONE = '#d97706'
const INK = '#0b1220'
const SOFT = '#5b6678'
const WHITE = '#ffffff'

const PAGE = { size: 'A4' as const, margins: { top: 50, bottom: 46, left: 54, right: 54 } }

type Doc = InstanceType<typeof PDFDocument>

const contentWidth = (doc: Doc) => doc.page.width - doc.page.margins.left - doc.page.margins.right

const TOTAL_COURSES = Object.keys(trainingData).length
const TOTAL_MODULES = Object.values(trainingData).reduce((n, d) => n + d.modules.length, 0)
const TOTAL_TIERS = ROADMAP_TIERS.length + 1
const courseColor = (c: RoadmapCourse) => (c.color.startsWith('var(') ? ACCENT : c.color)

function paintPageBackground(doc: Doc) {
  doc.save()
  doc.fillColor(BG).rect(0, 0, doc.page.width, doc.page.height).fill()
  doc.fillColor(ACCENT).rect(0, 0, doc.page.width, 3).fill()
  doc.restore()
}

function accentOrb(doc: Doc, x: number, y: number, r: number, opacity: number, color = ACCENT) {
  doc.save(); doc.fillColor(color).fillOpacity(opacity).circle(x, y, r).fill(); doc.restore()
}

function panel(doc: Doc, x: number, y: number, w: number, h: number, opts: { fill?: string; stroke?: string; radius?: number } = {}) {
  const r = opts.radius ?? 8
  doc.save()
  doc.fillColor(opts.fill ?? PANEL).roundedRect(x, y, w, h, r).fill()
  doc.strokeColor(opts.stroke ?? HAIR).lineWidth(0.75).roundedRect(x, y, w, h, r).stroke()
  doc.restore()
}

function kicker(doc: Doc, label: string, color = ACCENT) {
  doc.fillColor(color).font('Courier-Bold').fontSize(9.5).text(`// ${label.toUpperCase()}`, doc.page.margins.left, doc.y, { width: contentWidth(doc), characterSpacing: 1.1 })
}

// ============================================================
// Page 1 — Program · About · Why Us · Fees
// ============================================================

function drawProgram(doc: Doc) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)
  accentOrb(doc, doc.page.width - 30, 120, 170, 0.06)

  if (fs.existsSync(LOGO_PATH)) {
    try { doc.image(LOGO_PATH, left, 52, { height: 28 }) } catch { /* ignore */ }
  }
  doc.fillColor(SOFT).font('Helvetica').fontSize(8.5).text('Hands-On Cyber Security Training · Indore, India', left, 88, { width: w })

  // --- flagship program ---
  doc.y = 116
  kicker(doc, '18-Month Flagship Program')
  doc.moveDown(0.3)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(23).text('Certified Information Security Expert (CISE)', left, doc.y, { width: w, lineGap: 1 })
  doc.moveDown(0.35)
  doc.fillColor(SOFT).font('Helvetica').fontSize(10.5).text('One guided program from systems fundamentals to advanced enterprise attacks — every Armour Infosec course, culminating in the CISE qualification.', left, doc.y, { width: w, lineGap: 2.5 })
  doc.moveDown(0.45)
  doc.fillColor(ACCENT).font('Courier-Bold').fontSize(9.5).text(`${TOTAL_COURSES} COURSES   ·   ${TOTAL_MODULES} MODULES   ·   ${TOTAL_TIERS} TIERS   ·   18 MONTHS`, left, doc.y, { width: w, characterSpacing: 0.8 })

  // --- about ---
  doc.moveDown(1.1)
  kicker(doc, 'About Armour Infosec')
  doc.moveDown(0.25)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(15).text('Built by Hackers, for Defenders', left, doc.y, { width: w })
  doc.moveDown(0.4)
  const about = [
    "Armour Infosec is an offensive-security training & consulting firm in Indore. For 15+ years we've worked on the live edge of penetration testing — and we teach the exact tradecraft our consultants use to break enterprise networks for clients.",
    'Every course is lab-first: you compromise real targets, escalate privileges, pivot through Active Directory and write the reports you deliver on the job. Online Live and On-Premise Classroom modes share one curriculum and one certification track.',
  ]
  doc.fillColor(SOFT).font('Helvetica').fontSize(9.3)
  for (const p of about) { doc.text(p, left, doc.y, { width: w, lineGap: 2.5 }); doc.moveDown(0.4) }

  // --- why choose us (trust stats) ---
  doc.moveDown(0.7)
  kicker(doc, 'Why Choose Us')
  doc.moveDown(0.25)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(15).text('Adversary-Tested. Enterprise-Ready.', left, doc.y, { width: w })
  doc.moveDown(0.6)
  const stats: [string, string, string][] = [
    ['5,000+', 'Assessments', GREEN],
    ['500+', 'Enterprise Clients', ACCENT],
    ['15+', 'Years Experience', VIOLET],
    ['10,000+', 'Students Trained', CAPSTONE],
  ]
  const sGap = 12
  const sW = (w - sGap * (stats.length - 1)) / stats.length
  const sH = 54
  const sBaseY = doc.y
  stats.forEach(([value, label, color], i) => {
    const x = left + i * (sW + sGap)
    panel(doc, x, sBaseY, sW, sH)
    doc.save(); doc.fillColor(color).roundedRect(x, sBaseY, 4, sH, 2).fill(); doc.restore()
    doc.fillColor(color).font('Helvetica-Bold').fontSize(18).text(value, x + 12, sBaseY + 9, { width: sW - 18, lineBreak: false })
    doc.fillColor(SOFT).font('Helvetica').fontSize(8.3).text(label, x + 12, sBaseY + 34, { width: sW - 16, lineBreak: false })
  })
  doc.y = sBaseY + sH + 18

  // --- program fees ---
  kicker(doc, 'Program Fees')
  doc.moveDown(0.25)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(15).text('Simple, Transparent Pricing', left, doc.y, { width: w })
  doc.moveDown(0.55)

  const banY = doc.y
  const banH = 44
  doc.save(); doc.fillColor(ACCENT).roundedRect(left, banY, w, banH, 8).fill(); doc.restore()
  doc.fillColor(WHITE).fillOpacity(0.85).font('Courier-Bold').fontSize(8).text('TOTAL PROGRAM FEE', left + 16, banY + 9, { lineBreak: false })
  doc.fillOpacity(1).fillColor(WHITE).font('Helvetica-Bold').fontSize(18).text('Rs 55,000', left + 16, banY + 19, { lineBreak: false })
  doc.fillColor(WHITE).fillOpacity(0.9).font('Helvetica').fontSize(9.5).text('Complete 18-month CISE program · all 12 courses', left, banY + 17, { width: w - 16, align: 'right', lineBreak: false })
  doc.fillOpacity(1)
  doc.y = banY + banH + 12

  const oGap = 14
  const oW = (w - oGap) / 2
  const oH = 104
  const oy = doc.y
  panel(doc, left, oy, oW, oH)
  doc.save(); doc.fillColor(GREEN).roundedRect(left, oy, 4, oH, 2).fill(); doc.restore()
  doc.fillColor(GREEN).font('Courier-Bold').fontSize(8).text('// OPTION A · ONE-TIME', left + 16, oy + 12, { lineBreak: false })
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(22).text('Rs 50,000', left + 16, oy + 26, { lineBreak: false })
  doc.save(); doc.fillColor(GREEN).fillOpacity(0.14).roundedRect(left + 16, oy + 56, 90, 17, 8).fill(); doc.restore()
  doc.fillColor(GREEN).font('Helvetica-Bold').fontSize(8.5).text('SAVE Rs 5,000', left + 16, oy + 60, { width: 90, align: 'center', lineBreak: false })
  doc.fillColor(SOFT).font('Helvetica').fontSize(9).text('Pay the full fee upfront at enrolment and pay Rs 5,000 less.', left + 16, oy + 80, { width: oW - 30, lineGap: 2 })

  const bx = left + oW + oGap
  panel(doc, bx, oy, oW, oH)
  doc.save(); doc.fillColor(ACCENT).roundedRect(bx, oy, 4, oH, 2).fill(); doc.restore()
  doc.fillColor(ACCENT).font('Courier-Bold').fontSize(8).text('// OPTION B · INSTALLMENTS', bx + 16, oy + 12, { lineBreak: false })
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(16).text('Rs 10,000', bx + 16, oy + 28, { lineBreak: false, continued: true }).font('Helvetica').fontSize(10).fillColor(SOFT).text('  then', { lineBreak: false })
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(16).text('Rs 5,000', bx + 16, oy + 50, { lineBreak: false, continued: true }).font('Helvetica').fontSize(10).fillColor(SOFT).text('  x 9 months', { lineBreak: false })
  doc.fillColor(SOFT).font('Helvetica').fontSize(9).text('First Rs 10,000, then Rs 5,000 monthly for 9 months. Total Rs 55,000.', bx + 16, oy + 76, { width: oW - 30, lineGap: 2 })
  doc.y = oy + oH + 12

  const rY = doc.y
  const rH = 32
  panel(doc, left, rY, w, rH, { fill: PANEL_HI })
  doc.fillColor(CAPSTONE).font('Courier-Bold').fontSize(8.5).text('SEAT REGISTRATION', left + 16, rY + 11, { lineBreak: false })
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(11).text('Rs 1,000', left + 150, rY + 10, { lineBreak: false })
  doc.fillColor(SOFT).font('Helvetica').fontSize(9).text('one-time booking amount to confirm your seat', left + 222, rY + 11, { width: w - 236, lineBreak: false })
}

// ============================================================
// Page 2 — Roadmap map
// ============================================================

type Resolved = { name: string; level: string; count: number; color: string; price: string }
function resolveCourse(c: RoadmapCourse): Resolved {
  const color = courseColor(c)
  if (c.key && trainingData[c.key]) {
    const d = trainingData[c.key]
    return { name: c.name, level: d.level, count: d.modules.length, color, price: d.price.replace('₹', 'Rs ') }
  }
  return { name: c.name, level: c.level ?? '', count: c.modules?.length ?? 0, color, price: '' }
}

function mapPill(doc: Doc, cx: number, y: number, h: number, id: string, label: string, accent: string) {
  const text = `${id}     ${label}`
  doc.font('Helvetica-Bold').fontSize(10)
  const pw = doc.widthOfString(text) + 30
  const x = cx - pw / 2
  doc.save(); doc.fillColor(accent).roundedRect(x, y, pw, h, h / 2).fill(); doc.restore()
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(10).text(text, x, y + h / 2 - 5, { width: pw, align: 'center', lineBreak: false })
}

function mapNode(doc: Doc, x: number, y: number, w: number, h: number, r: Resolved, cx: number) {
  doc.save(); doc.fillColor(WHITE).roundedRect(x, y, w, h, 6).fill(); doc.strokeColor(HAIR).lineWidth(0.75).roundedRect(x, y, w, h, 6).stroke(); doc.restore()
  doc.save(); doc.fillColor(r.color).roundedRect(x, y, 3.5, h, 1.5).fill(); doc.restore()
  const priceW = r.price ? doc.font('Helvetica-Bold').fontSize(7.8).widthOfString(r.price) + 6 : 0
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(7.8).text(r.name, x + 9, y + 5, { width: w - 16 - priceW, height: 18, lineGap: 0, ellipsis: true })
  if (r.price) {
    doc.fillColor(r.color).font('Helvetica-Bold').fontSize(7.8).text(r.price, x + 9, y + 5, { width: w - 16, align: 'right' })
  }
  doc.fillColor(r.color).font('Courier-Bold').fontSize(6).text(`${r.level ? r.level.toUpperCase() + '  ·  ' : ''}${r.count} MODULES`, x + 9, y + h - 10, { width: w - 16, lineBreak: false })
  const midY = y + h / 2
  doc.save(); doc.fillColor(WHITE).circle(cx, midY, 5).fill(); doc.fillColor(r.color).circle(cx, midY, 3.1).fill(); doc.restore()
}

function mapCapstone(doc: Doc, cx: number, y: number, h: number) {
  const w = 332
  const x = cx - w / 2
  doc.save(); doc.fillColor(ACCENT).roundedRect(x, y, w, h, 8).fill(); doc.restore()
  doc.fillColor(WHITE).font('Courier-Bold').fontSize(7).text('// CISE', x, y + 6, { width: w, align: 'center', characterSpacing: 1.5 })
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(11).text('Certified Information Security Expert', x + 10, y + 17, { width: w - 20, align: 'center', lineBreak: false })
  doc.fillColor(WHITE).font('Helvetica').fontSize(7.5).text(`all ${TOTAL_COURSES} courses  ·  ${TOTAL_MODULES} modules  ·  18 months`, x, y + 32, { width: w, align: 'center' })
}

function drawRoadmap(doc: Doc, qr: Buffer) {
  const left = doc.page.margins.left
  const w = contentWidth(doc)

  // QR card in the header top-right
  const qrSize = 70
  const qrPad = 8
  const cardSize = qrSize + qrPad * 2
  const qrX = left + w - cardSize
  const qrY = doc.page.margins.top + 2
  panel(doc, qrX, qrY, cardSize, cardSize, { fill: WHITE })
  doc.image(qr, qrX + qrPad, qrY + qrPad, { width: qrSize, height: qrSize })
  doc.fillColor(SOFT).font('Courier-Bold').fontSize(6).text('SCAN FOR COURSES', qrX - 6, qrY + cardSize + 4, { width: cardSize + 12, align: 'center', lineBreak: false })

  const headW = w - cardSize - 16
  doc.y = doc.page.margins.top + 8
  kicker(doc, 'Learning Roadmap')
  doc.moveDown(0.3)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(21).text('Your Cybersecurity Roadmap', left, doc.y, { width: headW })
  doc.moveDown(0.35)
  doc.fillColor(SOFT).font('Helvetica').fontSize(10.5).text('The full guided path on one page — courses branch off a central spine, colour-coded by tier, converging on the CISE expert program.', left, doc.y, { width: headW, lineGap: 3 })
  doc.moveDown(1)

  const cx = left + w / 2
  const NODE_W = 214, NODE_H = 32, GAP = 4, PILL_H = 22, PILL_GAP = 6, CONN = 24, CAP_H = 44

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
    if (tier.core) { els.push({ kind: 'core', y, r: resolveCourse(tier.courses[0]) }); y += NODE_H + GAP }
    else { for (const c of tier.courses) { els.push({ kind: 'node', y, side: c.side ?? 'left', r: resolveCourse(c) }); y += NODE_H + GAP } }
    y += 2
  }
  els.push({ kind: 'pill', y, id: '04', label: 'Capstone', accent: CAPSTONE })
  y += PILL_H + PILL_GAP
  els.push({ kind: 'capstone', y })
  y += CAP_H

  doc.save(); doc.dash(2.5, { space: 2.5 }); doc.strokeColor(ACCENT).strokeOpacity(0.4).lineWidth(2).moveTo(cx, els[0].y).lineTo(cx, y - CAP_H / 2).stroke(); doc.undash(); doc.restore()

  for (const el of els) {
    if (el.kind === 'pill') mapPill(doc, cx, el.y, PILL_H, el.id, el.label, el.accent)
    else if (el.kind === 'core') mapNode(doc, cx - NODE_W / 2, el.y, NODE_W, NODE_H, el.r, cx)
    else if (el.kind === 'node') {
      const x = el.side === 'left' ? cx - CONN - NODE_W : cx + CONN
      const midY = el.y + NODE_H / 2
      doc.save(); doc.strokeColor(HAIR).lineWidth(1).moveTo(el.side === 'left' ? cx - CONN : cx + CONN, midY).lineTo(cx, midY).stroke(); doc.restore()
      mapNode(doc, x, el.y, NODE_W, NODE_H, el.r, cx)
    } else mapCapstone(doc, cx, el.y, CAP_H)
  }

  // ── Complete Program Bundle — all courses at one discounted price ──
  const bundleTotal = Object.values(trainingData).reduce((s, d) => s + Number(d.price.replace(/[^0-9]/g, '')), 0)
  const bundleFee = 55000
  const inr = (n: number) => 'Rs ' + n.toLocaleString('en-IN')
  const by = y + 12
  const bh = 44
  panel(doc, left, by, w, bh, { fill: PANEL_HI, stroke: ACCENT, radius: 10 })
  doc.fillColor(ACCENT).font('Courier-Bold').fontSize(7).text('// COMPLETE PROGRAM BUNDLE', left + 16, by + 10, { lineBreak: false })
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(12.5).text(`All ${TOTAL_COURSES} courses, one price`, left + 16, by + 22, { lineBreak: false })
  const bundleCols = [
    { label: 'TOTAL VALUE', value: inr(bundleTotal), color: SOFT, strike: true, size: 11, vy: 22 },
    { label: 'BUNDLE FEE', value: inr(bundleFee), color: ACCENT, strike: false, size: 17, vy: 19 },
    { label: 'YOU SAVE', value: inr(bundleTotal - bundleFee), color: CAPSTONE, strike: false, size: 11, vy: 22 },
  ]
  const bColW = 92
  const bStartX = left + w - 16 - bundleCols.length * bColW
  bundleCols.forEach((c, i) => {
    const bx = bStartX + i * bColW
    doc.fillColor(SOFT).font('Courier-Bold').fontSize(6).text(c.label, bx, by + 10, { width: bColW - 6, lineBreak: false })
    doc.fillColor(c.color).font('Helvetica-Bold').fontSize(c.size).text(c.value, bx, by + c.vy, { width: bColW - 6, strike: c.strike, lineBreak: false })
  })
}

// ============================================================
// Footer (dynamic page count)
// ============================================================

function drawFooter(doc: Doc) {
  const range = doc.bufferedPageRange()
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)
    const left = doc.page.margins.left
    const w = contentWidth(doc)
    const y = doc.page.height - doc.page.margins.bottom + 16
    const saved = doc.page.margins.bottom
    doc.page.margins.bottom = 0
    doc.save(); doc.strokeColor(HAIR).lineWidth(0.75).moveTo(left, y).lineTo(left + w, y).stroke(); doc.restore()
    doc.fillColor(SOFT).font('Courier').fontSize(7)
      .text(ADDRESS, left, y + 6, { width: w - 78, lineBreak: false })
      .text(`Page ${i - range.start + 1} of ${range.count}`, left + w - 78, y + 6, { width: 78, align: 'right', lineBreak: false })
    doc.fillColor(SOFT).font('Courier').fontSize(7)
      .text(`${PHONE}   ·   ${EMAIL}   ·   ${WEBSITE}`, left, y + 16, { width: w, lineBreak: false })
    doc.page.margins.bottom = saved
  }
}

// ============================================================
// Main
// ============================================================

async function main() {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  const stream = fs.createWriteStream(OUT_PATH)
  const doc = new PDFDocument({
    size: PAGE.size, margins: PAGE.margins, bufferPages: true,
    info: { Title: `${BRAND} — CISE Program & Roadmap`, Author: BRAND, Subject: 'Course inquiry handout', Keywords: 'cybersecurity, CISE, training, fees, roadmap, Indore' },
  })
  paintPageBackground(doc)
  doc.on('pageAdded', () => paintPageBackground(doc))
  doc.pipe(stream)

  const qr = await QRCode.toBuffer(TRAINING_URL, { type: 'png', width: 240, margin: 1, errorCorrectionLevel: 'M', color: { dark: '#0b1220', light: '#ffffff' } })

  drawProgram(doc)
  doc.addPage(); drawRoadmap(doc, qr)

  drawFooter(doc)
  doc.end()
  await new Promise<void>((resolve, reject) => { stream.on('finish', () => resolve()); stream.on('error', reject) })
  const size = (fs.statSync(OUT_PATH).size / 1024).toFixed(1)
  console.log(`Short brochure written to ${path.relative(REPO, OUT_PATH)} (${size} KB)`)
}

main().catch((err) => { console.error(err); process.exit(1) })
