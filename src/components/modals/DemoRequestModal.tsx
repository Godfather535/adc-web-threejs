import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './DemoRequestModal.module.css'
import { useI18n } from '../../i18n/useI18n'

const DEMO_MAIL = 'demo-requests@adc.example'

type Props = {
  isOpen: boolean
  triggerRef: MutableRefObject<HTMLElement | null>
  onRequestClose: () => void
}

function buildMailto(fd: FormData, lang: 'en' | 'de'): string {
  const name = String(fd.get('fullName') ?? '').trim()
  const org = String(fd.get('organization') ?? '').trim()
  const email = String(fd.get('email') ?? '').trim()
  const role = String(fd.get('role') ?? '').trim()
  const phone = String(fd.get('phone') ?? '').trim()
  const notes = String(fd.get('notes') ?? '').trim()

  const labels =
    lang === 'de'
      ? {
          name: 'Name',
          email: 'E-Mail',
          org: 'Organisation',
          role: 'Rolle / Position',
          phone: 'Telefon',
          notes: 'Ziele / Notizen',
        }
      : {
          name: 'Name',
          email: 'Email',
          org: 'Organization',
          role: 'Role',
          phone: 'Phone',
          notes: 'Goals / notes',
        }

  const subject = encodeURIComponent(`ADC demo request — ${org || name || 'Inquiry'}`)
  const body = encodeURIComponent(
    [
      `${labels.name}: ${name}`,
      `${labels.email}: ${email}`,
      `${labels.org}: ${org}`,
      `${labels.role}: ${role}`,
      phone ? `${labels.phone}: ${phone}` : null,
      notes ? `\n${labels.notes}:\n${notes}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
  )

  return `mailto:${DEMO_MAIL}?subject=${subject}&body=${body}`
}

export function DemoRequestModal({ isOpen, triggerRef, onRequestClose }: Props) {
  const [mounted, setMounted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mailtoHref, setMailtoHref] = useState('')
  const reduceMotion = usePrefersReducedMotion()
  const { lang, t } = useI18n()
  const placeholders = lang === 'de'
    ? {
        fullName: 'Max Mustermann',
        email: 'name@organisation.de',
        organization: 'Ihre Organisation oder Einrichtung',
        role: 'Leitung Operations',
        phone: '+49 …',
        notes: 'Integrationen, Zeitplan, Compliance-Kontext…',
      }
    : {
        fullName: 'Ada Chen',
        email: 'you@organization.com',
        organization: 'Your org or facility',
        role: 'Director of Operations',
        phone: '+1 …',
        notes: 'Integrations, timeline, compliance context…',
      }

  const rootRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const panelWrapRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTlRef = useRef<gsap.core.Timeline | null>(null)
  const prevIsOpenRef = useRef(false)

  /* Portal stays mounted through GSAP exit; sync mount from isOpen (exit clears via close onComplete). */
  useLayoutEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount latch for exit animation
      setMounted(true)
      setSuccess(false)
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!mounted) return
    const root = rootRef.current
    const backdrop = backdropRef.current
    const panelWrap = panelWrapRef.current
    const dialog = dialogRef.current
    if (!root || !backdrop || !panelWrap || !dialog) return

    const opened = isOpen && !prevIsOpenRef.current
    const closed = !isOpen && prevIsOpenRef.current
    prevIsOpenRef.current = isOpen

    if (!opened && !closed) return

    const reduce = reduceMotion
    openTlRef.current?.kill()
    closeTlRef.current?.kill()

    const ctx = gsap.context(() => {
      if (opened) {
        root.setAttribute('data-interactive', 'true')
        root.setAttribute('aria-hidden', 'false')

        const fields = dialog.querySelectorAll<HTMLElement>(`[data-demo-field]`)
        const framePaths = dialog.querySelectorAll<SVGPathElement>('[data-demo-frame]')

        gsap.set(backdrop, { opacity: 0 })
        gsap.set(panelWrap, { opacity: 0, y: 28, scale: 0.94, rotateX: reduce ? 0 : -8 })
        gsap.set(fields, { opacity: 0, y: 14 })

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onStart: () => {
            setMailtoHref('')
            requestAnimationFrame(() => {
              formRef.current?.reset()
            })
          },
          onComplete: () => {
            const first =
              (formRef.current?.querySelector(
                'input:not([type="checkbox"])',
              ) as HTMLElement | null) ?? dialog.querySelector<HTMLElement>('button')
            first?.focus()
          },
        })

        tl.to(backdrop, {
          opacity: 1,
          duration: reduce ? 0.15 : 0.45,
          ease: reduce ? 'none' : 'power2.out',
        }).to(
          panelWrap,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: reduce ? 0.2 : 0.65,
            ease: 'power3.out',
          },
          reduce ? 0 : '-=0.25',
        )

        if (!reduce && fields.length) {
          tl.to(
            fields,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: 'power2.out',
            },
            '-=0.4',
          )
        } else if (fields.length) {
          gsap.set(fields, { opacity: 1, y: 0 })
        }

        if (!reduce) {
          framePaths.forEach((path) => {
            let len = 0
            try {
              len = path.getTotalLength()
            } catch {
              return
            }
            if (!Number.isFinite(len) || len < 0.5) return
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
            tl.to(
              path,
              {
                strokeDashoffset: 0,
                duration: 0.55,
                ease: 'power2.inOut',
              },
              '-=0.5',
            )
          })
        }

        openTlRef.current = tl
      }

      if (closed) {
        const fields = dialog.querySelectorAll<HTMLElement>(`[data-demo-field]`)

        const tl = gsap.timeline({
          onComplete: () => {
            root.setAttribute('data-interactive', 'false')
            root.setAttribute('aria-hidden', 'true')
            gsap.set(backdrop, { clearProps: 'opacity' })
            gsap.set(panelWrap, { clearProps: 'opacity,transform' })
            gsap.set(fields, { clearProps: 'opacity,transform' })
            triggerRef.current?.focus()
            setMounted(false)
            setSuccess(false)
            closeTlRef.current = null
          },
        })

        tl.to(fields, {
          opacity: 0,
          y: 10,
          duration: reduce ? 0.1 : 0.2,
          stagger: reduce ? 0 : 0.03,
          ease: 'power2.in',
        }).to(
          panelWrap,
          {
            opacity: 0,
            y: 20,
            scale: 0.96,
            rotateX: reduce ? 0 : 6,
            duration: reduce ? 0.15 : 0.4,
            ease: 'power3.in',
          },
          reduce ? 0 : '-=0.12',
        )
        tl.to(
          backdrop,
          {
            opacity: 0,
            duration: reduce ? 0.12 : 0.35,
            ease: 'power2.in',
          },
          reduce ? 0 : '-=0.25',
        )

        closeTlRef.current = tl
      }
    }, root)

    return () => ctx.revert()
  }, [isOpen, mounted, reduceMotion, triggerRef])

  const requestClose = useCallback(() => {
    onRequestClose()
  }, [onRequestClose])

  useEffect(() => {
    if (!isOpen || !mounted) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        requestClose()
        return
      }

      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const list = [...focusable].filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)
      if (!list.length) return

      const first = list[0]
      const last = list[list.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (e.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, mounted, success, requestClose])

  useEffect(() => {
    if (isOpen && mounted) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpen, mounted])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const consent = fd.get('consent')
    if (!consent) {
      form.querySelector<HTMLInputElement>('input[name="consent"]')?.focus()
      return
    }

    setMailtoHref(buildMailto(fd, lang))
    setSuccess(true)

    if (!reduceMotion && panelWrapRef.current) {
      gsap.fromTo(
        panelWrapRef.current,
        { scale: 1 },
        { scale: 1.02, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' },
      )
    }
  }

  const onBackdropPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      requestClose()
    }
  }

  if (!mounted) {
    return null
  }

  return createPortal(
    <div
      ref={rootRef}
      className={styles.root}
      role="presentation"
      data-interactive="false"
      aria-hidden="true"
    >
      <div
        ref={backdropRef}
        className={styles.backdrop}
        aria-hidden
        onPointerDown={onBackdropPointerDown}
      />
      <div ref={panelWrapRef} className={styles.panelWrap}>
        <div
          ref={dialogRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          <div className={styles.gridBg} aria-hidden />
          <div className={styles.scanlines} aria-hidden />
          <svg className={styles.frameSvg} viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden>
            <path data-demo-frame d="M 20 36 L 20 16 Q 20 10 28 10 L 72 10" />
            <path data-demo-frame d="M 328 10 L 372 10 Q 380 10 380 16 L 380 36" />
            <path data-demo-frame d="M 380 484 L 380 504 Q 380 510 372 510 L 328 510" />
            <path data-demo-frame d="M 72 510 L 28 510 Q 20 510 20 504 L 20 484" />
          </svg>

          <div className={styles.header}>
            <div className={styles.titleBlock}>
              <p className={styles.kicker}>{t<string>('cta.modal.kicker')}</p>
              <h2 id="demo-modal-title" className={styles.title}>
                {t<string>('cta.modal.title')}
              </h2>
              <p className={styles.sub}>{t<string>('cta.modal.sub')}</p>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              aria-label={t<string>('cta.modal.close')}
              onClick={requestClose}
            >
              ×
            </button>
          </div>

          <div className={styles.body}>
            {success ? (
              <div className={styles.success} data-demo-field>
                <div className={styles.successIcon} aria-hidden>
                  ✓
                </div>
                <h3 className={styles.successTitle}>{t<string>('cta.successTitle')}</h3>
                <p className={styles.successText}>{t<string>('cta.successText')}</p>
                {mailtoHref ? (
                  <a className={styles.mailtoLink} href={mailtoHref}>
                    {t<string>('cta.successOpenEmail')}
                  </a>
                ) : null}
                <button type="button" className={`${styles.submit} ${styles.successClose}`} onClick={requestClose}>
                  {t<string>('cta.successDone')}
                </button>
              </div>
            ) : (
              <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.field} data-demo-field>
                  <label className={styles.label} htmlFor="demo-fullName">
                    {t<string>('cta.modal.fullName')}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="demo-fullName"
                    name="fullName"
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={placeholders.fullName}
                  />
                </div>
                <div className={styles.field} data-demo-field>
                  <label className={styles.label} htmlFor="demo-email">
                    {t<string>('cta.modal.workEmail')}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="demo-email"
                    name="email"
                    className={styles.input}
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={placeholders.email}
                  />
                </div>
                <div className={styles.field} data-demo-field>
                  <label className={styles.label} htmlFor="demo-org">
                    {t<string>('cta.modal.organization')}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="demo-org"
                    name="organization"
                    className={styles.input}
                    type="text"
                    autoComplete="organization"
                    required
                    placeholder={placeholders.organization}
                  />
                </div>
                <div className={styles.field} data-demo-field>
                  <label className={styles.label} htmlFor="demo-role">
                    {t<string>('cta.modal.role')}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="demo-role"
                    name="role"
                    className={styles.input}
                    type="text"
                    autoComplete="organization-title"
                    required
                    placeholder={placeholders.role}
                  />
                </div>
                <div className={styles.field} data-demo-field>
                  <label className={styles.label} htmlFor="demo-phone">
                    {t<string>('cta.modal.phone')} <span className={styles.labelHint}>{t<string>('cta.modal.optional')}</span>
                  </label>
                  <input
                    id="demo-phone"
                    name="phone"
                    className={styles.input}
                    type="tel"
                    autoComplete="tel"
                    placeholder={placeholders.phone}
                  />
                </div>
                <div className={styles.field} data-demo-field>
                  <label className={styles.label} htmlFor="demo-notes">
                    {t<string>('cta.modal.notes')} <span className={styles.labelHint}>{t<string>('cta.modal.optional')}</span>
                  </label>
                  <textarea
                    id="demo-notes"
                    name="notes"
                    className={styles.textarea}
                    placeholder={placeholders.notes}
                    rows={3}
                  />
                </div>
                <div className={styles.checkboxRow} data-demo-field>
                  <input
                    id="demo-consent"
                    name="consent"
                    type="checkbox"
                    className={styles.checkbox}
                    value="yes"
                  />
                  <label className={styles.checkboxLabel} htmlFor="demo-consent">
                    {t<string>('cta.modal.consent')}
                    <span className={styles.required}>*</span>
                  </label>
                </div>
                <div className={styles.actions} data-demo-field>
                  <button type="submit" className={styles.submit}>
                    {t<string>('cta.modal.submit')}
                  </button>
                  <button type="button" className={styles.cancel} onClick={requestClose}>
                    {t<string>('cta.modal.cancel')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
