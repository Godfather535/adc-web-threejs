/* eslint-disable react-refresh/only-export-components -- useDemoModal is intentionally exported next to Provider */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { DemoRequestModal } from '../components/modals/DemoRequestModal'

type DemoModalContextValue = {
  isOpen: boolean
  openDemoModal: (triggerElement?: HTMLElement | null) => void
  closeDemoModal: () => void
}

const DemoModalContext = createContext<DemoModalContextValue | null>(null)

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openDemoModal = useCallback((triggerElement?: HTMLElement | null) => {
    triggerRef.current = triggerElement ?? null
    setIsOpen(true)
  }, [])

  const closeDemoModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      openDemoModal,
      closeDemoModal,
    }),
    [isOpen, openDemoModal, closeDemoModal],
  )

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoRequestModal isOpen={isOpen} triggerRef={triggerRef} onRequestClose={closeDemoModal} />
    </DemoModalContext.Provider>
  )
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext)
  if (!ctx) {
    throw new Error('useDemoModal must be used within DemoModalProvider')
  }
  return ctx
}
