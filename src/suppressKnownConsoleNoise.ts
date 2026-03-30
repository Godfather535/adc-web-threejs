/**
 * @react-three/fiber still constructs THREE.Clock(); three r183 logs a deprecation.
 * three/utils `warn()` prefixes "THREE." so the console string becomes "THREE.THREE.Clock: …".
 * Remove this file once fiber uses THREE.Timer (or the warning is dropped upstream).
 */
const clockDeprecation =
  /THREE\.THREE\.Clock: This module has been deprecated/i

function patchConsole(
  key: 'error' | 'warn',
  original: (...args: unknown[]) => void,
) {
  console[key] = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && clockDeprecation.test(args[0])) return
    original.apply(console, args)
  }
}

patchConsole('error', console.error.bind(console))
patchConsole('warn', console.warn.bind(console))
