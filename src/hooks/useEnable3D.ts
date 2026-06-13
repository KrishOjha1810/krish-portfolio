import { useEffect, useState } from 'react'

/**
 * Gate WebGL scenes: skip on reduced-motion preference and on small / touch
 * devices where the cost isn't worth it. Evaluated after mount so SSR-safe.
 */
export function useEnable3D(minWidth = 768) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wide = window.innerWidth >= minWidth
    setEnabled(!reduced && wide)
  }, [minWidth])

  return enabled
}
