import { useLayoutEffect } from 'react'
import { Hero } from './components/hero/Hero'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { ClosingCTASection } from './components/sections/ClosingCTASection'
import { CoreProductsSection } from './components/sections/CoreProductsSection'
import { StakeholdersSection } from './components/sections/StakeholdersSection'
import { TrustScaleSection } from './components/sections/TrustScaleSection'
import { ConnectSection } from './components/sections/ConnectSection'
import { QnASection } from './components/sections/QnASection'
import { LaunchPathSection } from './components/sections/LaunchPathSection'
import { ScrollTrigger } from './lib/gsap'
import { DemoModalProvider } from './context/DemoModalContext'
import './App.css'

function App() {
  useLayoutEffect(() => {
    ScrollTrigger.refresh()
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    const onResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <DemoModalProvider>
      <SiteHeader />
      <Hero />
      <CoreProductsSection />
      <StakeholdersSection />
      <TrustScaleSection />
      <ConnectSection />
      <QnASection />
      <LaunchPathSection />
      <ClosingCTASection />
      <SiteFooter />
    </DemoModalProvider>
  )
}

export default App
