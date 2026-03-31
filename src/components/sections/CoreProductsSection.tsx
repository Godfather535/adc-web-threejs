import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useI18n } from '../../i18n/useI18n'
import styles from './CoreProductsSection.module.css'

const ease = 'none'

const barHeightsPct = [38, 62, 48, 88, 55, 72, 44, 68]

const headerStats = [
  { value: '4', label: 'Modules' },
  { value: '1', label: 'Record' },
  { value: 'API', label: 'Native' },
] as const

const headerStatsDe = [
  { value: '4', label: 'Module' },
  { value: '1', label: 'Datensatz' },
  { value: 'API', label: 'Nativ' },
] as const

const easyChips = [
  { key: 'Load', val: 'ACWR + sRPE' },
  { key: 'Med', val: 'HIPAA-ready' },
  { key: 'Sync', val: 'Roster ↔ EMR' },
] as const

const easyChipsDe = [
  { key: 'Last', val: 'ACWR + sRPE' },
  { key: 'Med', val: 'HIPAA-bereit' },
  { key: 'Sync', val: 'Roster ↔ EMR' },
] as const

const meshSpecs = ['Consent graph', 'Immutable audit', 'Partner vaults'] as const
const msgSpecs = ['E2E encrypted', 'Retention rules', 'Staff channels'] as const

const meshSpecsDe = ['Consent graph', 'Unveränderliche Audit-Protokolle', 'Partner-Tresore'] as const
const msgSpecsDe = ['End-to-End verschlüsselt', 'Retention-Regeln', 'Staff-Channels'] as const

const infraMetrics = [
  { val: '3.1', lab: 'OpenAPI' },
  { val: 'mTLS', lab: 'In transit' },
  { val: 'EU · US', lab: 'Regions' },
] as const

const infraMetricsDe = [
  { val: '3.1', lab: 'OpenAPI' },
  { val: 'mTLS', lab: 'Unterwegs' },
  { val: 'EU · US', lab: 'Regionen' },
] as const

const infraTags = ['REST', 'Webhooks', 'SSO / SCIM'] as const

const infraEndpoints = [
  { method: 'POST', path: '/v1/events/ingest', status: 'Live' },
  { method: 'GET', path: '/v1/roster/{id}/snapshot', status: 'Live' },
  { method: 'SIG', path: 'webhooks.signed_payload', status: 'HMAC' },
] as const

const infraEndpointsDe = [
  { method: 'POST', path: '/v1/events/ingest', status: 'Live' },
  { method: 'GET', path: '/v1/roster/{id}/snapshot', status: 'Live' },
  { method: 'SIG', path: 'webhooks.signed_payload', status: 'HMAC' },
] as const

function InfraMeshSvg({ reduceMotion }: { reduceMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([])

  useLayoutEffect(() => {
    if (reduceMotion) return
    const wrap = wrapRef.current
    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[]
    if (!wrap || paths.length < 2) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top 85%',
          end: 'top 38%',
          scrub: 1,
        },
      })
      paths.forEach((path, i) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
        tl.to(
          path,
          { strokeDashoffset: 0, opacity: 1, duration: 1, ease },
          i * 0.2,
        )
      })
    }, wrap)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <div ref={wrapRef} className={styles.infraSvgWrap}>
      <svg
        className={styles.infraSvg}
        viewBox="0 0 400 240"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="adcInfraLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="45%" stopColor="#00ffc6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={(el) => {
            pathRefs.current[0] = el
          }}
          d="M 0 160 Q 120 60 200 120 T 400 80"
          fill="none"
          stroke="url(#adcInfraLine)"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={(el) => {
            pathRefs.current[1] = el
          }}
          d="M 40 240 Q 180 120 320 40"
          fill="none"
          stroke="url(#adcInfraLine)"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

