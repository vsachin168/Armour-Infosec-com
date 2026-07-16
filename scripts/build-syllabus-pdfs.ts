/**
 * Build-time generator: emits one syllabus PDF per training course
 * into public/syllabus/<slug>.pdf.
 *
 * Theme: full dark (deep navy background, off-white body, neon accent).
 * Run via `npm run build:syllabus` or automatically via `prebuild`.
 */
import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'
import { trainingData } from '../src/data/training'

const REPO = path.resolve(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), '..')
const OUT_DIR = path.join(REPO, 'public', 'syllabus')
const LOGO_PATH = path.join(REPO, 'public', 'logo', 'armour-infosec-red-black.png')

const BRAND = 'Armour Infosec'
const TAGLINE = 'Hands-On Cyber Security Training · Indore, India'
const WEBSITE = 'armourinfosec.com'
const PHONE = '+91 99777 47168'
const EMAIL = 'info@armourinfosec.com'
const ADDRESS = '674, Sudama Dwar, Narendra Tiwari Marg, Sudama Nagar, Indore, Madhya Pradesh 452009'

// Clean professional palette (matches the redesigned website)
const BG = '#ffffff'      // page background (white paper)
const PANEL = '#f5f8ff'   // subtle light panel for accents
const ACCENT = '#2f6bff'  // clean blue accent
const ACCENT_DIM = '#1d4ed8'
const INK = '#0b1220'     // body text (near-black)
const SOFT = '#5b6678'    // muted text
const HAIR = '#e6e9f0'    // hairline dividers

const PAGE = {
  size: 'A4' as const,
  // bottom margin is tight so the footer can sit INSIDE the text area (pdfkit
  // auto-paginates any text() call placed below page.margins.bottom, even with
  // lineBreak: false — that was the trailing-blank-pages bug).
  margins: { top: 60, bottom: 22, left: 56, right: 56 },
}
const FOOTER_HEIGHT = 40

type Doc = InstanceType<typeof PDFDocument>

function contentWidth(doc: Doc): number {
  return doc.page.width - doc.page.margins.left - doc.page.margins.right
}

function contentBottom(doc: Doc): number {
  // Where body content must stop (leaves room for the footer band).
  return doc.page.height - doc.page.margins.bottom - FOOTER_HEIGHT
}

function paintPageBackground(doc: Doc) {
  // Save graphics state, paint full-bleed background, draw a top accent bar.
  doc.save()
  doc.fillColor(BG).rect(0, 0, doc.page.width, doc.page.height).fill()
  // Slim neon strip at the very top
  doc.fillColor(ACCENT).rect(0, 0, doc.page.width, 4).fill()
  doc.restore()
}

function ensureSpace(doc: Doc, minRemaining: number) {
  if (doc.y + minRemaining > contentBottom(doc)) doc.addPage()
}

function hairline(doc: Doc, opts: { full?: boolean } = {}) {
  ensureSpace(doc, 12)
  const y = doc.y
  const xStart = opts.full ? 0 : doc.page.margins.left
  const xEnd = opts.full ? doc.page.width : doc.page.width - doc.page.margins.right
  doc.save()
  doc.strokeColor(HAIR).lineWidth(0.5).moveTo(xStart, y).lineTo(xEnd, y).stroke()
  doc.restore()
  doc.y = y + 10
}

function sectionHeading(doc: Doc, label: string) {
  ensureSpace(doc, 80)
  doc.moveDown(0.9)
  doc.x = doc.page.margins.left
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(8.5)
    .text(`// ${label.toUpperCase()}`, doc.page.margins.left, doc.y, {
      width: contentWidth(doc),
      characterSpacing: 1.3,
    })
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(15)
    .text(label, doc.page.margins.left, doc.y, {
      width: contentWidth(doc),
      lineGap: 2,
    })
  doc.moveDown(0.5)
}

function bullet(doc: Doc, text: string, opts: { indent?: number } = {}) {
  if (!text || !text.trim()) return
  ensureSpace(doc, 24)
  const indent = opts.indent ?? 0
  const x = doc.page.margins.left + indent
  const bulletGap = 14
  const textX = x + bulletGap
  const textWidth = doc.page.width - doc.page.margins.right - textX
  const startY = doc.y

  doc.save()
  doc.fillColor(ACCENT).circle(x + 3.5, startY + 5.5, 1.7).fill()
  doc.restore()

  doc.fillColor(INK).font('Helvetica').fontSize(10.5)
    .text(text, textX, startY, {
      width: textWidth,
      lineGap: 2,
      align: 'left',
    })
  doc.moveDown(0.15)
}

