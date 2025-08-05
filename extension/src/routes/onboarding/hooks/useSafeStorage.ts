import { useCallback } from 'react'

const getStoredSafes = (): Promise<Record<string, string[]>> =>
  new Promise((resolve) => {
    chrome.storage.local.get(['safes'], (result) => {
      resolve((result.safes as Record<string, string[]>) || {})
    })
  })

const setStoredSafes = (safes: Record<string, string[]>): Promise<void> =>
  new Promise((resolve) => {
    chrome.storage.local.set({ safes }, () => resolve())
  })

export const useSafeStorage = () => {
  const saveSafe = useCallback(async (safeAddress: string, chainIds: string[]) => {
    const stored = await getStoredSafes()
    stored[safeAddress] = Array.from(
      new Set([...(stored[safeAddress] || []), ...chainIds]),
    )
    await setStoredSafes(stored)
  }, [])

  const saveAllSafes = useCallback(async (groupedSafes: Record<string, string[]>) => {
    const stored = await getStoredSafes()
    Object.entries(groupedSafes).forEach(([safeAddress, ids]) => {
      stored[safeAddress] = Array.from(
        new Set([...(stored[safeAddress] || []), ...ids]),
      )
    })
    await setStoredSafes(stored)
  }, [])

  return { saveSafe, saveAllSafes }
}

export type SaveSafe = (
  safeAddress: string,
  chainIds: string[],
) => Promise<void>