function MiniBars({ reduceMotion }: { reduceMotion: boolean }) {
  const chartRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    const bars = chart.querySelectorAll<HTMLElement>('[data-mini-bar]')
    if (!bars.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bars,
        { scaleY: reduceMotion ? 1 : 0 },
        {
          scaleY: 1,
          stagger: reduceMotion ? 0 : 0.04,
          ease,
          transformOrigin: 'bottom',
          scrollTrigger: {
            trigger: chart,
            start: 'top 92%',
            end: 'top 52%',
            scrub: 1,
          },
        },
      )
    }, chart)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <div ref={chartRef} className={styles.miniChart}>
      {barHeightsPct.map((h, i) => (
        <div
          key={i}
          data-mini-bar
          className={styles.miniBar}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

export function CoreProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const recordsRevealRef = useRef<HTMLDivElement>(null)
  const infraRevealRef = useRef<HTMLDivElement>(null)
  const { lang } = useI18n()

  const headerStatsDisplay = lang === 'de' ? headerStatsDe : headerStats
  const easyChipsDisplay = lang === 'de' ? easyChipsDe : easyChips
  const meshSpecsDisplay = lang === 'de' ? meshSpecsDe : meshSpecs
  const msgSpecsDisplay = lang === 'de' ? msgSpecsDe : msgSpecs
  const infraMetricsDisplay = lang === 'de' ? infraMetricsDe : infraMetrics
  const infraEndpointsDisplay = lang === 'de' ? infraEndpointsDe : infraEndpoints

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const header = section.querySelector<HTMLElement>(`.${styles.headerBlock}`)
      if (header) {
        const eyebrow = header.querySelector<HTMLElement>(`.${styles.eyebrow}`)
        const title = header.querySelector<HTMLElement>('#products-heading')
        const chips = header.querySelectorAll<HTMLElement>(`.${styles.statChip}`)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            end: 'top 34%',
            scrub: 1,
          },
        })

        const blurA = reduce ? {} : { filter: 'blur(10px)' }
        const blurB = reduce ? {} : { filter: 'blur(0px)' }

        if (eyebrow) {
          tl.fromTo(
            eyebrow,
            { opacity: 0, y: 22, ...blurA },
            { opacity: 1, y: 0, ...blurB, duration: 1 },
            0,
          )
        }
        if (title) {
          tl.fromTo(
            title,
            { opacity: 0, y: 22, ...blurA },
            { opacity: 1, y: 0, ...blurB, duration: 1 },
            0.1,
          )
        }
        if (chips.length) {
          tl.fromTo(
            chips,
            { opacity: 0, y: 14, scale: 0.96, ...blurA },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ...blurB,
              stagger: 0.07,
              duration: 1,
            },
            0.18,
          )
        }
      }

      const recordsWrap = recordsRevealRef.current
      if (recordsWrap) {
        gsap.fromTo(
          recordsWrap,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease,
            scrollTrigger: {
              trigger: recordsWrap,
              start: 'top 90%',
              end: 'top 46%',
              scrub: 1,
            },
          },
        )

        const body = recordsWrap.querySelector<HTMLElement>(`.${styles.recordsBody}`)
        if (body) {
          const kids = Array.from(body.children) as HTMLElement[]
          const blurA = reduce ? {} : { filter: 'blur(10px)' }
          const blurB = reduce ? {} : { filter: 'blur(0px)' }
          gsap.fromTo(
            kids,
            { opacity: 0, y: 18, ...blurA },
            {
              opacity: 1,
              y: 0,
              ...blurB,
              stagger: 0.06,
              ease,
              scrollTrigger: {
                trigger: body,
                start: 'top 88%',
                end: 'top 40%',
                scrub: 1,
              },
            },
          )
        }
      }

      const row2 = section.querySelector<HTMLElement>(`.${styles.row2}`)
      if (row2) {
        const articles = row2.querySelectorAll<HTMLElement>('article')
        gsap.fromTo(
          articles,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease,
            scrollTrigger: {
              trigger: row2,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 1,
            },
          },
        )
      }

      const infraWrap = infraRevealRef.current
      if (infraWrap) {
        gsap.fromTo(
          infraWrap,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            ease,
            scrollTrigger: {
              trigger: infraWrap,
              start: 'top 90%',
              end: 'top 44%',
              scrub: 1,
            },
          },
        )

        const left = infraWrap.querySelector<HTMLElement>(`.${styles.infraLeft}`)
        if (left) {
          const blurA = reduce ? {} : { filter: 'blur(8px)' }
          const blurB = reduce ? {} : { filter: 'blur(0px)' }
          const leftKids = Array.from(left.children) as HTMLElement[]
          gsap.fromTo(
            leftKids,
            { opacity: 0, x: -18, ...blurA },
            {
              opacity: 1,
              x: 0,
              ...blurB,
              stagger: 0.055,
              ease,
              scrollTrigger: {
                trigger: left,
                start: 'top 88%',
                end: 'top 38%',
                scrub: 1,
              },
            },
          )
        }

        const right = infraWrap.querySelector<HTMLElement>(`.${styles.infraRight}`)
        if (right) {
          gsap.fromTo(
            right,
            { opacity: 0, x: 22, scale: 0.98 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              ease,
              scrollTrigger: {
                trigger: right,
                start: 'top 88%',
                end: 'top 42%',
                scrub: 1,
              },
            },
          )
        }

        const codePanel = infraWrap.querySelector<HTMLElement>(`.${styles.codePanel}`)
        if (codePanel) {
          gsap.fromTo(
            codePanel,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              ease,
              scrollTrigger: {
                trigger: codePanel,
                start: 'top 86%',
                end: 'top 48%',
                scrub: 1,
              },
            },
          )
        }

        const rows = infraWrap.querySelectorAll<HTMLElement>(`.${styles.endpointRow}`)
        if (rows.length) {
          const blurA = reduce ? {} : { filter: 'blur(6px)' }
          const blurB = reduce ? {} : { filter: 'blur(0px)' }
          gsap.fromTo(
            rows,
            { opacity: 0, x: 14, ...blurA },
            {
              opacity: 1,
              x: 0,
              ...blurB,
              stagger: 0.08,
              ease,
              scrollTrigger: {
                trigger: codePanel ?? infraWrap,
                start: 'top 82%',
                end: 'top 36%',
                scrub: 1,
              },
            },
          )
        }
      }

      if (!reduce) {
        const dots = section.querySelectorAll<HTMLElement>(`.${styles.statusDot}`)
        dots.forEach((dot, idx) => {
          gsap.to(dot, {
            scale: 1.2,
            opacity: 0.8,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.35,
          })
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const reduceMotion = usePrefersReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="products"
      className={styles.section}
      aria-labelledby="products-heading"
    >
      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.eyebrow}>Suite</p>
          <h2 id="products-heading" className={styles.headline}>
            {lang === 'de' ? 'Kernprodukte' : 'Core products'}
          </h2>
          <div className={styles.statsStrip}>
            {headerStatsDisplay.map((s) => (
              <div key={s.label} className={styles.statChip}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.blockReveal} ${styles.blockRevealRecords}`} ref={recordsRevealRef}>
          <article className={styles.recordsCard}>
            <div className={styles.recordsBody}>
              <div className={styles.recordsTop}>
                <div className={styles.recordsIcon} aria-hidden>
                  ◈
                </div>
                <span className={styles.badge}>{lang === 'de' ? 'Flaggschiff' : 'Flagship'}</span>
              </div>
              <h3 className={styles.recordsTitle}>easyRecords</h3>
              <p className={styles.tagline}>
                {lang === 'de'
                  ? 'Ein Athleten-Graph—Last, Kliniknotizen, Zeitachsen—ohne doppelte Silos.'
                  : 'One athlete graph—load, clinic notes, timelines—no duplicate silos.'}
              </p>
              <div className={styles.chipGrid}>
                {easyChipsDisplay.map((c) => (
                  <div key={c.key} className={styles.infoChip}>
                    <span className={styles.infoChipKey}>{c.key}</span>
                    <span className={styles.infoChipVal}>{c.val}</span>
                  </div>
                ))}
              </div>
              <a className={styles.learnMore} href="#footer">
                {lang === 'de' ? 'Entdecken →' : 'Explore →'}
              </a>
            </div>
            <div className={styles.recordsVisual}>
              <span className={styles.visualLabel}>{lang === 'de' ? 'Live-Last-Mix' : 'Live load mix'}</span>
              <MiniBars reduceMotion={reduceMotion} />
            </div>
          </article>
        </div>

        <div className={styles.row2}>
          <article className={styles.smallCard}>
            <div className={styles.smallTop}>
              <div className={`${styles.smallIcon} ${styles.meshIcon}`} aria-hidden>
                ✦
              </div>
            </div>
            <h3 className={styles.smallTitle}>easyDataMesh</h3>
            <p className={styles.smallHook}>
              {lang === 'de'
                ? 'Geregelter Austausch—Vereine, Labore, Verbände—mit Einwilligung + Herkunft.'
                : 'Governed exchange—clubs, labs, federations—with consent + lineage.'}
            </p>
            <div className={styles.specRow}>
              {meshSpecsDisplay.map((t) => (
                <span key={t} className={styles.specPill}>
                  {t}
                </span>
              ))}
            </div>
            <div className={styles.storeRow}>
              <span className={styles.storeBadge}>iOS</span>
              <span className={styles.storeBadge}>Android</span>
            </div>
          </article>

          <article className={styles.smallCard}>
            <div className={styles.smallTop}>
              <div className={`${styles.smallIcon} ${styles.msgIcon}`} aria-hidden>
                ◎
              </div>
            </div>
            <h3 className={styles.smallTitle}>SecureMessenger</h3>
            <p className={styles.smallHook}>
              {lang === 'de'
                ? 'Compliance-konforme Threads für Team ↔ Athleten—richtliniengebunden, archiviert.'
                : 'Compliant threads for staff ↔ athletes—policy-bound, archived.'}
            </p>
            <div className={styles.specRow}>
              {msgSpecsDisplay.map((t) => (
                <span key={t} className={styles.specPill}>
                  {t}
                </span>
              ))}
            </div>
            <div className={styles.chatMock}>
              <div className={styles.chatMeta}>{lang === 'de' ? 'Verschlüsselt · Team' : 'Encrypted · Staff'}</div>
              {lang === 'de' ? 'Last-Alert: Bitte vor dem Spiel prüfen.' : 'Load alert: review before pitch.'}
            </div>
          </article>
        </div>

        <div ref={infraRevealRef} className={styles.blockReveal}>
          <div className={styles.infraCard}>
            <div className={styles.infraLeft}>
              <p className={styles.infraEyebrow}>{lang === 'de' ? 'Offene Plattform' : 'Open platform'}</p>
              <h3 className={styles.infraTitle}>{lang === 'de' ? 'Offene Infrastruktur' : 'Open infrastructure'}</h3>
              <p className={styles.infraHook}>
                {lang === 'de'
                  ? 'Die gleichen Verträge in Ihr Data-Lake, BI und Ihre Agents—ohne Lock-in.'
                  : 'Same contracts into your lake, BI, and agents—no lock-in.'}
              </p>
              <div className={styles.infraMetrics}>
                {infraMetricsDisplay.map((m) => (
                  <div key={m.lab} className={styles.infraMetric}>
                    <span className={styles.infraMetricVal}>{m.val}</span>
                    <span className={styles.infraMetricLab}>{m.lab}</span>
                  </div>
                ))}
              </div>
              <div className={styles.infraTags}>
                {infraTags.map((t) => (
                  <span key={t} className={styles.infraTag}>
                    {t}
                  </span>
                ))}
              </div>
              <button type="button" className={styles.apiBtn}>
                {lang === 'de' ? 'API-Dokumentation' : 'API docs'}
              </button>
            </div>

            <div className={styles.infraRight}>
              <InfraMeshSvg reduceMotion={reduceMotion} />
              <div className={styles.codePanel}>
                <div className={styles.codePanelHeader}>
                  <div className={styles.codeDots} aria-hidden>
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className={styles.codeTitle}>
                    {lang === 'de' ? 'Integrationsoberfläche' : 'Integration surface'}
                  </span>
                </div>
                <div className={styles.codeBody}>
                  {infraEndpointsDisplay.map((e) => (
                    <div key={e.path} className={styles.endpointRow}>
                      <span className={styles.endpointMethod}>{e.method}</span>
                      <span className={styles.endpointPath}>{e.path}</span>
                      <span className={styles.endpointStatus}>
                        <span className={styles.statusDot} aria-hidden />
                        {e.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