function checkBullet(doc: Doc, text: string) {
  if (!text || !text.trim()) return
  ensureSpace(doc, 26)
  const x = doc.page.margins.left
  const bulletGap = 18
  const textX = x + bulletGap
  const textWidth = doc.page.width - doc.page.margins.right - textX
  const startY = doc.y

  // Draw a vector check-mark in accent neon
  doc.save()
  doc.strokeColor(ACCENT).lineWidth(1.4).lineCap('round').lineJoin('round')
    .moveTo(x + 1, startY + 6)
    .lineTo(x + 5, startY + 10)
    .lineTo(x + 12, startY + 3)
    .stroke()
  doc.restore()

  doc.fillColor(INK).font('Helvetica').fontSize(10.5)
    .text(text, textX, startY, {
      width: textWidth,
      lineGap: 2,
      align: 'left',
    })
  doc.moveDown(0.2)
}

function paragraph(doc: Doc, text: string) {
  if (!text || !text.trim()) return
  ensureSpace(doc, 32)
  doc.x = doc.page.margins.left
  doc.fillColor(INK).font('Helvetica').fontSize(10.5)
    .text(text, doc.page.margins.left, doc.y, {
      width: contentWidth(doc),
      lineGap: 4,
      align: 'left',
    })
  doc.moveDown(0.6)
}

function infoRow(doc: Doc, label: string, value: string) {
  if (!value || !value.trim()) return
  ensureSpace(doc, 22)
  const labelW = 110
  const startY = doc.y

  doc.fillColor(SOFT).font('Helvetica-Bold').fontSize(8.5)
    .text(label.toUpperCase(), doc.page.margins.left, startY + 2, {
      width: labelW,
      characterSpacing: 1.2,
    })

  doc.y = startY
  doc.fillColor(INK).font('Helvetica').fontSize(10.5)
    .text(value, doc.page.margins.left + labelW, startY, {
      width: contentWidth(doc) - labelW,
      lineGap: 2,
    })
  doc.moveDown(0.2)
}

function moduleHeading(doc: Doc, num: number, title: string) {
  if (!title || !title.trim()) return
  ensureSpace(doc, 56)
  doc.moveDown(0.35)
  const startY = doc.y
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(11)
    .text(String(num).padStart(2, '0'), doc.page.margins.left, startY, {
      width: 26,
      lineBreak: false,
    })
  doc.y = startY
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(12)
    .text(title, doc.page.margins.left + 26, startY, {
      width: contentWidth(doc) - 26,
      lineGap: 2,
    })
  doc.moveDown(0.15)
}

function drawCover(doc: Doc, title: string, description: string) {
  // Reset cursor to content area (background was painted by pageAdded handler)
  doc.x = doc.page.margins.left
  doc.y = doc.page.margins.top + 6

  // Brand logo (white-on-transparent so it sits cleanly on the dark page)
  if (fs.existsSync(LOGO_PATH)) {
    try {
      doc.image(LOGO_PATH, doc.page.margins.left, doc.y, { height: 28 })
    } catch {
      /* fall through to text-only header */
    }
    doc.y += 34
  } else {
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(13)
      .text(BRAND, doc.page.margins.left, doc.y, { width: contentWidth(doc), characterSpacing: 1.8 })
    doc.y += 6
  }

  doc.fillColor(SOFT).font('Helvetica').fontSize(9)
    .text(TAGLINE, doc.page.margins.left, doc.y, { width: contentWidth(doc) })

  doc.moveDown(1.6)

  doc.fillColor(INK).font('Helvetica-Bold').fontSize(26)
    .text(title, doc.page.margins.left, doc.y, {
      width: contentWidth(doc),
      lineGap: 4,
    })

  doc.moveDown(0.4)

  doc.fillColor(ACCENT).font('Helvetica-Oblique').fontSize(11.5)
    .text('Course Syllabus', doc.page.margins.left, doc.y, {
      width: contentWidth(doc),
      characterSpacing: 0.6,
    })

  doc.moveDown(0.7)

  doc.fillColor(SOFT).font('Helvetica').fontSize(10.5)
    .text(description, doc.page.margins.left, doc.y, {
      width: contentWidth(doc),
      lineGap: 3,
      align: 'left',
    })

  doc.moveDown(0.8)
  hairline(doc, { full: true })
}

