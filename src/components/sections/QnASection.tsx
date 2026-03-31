import { forwardRef, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useI18n } from '../../i18n/useI18n'
import styles from './QnASection.module.css'

const qaItemsByLang: Record<'en' | 'de', readonly { q: string; a: ReactNode }[]> = {
  en: [
    {
      q: 'How does ADC fit alongside our existing EMR or roster tools?',
      a: 'ADC sits in the orchestration layer: it normalizes demand signals, scheduling constraints, and capacity rules, then syncs deltas to the systems your teams already use. You keep source-of-truth where it belongs—we reduce duplicate entry and drift.',
    },
    {
      q: 'What integrations are available out of the box?',
      a: 'We ship OpenAPI surfaces, signed webhooks, and roster snapshot endpoints so you can wire HRIS, access control, and clinical workflows without bespoke glue code. Tell us your stack during onboarding and we map the fastest path.',
    },
    {
      q: 'Where is data processed and how is access controlled?',
      a: 'Deployments are region-aware with strict tenant isolation, least-privilege service accounts, and audit-friendly change trails. Encryption in transit and at rest is standard; stricter BAA-aligned configurations are available for regulated environments.',
    },
    {
      q: 'Can we start with a single site and expand later?',
      a: 'Yes. Roll out to one facility or cohort, validate workflows and reporting, then promote the same policies org-wide. Feature flags and staged sync help you avoid big-bang cutovers.',
    },
    {
      q: 'How do webhooks and retries behave under load?',
      a: 'Deliveries are signed for verification, idempotency keys protect against double-processing, and backoff with dead-letter visibility keeps operators informed instead of silently dropping events.',
    },
    {
      q: 'Who do we contact for a demo or architecture review?',
      a: (
        <>
          Use <a href="#cta">Request a demo</a> in the section below, or reach out through your account team.
          We’ll walk through trust controls, integration surfaces, and a rollout plan matched to your governance needs.
        </>
      ),
    },
  ],
  de: [
    {
      q: 'Wie passt ADC zu unseren bestehenden EMR- oder Roster-Tools?',
      a: 'ADC sitzt in der Orchestrierungsschicht: Es normalisiert Demand-Signale, Scheduling-Einschränkungen und Capacity-Regeln und synchronisiert anschließend nur die Deltas mit den Systemen, die Ihr Team bereits nutzt. So bleibt die „Quelle der Wahrheit“ dort, wo sie hingehört—Sie vermeiden doppelte Eingaben und Drift.',
    },
    {
      q: 'Welche Integrationen gibt es direkt ab Werk?',
      a: 'Wir liefern OpenAPI-Oberflächen, signierte Webhooks und Roster-Snapshot-Endpunkte. Damit binden Sie HRIS, Zugriffskontrolle und klinische Workflows ein—ohne aufwändige Zusatz-„Glue“-Logik. Teilen Sie uns Ihren Stack beim Onboarding mit, dann zeigen wir den schnellsten Weg.',
    },
    {
      q: 'Wo wird Datenverarbeitung durchgeführt und wie wird der Zugriff gesteuert?',
      a: 'Die Bereitstellung ist region-bewusst mit strikter Mandanten-Isolation, Least-Privilege Service-Accounts und revisionsfreundlichen Änderungsnachweisen. Verschlüsselung in transit und at rest ist Standard; strengere BAA-orientierte Konfigurationen sind für regulierte Umgebungen verfügbar.',
    },
    {
      q: 'Können wir mit einem Standort starten und später ausbauen?',
      a: 'Ja. Starten Sie mit einer Einrichtung oder einem Cohort, prüfen Sie Workflows und Reporting und rollen Sie danach die gleichen Policies unternehmensweit aus. Feature-Flags und gestufte Synchronisation helfen Ihnen, Big-Bang-Cutovers zu vermeiden.',
    },
    {
      q: 'Wie verhalten sich Webhooks und Retries unter Last?',
      a: 'Zustellungen sind signiert zur Verifikation, Idempotency-Keys schützen vor doppelter Verarbeitung, und Backoff mit Dead-Letter-Transparenz informiert Operatoren, statt Events stillschweigend zu verlieren.',
    },
    {
      q: 'Wen kontaktieren wir für eine Demo oder Architektur-Review?',
      a: (
        <>
          Nutzen Sie unten den Bereich <a href="#cta">Demo anfragen</a>, oder sprechen Sie Ihr Account-Team an.
          Wir gehen mit Ihnen durch Trust-Kontrollen, Integrationspunkte und einen Rollout-Plan passend zu Ihren Governance-Anforderungen.
        </>
      ),
    },
  ],
}

