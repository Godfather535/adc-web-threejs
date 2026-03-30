import './suppressKnownConsoleNoise'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/* StrictMode is omitted: dev double-mount tears down the R3F WebGL canvas and retriggers
   Drei/Three deprecation noise; production was never double-mounted. */
createRoot(document.getElementById('root')!).render(<App />)
