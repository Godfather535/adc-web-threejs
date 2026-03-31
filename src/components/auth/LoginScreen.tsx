import styles from './LoginScreen.module.css'

export function LoginScreen() {
  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden />
      <section className={styles.panel} aria-labelledby="login-title">
        <p className={styles.brand}>ADC Platform</p>
        <h1 id="login-title" className={styles.title}>
          Sign in
        </h1>
        <p className={styles.sub}>Access your athlete development cockpit.</p>

        <form className={styles.form}>
          <label className={styles.field}>
            <span className={styles.label}>Work email</span>
            <input className={styles.input} type="email" placeholder="name@organization.com" autoComplete="email" />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Password</span>
            <input className={styles.input} type="password" placeholder="Enter password" autoComplete="current-password" />
          </label>

          <div className={styles.row}>
            <label className={styles.remember}>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#forgot" className={styles.forgot}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className={styles.submit}>
            Sign in
          </button>
        </form>

        <p className={styles.foot}>Need access? Contact your ADC admin.</p>
      </section>
    </main>
  )
}