const QnaOrnament = forwardRef<SVGSVGElement>(function QnaOrnament(_props, ref) {
  return (
    <svg ref={ref} className={styles.ornament} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="qnaRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#00ffc6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse
        cx="620"
        cy="140"
        rx="220"
        ry="160"
        fill="none"
        stroke="url(#qnaRingGrad)"
        strokeWidth="0.9"
        opacity="0.85"
      />
      <ellipse
        cx="140"
        cy="480"
        rx="180"
        ry="120"
        fill="none"
        stroke="url(#qnaRingGrad)"
        strokeWidth="0.7"
        opacity="0.55"
      />
    </svg>
  )
})

function ChevronIcon() {
  return (
    <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const borderIdle = 'rgba(255, 255, 255, 0.09)'
const borderOpen = 'rgba(0, 255, 198, 0.22)'
const shadowOpen = '0 0 0 1px rgba(0, 255, 198, 0.07), 0 18px 48px rgba(0, 0, 0, 0.28)'

type QnaAccordionItemProps = {
  q: string
  a: ReactNode
  index: number
  reduceMotion: boolean
}

function QnaAccordionItem({ q, a, index, reduceMotion }: QnaAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLSpanElement>(null)
  const initRef = useRef(false)
  const prevOpenRef = useRef<boolean | null>(null)

  const headerId = `qna-trigger-${index}`
  const panelId = `qna-panel-${index}`

  useLayoutEffect(() => {
    const card = cardRef.current
    const wrap = wrapRef.current
    const inner = innerRef.current
    const chevron = chevronRef.current
    if (!card || !wrap || !inner) return

    if (!initRef.current) {
      initRef.current = true
      prevOpenRef.current = isOpen
      if (reduceMotion) {
        gsap.set(wrap, { height: isOpen ? 'auto' : 0 })
        gsap.set(inner, { opacity: isOpen ? 1 : 0, y: 0 })
        if (chevron) gsap.set(chevron, { rotation: isOpen ? 180 : 0, transformOrigin: '50% 50%' })
        gsap.set(card, {
          borderColor: isOpen ? borderOpen : borderIdle,
          boxShadow: isOpen ? shadowOpen : 'none',
        })
      } else {
        gsap.set(wrap, { height: 0, overflow: 'hidden' })
        gsap.set(inner, { opacity: 0, y: 10 })
        if (chevron) gsap.set(chevron, { rotation: 0, transformOrigin: '50% 50%' })
        gsap.set(card, { borderColor: borderIdle, boxShadow: 'none' })
      }
      return
    }

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(wrap, { height: isOpen ? 'auto' : 0 })
        gsap.set(inner, { opacity: isOpen ? 1 : 0, y: 0 })
        if (chevron) gsap.set(chevron, { rotation: isOpen ? 180 : 0 })
        gsap.set(card, {
          borderColor: isOpen ? borderOpen : borderIdle,
          boxShadow: isOpen ? shadowOpen : 'none',
        })
        prevOpenRef.current = isOpen
        return
      }

      if (prevOpenRef.current === isOpen) return
      prevOpenRef.current = isOpen

      if (isOpen) {
        gsap.set(wrap, { overflow: 'hidden', height: 0 })
        gsap.set(inner, { opacity: 0, y: 12 })

        const openNow = () => {
          const h = inner.scrollHeight
          gsap.fromTo(
            card,
            { borderColor: borderIdle, boxShadow: 'none' },
            {
              borderColor: borderOpen,
              boxShadow: shadowOpen,
              duration: 0.48,
              ease: 'power2.out',
            },
          )
          if (chevron) {
            gsap.to(chevron, { rotation: 180, duration: 0.58, ease: 'back.out(1.45)' })
          }
          gsap.to(wrap, {
            height: h,
            duration: 0.52,
            ease: 'power3.out',
            onComplete: () => {
              gsap.set(wrap, { height: 'auto' })
            },
          })
          gsap.fromTo(
            inner,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.44, ease: 'power2.out', delay: 0.07 },
          )
        }

        requestAnimationFrame(() => {
          requestAnimationFrame(openNow)
        })
      } else {
        const current = wrap.offsetHeight
        const fromH = current > 0 ? current : inner.scrollHeight
        gsap.set(wrap, { height: fromH, overflow: 'hidden' })

        if (chevron) {
          gsap.to(chevron, { rotation: 0, duration: 0.45, ease: 'power3.inOut' })
        }
        gsap.to(inner, { opacity: 0, y: 8, duration: 0.24, ease: 'power2.in' })
        gsap.to(wrap, {
          height: 0,
          duration: 0.46,
          ease: 'power3.inOut',
          delay: 0.05,
        })
        gsap.to(card, {
          borderColor: borderIdle,
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power2.inOut',
        })
      }
    }, card)

    return () => ctx.revert()
  }, [isOpen, reduceMotion])

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card || reduceMotion) return

    const onEnter = () => {
      gsap.to(card, { y: -4, duration: 0.38, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(card, { y: 0, duration: 0.45, ease: 'power3.out' })
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [reduceMotion])

  return (
    <div ref={cardRef} className={styles.item} data-qna-item>
      <button
        type="button"
        id={headerId}
        className={styles.summary}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((o) => !o)}
      >
        {q}
        <span ref={chevronRef} className={styles.chevronWrap} aria-hidden>
          <ChevronIcon />
        </span>
      </button>
      <div ref={wrapRef} id={panelId} role="region" aria-labelledby={headerId} className={styles.answerWrap}>
        <div ref={innerRef} className={styles.answerInner}>
          {typeof a === 'string' ? <p className={styles.answerText}>{a}</p> : <div className={styles.answerText}>{a}</div>}
        </div>
      </div>
    </div>
  )
}

