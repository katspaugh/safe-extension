import { useCallback, useEffect, useState } from 'react'
import { getStoredSafes, setStoredSafes } from '../services/safeStorage'

export const useSafeStorage = () => {
  const [storedSafes, setStoredSafesState] = useState<Record<string, string[]>>({})

  useEffect(() => {
    getStoredSafes().then(setStoredSafesState)
  }, [])

  const saveSafe = useCallback(async (safeAddress: string, chainIds: string[]) => {
    const stored = await getStoredSafes()
    stored[safeAddress] = Array.from(
      new Set([...(stored[safeAddress] || []), ...chainIds]),
    )
    await setStoredSafes(stored)
    setStoredSafesState(stored)
  }, [])

  const saveAllSafes = useCallback(async (groupedSafes: Record<string, string[]>) => {
    const stored = await getStoredSafes()
    Object.entries(groupedSafes).forEach(([safeAddress, ids]) => {
      stored[safeAddress] = Array.from(
        new Set([...(stored[safeAddress] || []), ...ids]),
      )
    })
    await setStoredSafes(stored)
    setStoredSafesState(stored)
  }, [])

  return { safes: storedSafes, saveSafe, saveAllSafes }
}

export type SaveSafe = (
  safeAddress: string,
  chainIds: string[],
) => Promise<void>
