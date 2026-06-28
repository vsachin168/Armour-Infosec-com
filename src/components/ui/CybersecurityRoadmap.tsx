'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { trainingData } from '@/data/training'
import {
  ROADMAP_TIERS as TIERS,
  ROADMAP_CAPSTONE as CAPSTONE,
  type RoadmapCourse as CourseRef,
  type RoadmapTier as Tier,
} from '@/data/roadmap'

type ResolvedCourse = {
  name: string
  color: string
  level: string
  count: number
  modules: string[]
  href: string
}

function fmtLevel(level: string) {
  return level.replace(/\s+to\s+/i, ' → ')
}

function resolveCourse(c: CourseRef): ResolvedCourse {
  if (c.key && trainingData[c.key]) {
    const d = trainingData[c.key]
    return {
      name: c.name,
      color: c.color,
      level: fmtLevel(d.level),
      count: d.modules.length,
      modules: d.modules.map((m) => m.title),
      href: `/training/${c.key}/`,
    }
  }
  return {
    name: c.name,
    color: c.color,
    level: c.level ?? '',
    count: c.modules?.length ?? 0,
    modules: c.modules ?? [],
    href: c.href ?? '/training/',
  }
}

const TOTAL_COURSES = TIERS.reduce((n, t) => n + t.courses.length, 0)
const TOTAL_MODULES = TIERS.reduce(
  (n, t) => n + t.courses.reduce((m, c) => m + resolveCourse(c).count, 0),
  0
)
const TOTAL_TIERS = TIERS.length + 1 // + capstone

type ModalState = {
  kicker: string
  title: string
  sub: string
  accent: string
  single: boolean
  courses: { course: ResolvedCourse; href: string }[]
}

