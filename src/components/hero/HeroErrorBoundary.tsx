import { Component, type ErrorInfo, type ReactNode } from 'react'
import { HeroContent } from './HeroContent'
import styles from './Hero.module.css'

type Props = { children: ReactNode }

type State = { hasError: boolean }

export class HeroErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Hero scene error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section id="hero" className={styles.hero} aria-label="ADC hero">
          <div className={styles.grid}>
            <div className={styles.contentShell}>
              <HeroContent />
            </div>
            <div className={styles.sceneColumn}>
              <div className={styles.viewportFrame}>
                <div className={styles.viewportInner}>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      padding: '2rem 1.25rem',
                      fontSize: '0.9rem',
                      margin: 0,
                    }}
                  >
                    3D view unavailable. Core content remains below.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
