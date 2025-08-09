export const getStoredSafes = (): Promise<Record<string, string[]>> =>
  new Promise((resolve) => {
    chrome.storage.local.get(['safes'], (result) => {
      resolve((result.safes as Record<string, string[]>) || {})
    })
  })

export const setStoredSafes = (safes: Record<string, string[]>): Promise<void> =>
  new Promise((resolve) => {
    chrome.storage.local.set({ safes }, () => resolve())
  })