function drawFooter(doc: Doc) {
  const range = doc.bufferedPageRange()
  // Footer text MUST satisfy: footerY + lineHeight ≤ page.height - margins.bottom
  // so pdfkit's auto-pagination doesn't fire. With margins.bottom = 22 and 8pt
  // text (lineHeight ≈ 10), max footerY is page.height - 32. We pick 808 to keep
  // a slim 12pt visual margin below the footer text.
  const footerY = doc.page.height - 44
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)

    // Hairline above the footer
    doc.save()
    doc.strokeColor(HAIR).lineWidth(0.5)
      .moveTo(0, footerY - 6)
      .lineTo(doc.page.width, footerY - 6)
      .stroke()
    doc.restore()

    doc.fillColor(SOFT).font('Helvetica').fontSize(7)
      .text(ADDRESS, doc.page.margins.left, footerY, { width: contentWidth(doc) - 78, align: 'left', lineBreak: false, height: 9 })
      .text(
        `Page ${i - range.start + 1} of ${range.count}`,
        doc.page.margins.left + contentWidth(doc) - 78,
        footerY,
        { width: 78, align: 'right', lineBreak: false, height: 9 },
      )
    doc.fillColor(SOFT).font('Helvetica').fontSize(7)
      .text(`${PHONE}   ·   ${EMAIL}   ·   ${WEBSITE}`, doc.page.margins.left, footerY + 10, { width: contentWidth(doc), align: 'left', lineBreak: false, height: 9 })
  }
}