export function CybersecurityRoadmap() {
  const [modal, setModal] = useState<ModalState | null>(null)

  const close = useCallback(() => setModal(null), [])

  const openCourse = useCallback((c: CourseRef) => {
    const r = resolveCourse(c)
    setModal({
      kicker: '// COURSE · MODULE ROADMAP',
      title: r.name,
      sub: `${r.count} modules · the complete learning path for this course`,
      accent: c.color,
      single: true,
      courses: [{ course: r, href: r.href }],
    })
  }, [])

  const openTier = useCallback((t: Tier) => {
    const courses = t.courses.map((c) => {
      const r = resolveCourse(c)
      return { course: r, href: r.href }
    })
    setModal({
      kicker: `// ${t.label.toUpperCase()} · MODULE ROADMAP`,
      title: t.label,
      sub: `${courses.length} course${courses.length > 1 ? 's' : ''} · click a course title to open its page`,
      accent: t.accent,
      single: false,
      courses,
    })
  }, [])

  // Escape to close + lock body scroll while open
  useEffect(() => {
    if (!modal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [modal, close])

  const renderNode = (c: CourseRef, side: 'left' | 'right') => {
    const r = resolveCourse(c)
    return (
      <button
        type="button"
        className={`cr-node ${side}`}
        style={{ ['--c' as string]: c.color }}
        onClick={() => openCourse(c)}
        aria-label={`Open module roadmap for ${r.name}`}
      >
        <b>{r.name}</b>
        <span className="cr-meta">
          {r.level && <span className="cr-lvl">{r.level}</span>}
          <span className="cr-cnt">{r.count} modules</span>
        </span>
        {/* arrow points toward the central path */}
        <span className="cr-arrow" aria-hidden="true">{side === 'right' ? '←' : '→'}</span>
      </button>
    )
  }

  return (
    <div className="cr">
      {/* stat row */}
      <div className="cr-stats">
        <div><b>{TOTAL_COURSES}</b><span>courses</span></div>
        <i aria-hidden="true" />
        <div><b>{TOTAL_MODULES}</b><span>modules</span></div>
        <i aria-hidden="true" />
        <div><b>{TOTAL_TIERS}</b><span>tiers</span></div>
      </div>
      <p className="cr-hint">↳ click a tier pill — or any course — to open its module roadmap</p>

      <div className="cr-map">
        <div className="cr-spine" aria-hidden="true" />

        {TIERS.map((t) => (
          <div key={t.id} className="cr-tier">
            <button
              type="button"
              className="cr-pill"
              style={{ ['--t' as string]: t.pill }}
              onClick={() => openTier(t)}
            >
              <i>{t.id}</i> {t.label} <span className="cr-open">⤢ modules</span>
            </button>

            {t.core ? (
              <div className="cr-center">
                <button
                  type="button"
                  className="cr-node cr-core"
                  style={{ ['--c' as string]: t.courses[0].color }}
                  onClick={() => openCourse(t.courses[0])}
                >
                  <b>{resolveCourse(t.courses[0]).name}</b>
                  <span className="cr-meta">
                    <span className="cr-lvl">{resolveCourse(t.courses[0]).level}</span>
                    <span className="cr-cnt">{resolveCourse(t.courses[0]).count} modules</span>
                  </span>
                </button>
              </div>
            ) : (
              <div className="cr-steps">
                {t.courses.map((c) => (
                  <div key={c.name} className={`cr-step ${c.side ?? 'left'}`} style={{ ['--c' as string]: c.color }}>
                    {renderNode(c, (c.side ?? 'left') as 'left' | 'right')}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Capstone */}
        <div className="cr-tier">
          <button
            type="button"
            className="cr-pill"
            style={{ ['--t' as string]: 'linear-gradient(135deg,#d97706,#ea580c)' }}
            onClick={() =>
              setModal({
                kicker: '// CAPSTONE · CISE PROGRAM',
                title: CAPSTONE.name,
                sub: 'The complete program that unifies every track',
                accent: '#d97706',
                single: true,
                courses: [{ course: resolveCourse(CAPSTONE), href: CAPSTONE.href ?? '/training/' }],
              })
            }
          >
            <i>04</i> Capstone <span className="cr-open">⤢ details</span>
          </button>
          <Link href="/training/" className="cr-capstone">
            <span className="cr-trophy" aria-hidden="true">🏆</span>
            <span className="cr-k">// CISE</span>
            <b>Certified Information Security Expert</b>
            <p>The complete program that unifies every track into one career-defining qualification.</p>
            <span className="cr-cappill">all {TOTAL_COURSES} courses · {TOTAL_MODULES} modules</span>
          </Link>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="cr-ov" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="cr-modal" style={{ ['--c' as string]: modal.accent }} role="dialog" aria-modal="true" aria-label={modal.title}>
            <button type="button" className="cr-x" onClick={close} aria-label="Close">✕</button>
            <div className="cr-mk">{modal.kicker}</div>
            <h3 className="cr-mt">{modal.title}</h3>
            <p className="cr-sub">{modal.sub}</p>
            <div className="cr-mbody">
              {modal.courses.map(({ course, href }) => (
                <div key={course.name} className="cr-course" style={{ ['--c' as string]: course.color }}>
                  {modal.single ? (
                    <Link className="cr-cta" href={href}>View full course page →</Link>
                  ) : (
                    <Link className="cr-cn" href={href}>
                      {course.name}<span className="cr-go">view course →</span>
                    </Link>
                  )}
                  <div className="cr-mini">
                    {course.modules.map((m, i) => (
                      <span key={m + i} className="cr-mwrap">
                        {i > 0 && <span className="cr-arr" aria-hidden="true">❯</span>}
                        <span className="cr-mnode"><span className="cr-nn">{i + 1}</span>{m}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .cr {
          --ink: var(--color-ink);
          --soft: var(--color-ink-soft);
          --line: var(--color-cyber-border);
          --card: var(--color-cyber-card);
          --accent: var(--color-accent);
          color: var(--ink);
          max-width: 1000px;
          margin: 0 auto;
        }
        .cr-stats { display: flex; align-items: center; justify-content: center; gap: 22px; margin: 4px 0 6px; }
        .cr-stats > div { text-align: center; }
        .cr-stats b { display: block; font-size: 26px; font-weight: 800; letter-spacing: -.02em; }
        .cr-stats span { font-size: 12px; color: var(--soft); }
        .cr-stats i { width: 1px; height: 30px; background: var(--line); }
        .cr-hint { text-align: center; color: var(--soft); font-size: 13px; margin: 0 0 6px; }

        .cr-map { position: relative; padding: 12px 0; }
        .cr-spine {
          position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; transform: translateX(-50%);
          z-index: 0; opacity: .7;
          background: linear-gradient(to bottom,#16a34a,#0d9488,#2563eb,#7c3aed,#c026d3,#ea580c);
          -webkit-mask: repeating-linear-gradient(to bottom,#000 0 8px,transparent 8px 16px);
                  mask: repeating-linear-gradient(to bottom,#000 0 8px,transparent 8px 16px);
        }

        .cr-tier { position: relative; }
        .cr-pill {
          display: flex; width: max-content; margin: 16px auto 8px; align-items: center; gap: 8px;
          background: var(--t); color: #fff; padding: 8px 18px; border-radius: 99px; font-weight: 700;
          font-size: 13px; border: 0; cursor: pointer; position: relative; z-index: 2;
          box-shadow: 0 10px 22px -12px rgba(11,18,32,.5); transition: .15s;
        }
        .cr-pill:hover { filter: brightness(1.12); transform: translateY(-1px) scale(1.02); }
        .cr-pill i { font-family: ui-monospace,Menlo,monospace; font-style: normal; color: rgba(255,255,255,.72); }
        .cr-open { font-size: 11px; opacity: .75; font-weight: 600; }

        /* alternating one-by-one timeline */
        .cr-steps { position: relative; z-index: 2; margin: 14px 0; }
        .cr-step { display: grid; grid-template-columns: 1fr 1fr; column-gap: 64px; align-items: center; margin: 26px 0; position: relative; }
        .cr-step.left :global(.cr-node) { grid-column: 1; justify-self: end; }
        .cr-step.right :global(.cr-node) { grid-column: 2; justify-self: start; }
        .cr-step::before {
          content: ''; position: absolute; left: 50%; top: 50%; width: 12px; height: 12px; border-radius: 50%;
          background: var(--card); border: 3px solid var(--c,var(--accent)); transform: translate(-50%,-50%);
          z-index: 3; box-shadow: 0 0 0 4px var(--color-cyber-darker);
        }

        .cr-center { position: relative; z-index: 2; display: flex; justify-content: center; margin: 14px 0; }

        .cr-map :global(.cr-node) {
          position: relative; display: block; text-align: left; background: var(--card);
          border: 1px solid var(--line); border-left: 4px solid var(--c,var(--accent)); border-radius: 10px;
          padding: 10px 13px; width: 300px; max-width: 100%; color: var(--ink); cursor: pointer;
          box-shadow: 0 2px 5px rgba(11,18,32,.05); transition: .16s; font: inherit;
        }
        .cr-map :global(.cr-node:hover) {
          transform: translateY(-2px); border-color: var(--c,var(--accent));
          box-shadow: 0 14px 28px -14px color-mix(in srgb, var(--c,var(--accent)) 55%, transparent);
        }
        .cr-map :global(.cr-node b) { display: block; font-size: 13px; line-height: 1.25; }
        .cr-map :global(.cr-node .cr-meta) { display: flex; align-items: center; gap: 8px; margin-top: 5px; flex-wrap: wrap; }
        .cr-map :global(.cr-node .cr-lvl) { font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--c,var(--accent)); }
        .cr-map :global(.cr-node .cr-cnt) { font-size: 10px; font-weight: 700; color: var(--soft); background: var(--color-cyber-darker); border: 1px solid var(--line); border-radius: 99px; padding: 1px 8px; }
        /* hover arrow — points toward the central spine (left cards →, right cards ←) */
        .cr-map :global(.cr-node.left) { padding-right: 30px; }
        .cr-map :global(.cr-node.right) { padding-left: 30px; }
        .cr-map :global(.cr-node .cr-arrow) { position: absolute; top: 50%; transform: translateY(-50%); color: var(--c,var(--accent)); font-weight: 800; font-size: 15px; opacity: 0; transition: .2s; }
        .cr-map :global(.cr-node.left .cr-arrow) { right: 11px; }
        .cr-map :global(.cr-node.right .cr-arrow) { left: 11px; }
        .cr-map :global(.cr-node.left:hover .cr-arrow) { opacity: 1; right: 8px; }
        .cr-map :global(.cr-node.right:hover .cr-arrow) { opacity: 1; left: 8px; }
        .cr-map :global(.cr-node.cr-core) {
          width: 340px; text-align: center; border-left-width: 0; border: 2px solid var(--accent);
          box-shadow: 0 0 0 4px var(--color-accent-glow);
        }
        .cr-core :global(.cr-meta) { justify-content: center; }

        /* :global so the rules apply to the Next <Link> element (styled-jsx
           does not scope component classNames), anchored under .cr-map */
        .cr-map :global(.cr-capstone) {
          position: relative; z-index: 2; display: block; margin: 16px auto 0; max-width: 460px;
          border-radius: 16px; padding: 22px 24px; text-align: center; text-decoration: none; color: #fff;
          background: linear-gradient(135deg,#2f6bff,#1d4ed8); box-shadow: 0 22px 44px -18px rgba(47,107,255,.6); transition: .18s;
        }
        .cr-map :global(.cr-capstone:hover) { transform: translateY(-2px); box-shadow: 0 28px 52px -18px rgba(47,107,255,.7); }
        .cr-trophy { font-size: 26px; }
        .cr-k { display: block; font-family: ui-monospace,Menlo,monospace; font-size: 11px; letter-spacing: .1em; opacity: .85; margin-top: 4px; }
        .cr-map :global(.cr-capstone) b { display: block; font-size: 18px; margin: 6px 0; }
        .cr-map :global(.cr-capstone) p { margin: 0; font-size: 12.5px; opacity: .9; line-height: 1.5; }
        .cr-cappill { display: inline-block; margin-top: 12px; background: rgba(255,255,255,.18); padding: 6px 14px; border-radius: 99px; font-size: 12px; font-weight: 700; }

        /* modal */
        .cr-ov { position: fixed; inset: 0; background: rgba(7,11,20,.62); backdrop-filter: blur(3px); display: flex; align-items: flex-start; justify-content: center; padding: 30px 16px; z-index: 60; overflow: auto; }
        .cr-modal { background: var(--card); border-radius: 18px; border-top: 6px solid var(--c,var(--accent)); max-width: 840px; width: 100%; padding: 26px 28px 34px; box-shadow: 0 30px 70px -20px rgba(0,0,0,.6); position: relative; }
        .cr-x { position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border-radius: 9px; border: 1px solid var(--line); background: var(--card); cursor: pointer; font-size: 15px; color: var(--soft); transition: .15s; }
        .cr-x:hover { background: var(--c,var(--accent)); color: #fff; border-color: transparent; }
        .cr-mk { font-family: ui-monospace,Menlo,monospace; font-size: 12px; color: var(--c,var(--accent)); font-weight: 700; letter-spacing: .06em; }
        .cr-mt { font-size: 23px; margin: 6px 0 4px; letter-spacing: -.02em; color: var(--ink); }
        .cr-sub { color: var(--soft); font-size: 13.5px; margin: 0 0 18px; }
        .cr-course { margin: 22px 0 6px; padding: 14px 16px; border-left: 4px solid var(--c,var(--accent)); border-radius: 0 12px 12px 0; background: color-mix(in srgb, var(--c,var(--accent)) 6%, var(--card)); }
        .cr :global(.cr-cn) { font-weight: 700; font-size: 15px; color: var(--ink); text-decoration: none; cursor: pointer; }
        .cr :global(.cr-cn:hover) { color: var(--c,var(--accent)); }
        .cr-go { font-size: 11px; color: var(--c,var(--accent)); font-weight: 600; margin-left: 6px; }
        .cr :global(.cr-cta) { display: inline-flex; align-items: center; gap: 6px; background: var(--c,var(--accent)); color: #fff; text-decoration: none; font-size: 12.5px; font-weight: 700; padding: 8px 15px; border-radius: 9px; box-shadow: 0 8px 18px -8px var(--c,var(--accent)); transition: .15s; }
        .cr :global(.cr-cta:hover) { filter: brightness(1.08); transform: translateY(-1px); }
        .cr-mini { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 13px 0 2px; }
        .cr-mwrap { display: inline-flex; align-items: center; gap: 8px; }
        .cr-mnode { display: inline-flex; align-items: center; gap: 7px; background: var(--card); border: 1px solid var(--line); border-radius: 9px; padding: 6px 11px 6px 7px; font-size: 12.5px; color: var(--ink); box-shadow: 0 1px 2px rgba(11,18,32,.04); transition: .15s; }
        .cr-mnode:hover { border-color: var(--c,var(--accent)); transform: translateY(-1px); box-shadow: 0 8px 16px -10px rgba(11,18,32,.4); }
        .cr-nn { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; background: var(--c,var(--accent)); color: #fff; font-size: 10px; font-weight: 800; font-family: ui-monospace,Menlo,monospace; }
        .cr-arr { color: var(--c,var(--accent)); font-weight: 800; font-size: 13px; opacity: .55; }

        @media (max-width: 680px) {
          .cr-spine { left: 22px; }
          .cr-step { grid-template-columns: 1fr; column-gap: 0; }
          .cr-step.left :global(.cr-node), .cr-step.right :global(.cr-node) { grid-column: 1; justify-self: start; margin-left: 46px; }
          .cr-step::before { left: 22px; }
          .cr-map :global(.cr-node), .cr-map :global(.cr-node.cr-core) { width: 100%; }
          .cr-center { justify-content: flex-start; padding-left: 46px; }
        }
      `}</style>
    </div>
  )
}
