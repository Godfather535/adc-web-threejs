import styles from "./SiteHeader.module.css";
import { useI18n } from "../../i18n/useI18n";
import { useTheme } from "../../context/ThemeContext";

export function SiteHeader() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const nav = [
    { href: "#hero", key: "header.platform" },
    { href: "#solutions", key: "header.solutions" },
    { href: "#products", key: "header.products" },
    { href: "#trust", key: "header.trust" },
    { href: "#connect", key: "header.connect" },
    { href: "#qna", key: "header.qna" },
    { href: "#launch", key: "header.rollout" },
  ] as const;

  const nextLang: "en" | "de" = lang === "de" ? "en" : "de";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          ADC
        </a>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {t<string>(item.key)}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <a href="/login" className={styles.login}>
            {t<string>("header.login")}
          </a>
          <button
            type="button"
            className={styles.themeBtn}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button type="button" className={styles.demoBtn}>
            {t<string>("header.watchDemo")}
          </button>
          <button
            type="button"
            className={styles.langBtn}
            aria-label={t<string>("header.language")}
            onClick={() => setLang(nextLang)}
          >
            {nextLang.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}
