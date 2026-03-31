import { useLayoutEffect } from "react";
import { Hero } from "./components/hero/Hero";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { ClosingCTASection } from "./components/sections/ClosingCTASection";
import { CoreProductsSection } from "./components/sections/CoreProductsSection";
import { StakeholdersSection } from "./components/sections/StakeholdersSection";
import { TrustScaleSection } from "./components/sections/TrustScaleSection";
import { ConnectSection } from "./components/sections/ConnectSection";
import { QnASection } from "./components/sections/QnASection";
import { LaunchPathSection } from "./components/sections/LaunchPathSection";
import { LoginScreen } from "./components/auth/LoginScreen";
import { ScrollTrigger } from "./lib/gsap";
import { DemoModalProvider } from "./context/DemoModalContext";
import { I18nProvider } from "./i18n/I18nContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  const isLoginRoute =
    typeof window !== "undefined" &&
    (window.location.pathname === "/login" ||
      window.location.pathname === "/login/");

  useLayoutEffect(() => {
    if (isLoginRoute) return;
    ScrollTrigger.refresh();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [isLoginRoute]);

  return (
    <ThemeProvider>
      <I18nProvider>
        <DemoModalProvider>
          {isLoginRoute ? (
            <LoginScreen />
          ) : (
            <>
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
            </>
          )}
        </DemoModalProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