async function generate(slug: string): Promise<void> {
  const course = trainingData[slug]
  if (!course) throw new Error(`Unknown course slug: ${slug}`)

  // QR generated up front so we can embed it synchronously into the PDF stream.
  const qrUrl = `https://www.armourinfosec.com/training/${slug}/`
  const qrBuffer = await QRCode.toBuffer(qrUrl, {
    type: 'png',
    width: 220,
    margin: 1,
    errorCorrectionLevel: 'M',
    color: { dark: '#0b1220', light: '#ffffff' },
  })

  return new Promise((resolve, reject) => {
    const filePath = path.join(OUT_DIR, `${slug}.pdf`)
    const stream = fs.createWriteStream(filePath)
    const doc = new PDFDocument({
      size: PAGE.size,
      margins: PAGE.margins,
      bufferPages: true,
      info: {
        Title: `${course.title}${course.highlight ? ' ' + course.highlight : ''} – Syllabus`,
        Author: BRAND,
        Subject: 'Course Syllabus',
        Keywords: 'cybersecurity, training, syllabus, Indore',
      },
    })

    // Paint background on every page (including the auto-created first page)
    paintPageBackground(doc)
    doc.on('pageAdded', () => paintPageBackground(doc))

    doc.pipe(stream)

    const fullTitle = [course.title, course.highlight].filter(Boolean).join(' ').trim()
    drawCover(doc, fullTitle, course.description)

    sectionHeading(doc, 'Course Information')
    infoRow(doc, 'Duration', `${course.duration.months} Months / ${course.duration.weeks} Weeks / ${course.duration.totalHours} Hours`)
    infoRow(doc, 'Level', course.level)
    infoRow(doc, 'Modules', String(course.modules.length))
    infoRow(doc, 'Course Fee', course.price.replace('₹', 'Rs '))
    infoRow(doc, 'Format', 'Hands-on Labs / Hybrid (Online + Indore Classroom)')

    if (course.overview?.trim()) {
      sectionHeading(doc, 'Course Overview')
      paragraph(doc, course.overview)
    }

    const outcomes = (course.outcomes ?? []).filter((o) => o && o.trim())
    if (outcomes.length) {
      sectionHeading(doc, 'Learning Objectives')
      for (const o of outcomes) bullet(doc, o)
    }

    const prereqs = (course.prerequisites ?? []).filter((p) => p && p.trim())
    if (prereqs.length) {
      sectionHeading(doc, 'Prerequisites')
      for (const p of prereqs) bullet(doc, p)
    }

    const modules = (course.modules ?? []).filter((m) => m && m.title?.trim())
    if (modules.length) {
      sectionHeading(doc, 'Module Breakdown')
      modules.forEach((mod, i) => {
        moduleHeading(doc, i + 1, mod.title)
        for (const topic of (mod.topics ?? []).filter((t) => t && t.trim())) {
          bullet(doc, topic, { indent: 16 })
        }
      })
    }

    const labs = (course.labEnvironment ?? []).filter((l) => l && l.trim())
    if (labs.length) {
      sectionHeading(doc, 'Tools & Hands-On Labs')
      for (const lab of labs) bullet(doc, lab)
    }

    // Training mode — hybrid online + on-premise (every course)
    sectionHeading(doc, 'Training Mode')
    paragraph(doc, 'Every Armour Infosec course runs as a unified programme delivered in two parallel modes — the same curriculum, the same trainers, the same certification, regardless of how you join.')
    checkBullet(doc, 'Online Live Classes — real-time, instructor-led, fully interactive sessions')
    checkBullet(doc, 'On-Premise Classroom Training — in-person at our Indore centre (Sudama Nagar)')
    checkBullet(doc, 'Both modes run concurrently in every batch; switch between them as your schedule needs')
    checkBullet(doc, 'Same syllabus, lab access, and certification track for online and on-premise students')

    const certs = (course.certPrep ?? []).filter((c) => c && c.trim())
    if (certs.length) {
      sectionHeading(doc, 'Certifications & Career Outcomes')
      paragraph(doc, 'This course aligns with industry-recognised certifications and prepares graduates for offensive-security, application-security, and infrastructure-security roles.')
      for (const c of certs) {
        if (c.startsWith('OSCP+')) {
          bullet(doc, `${c}  —  Advanced Offensive Security Certification`)
        } else {
          bullet(doc, c)
        }
      }
    }

    sectionHeading(doc, 'Enrol With Armour Infosec')
    paragraph(doc, 'Reach out to discuss enrolment, batch schedule, and lab access. Our Indore training centre runs both in-person and live online cohorts with placement assistance.')
    infoRow(doc, 'Phone', '+91 99777 47168')
    infoRow(doc, 'Email', 'info@armourinfosec.com')
    infoRow(doc, 'Address', '674, Sudama Dwar, Narendra Tiwari Marg, Sudama Nagar, Indore, Madhya Pradesh 452009')
    infoRow(doc, 'Website', 'https://armourinfosec.com')

    // QR card — anchored centred below the contact rows on the final page
    doc.moveDown(1)
    const qrSize = 96
    const qrPad = 8
    const cardSize = qrSize + qrPad * 2
    const qrX = (doc.page.width - cardSize) / 2
    ensureSpace(doc, cardSize + 28)
    const qrY = doc.y
    // Light card under the QR so dark-on-white squares stay scannable
    doc.save()
    doc.fillColor('#ffffff').rect(qrX, qrY, cardSize, cardSize).fill()
    doc.strokeColor(ACCENT).lineWidth(1).rect(qrX, qrY, cardSize, cardSize).stroke()
    doc.restore()
    doc.image(qrBuffer, qrX + qrPad, qrY + qrPad, { width: qrSize })
    doc.fillColor(SOFT).font('Helvetica-Bold').fontSize(9)
      .text('Scan to View Course Online', doc.page.margins.left, qrY + cardSize + 6, {
        width: contentWidth(doc),
        align: 'center',
        characterSpacing: 0.6,
      })
    doc.fillColor(SOFT).font('Helvetica').fontSize(8)
      .text(qrUrl, doc.page.margins.left, doc.y + 2, {
        width: contentWidth(doc),
        align: 'center',
        link: qrUrl,
      })

    drawFooter(doc)
    doc.end()

    stream.on('finish', resolve)
    stream.on('error', reject)
  })
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const slugs = Object.keys(trainingData)
  console.log(`Generating ${slugs.length} syllabus PDFs into public/syllabus/ (dark theme + logo)`)
  for (const slug of slugs) {
    process.stdout.write(`  ${slug} … `)
    await generate(slug)
    const size = (fs.statSync(path.join(OUT_DIR, `${slug}.pdf`)).size / 1024).toFixed(1)
    console.log(`${size} KB`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