export function QnASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const ornamentRef = useRef<SVGSVGElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const { lang } = useI18n()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = reduceMotion

    const ctx = gsap.context(() => {
      const copy = section.querySelector<HTMLElement>(`.${styles.copy}`)
      const eyebrow = copy?.querySelector<HTMLElement>(`[data-qna-eyebrow]`)
      const headline = copy?.querySelector<HTMLElement>(`[data-qna-headline]`)
      const lede = copy?.querySelector<HTMLElement>(`[data-qna-lede]`)
      const list = section.querySelector<HTMLElement>(`.${styles.list}`)
      const items = section.querySelectorAll<HTMLElement>(`[data-qna-item]`)
      const ornament = ornamentRef.current

      const blurFrom = reduce ? {} : { filter: 'blur(10px)' }
      const blurTo = reduce ? {} : { filter: 'blur(0px)' }

      const copySt = {
        trigger: copy ?? section,
        start: 'top 82%',
        once: true,
      }

      if (eyebrow && headline && lede) {
        const tl = gsap.timeline({ scrollTrigger: copySt })
        tl.fromTo(
          eyebrow,
          { opacity: 0, y: 18, ...blurFrom },
          { opacity: 1, y: 0, duration: 0.62, ease: 'power3.out', ...blurTo },
        )
          .fromTo(
            headline,
            { opacity: 0, y: 26, ...blurFrom },
            { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out', ...blurTo },
            '-=0.42',
          )
          .fromTo(
            lede,
            { opacity: 0, y: 16, ...blurFrom },
            { opacity: 1, y: 0, duration: 0.58, ease: 'power2.out', ...blurTo },
            '-=0.48',
          )
      }

      if (list && items.length) {
        const listFrom = reduce
          ? { opacity: 0, y: 20 }
          : { opacity: 0, y: 36, rotateX: -9, transformOrigin: 'center top' as const }
        const listTo = reduce
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0, rotateX: 0 }

        gsap.fromTo(
          items,
          listFrom,
          {
            ...listTo,
            duration: 0.82,
            stagger: { each: 0.1, from: 'start' },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: list,
              start: 'top 86%',
              once: true,
            },
            onComplete: () => {
              gsap.set(items, { clearProps: 'transform' })
            },
          },
        )
      }

      if (ornament && !reduce) {
        gsap.fromTo(
          ornament,
          { opacity: 0.15, scale: 0.96 },
          {
            opacity: 0.4,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'top 20%',
              scrub: 1.2,
            },
          },
        )
      }
    }, section)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section ref={sectionRef} id="qna" className={styles.section} aria-labelledby="qna-heading">
      <QnaOrnament ref={ornamentRef} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-qna-eyebrow>
            {lang === 'de' ? 'Fragen & Antworten' : 'Q&A'}
          </p>
          <h2 id="qna-heading" className={styles.headline} data-qna-headline>
            {lang === 'de' ? (
              <>
                Antworten, bevor <span>Sie zweimal fragen</span>
              </>
            ) : (
              <>
                Answers before <span>you ask twice</span>
              </>
            )}
          </h2>
          <p className={styles.lede} data-qna-lede>
            {lang === 'de'
              ? 'Klartext zu Integrationen, Datenhandhabung und Rollout—damit Einkauf und Engineering in Linie bleiben.'
              : 'Straight talk on integrations, data handling, and rollout—so procurement and engineering stay aligned.'}
          </p>
        </div>

        <div className={styles.list}>
          {(lang === 'de' ? qaItemsByLang.de : qaItemsByLang.en).map((item, index) => (
            <QnaAccordionItem key={item.q} q={item.q} a={item.a} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
