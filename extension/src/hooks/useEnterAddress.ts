import { useState } from 'react'
import { useDetectedSafes } from './useDetectedSafes'
import { useSafeStorage } from './useSafeStorage'

export const useEnterAddress = () => {
  const [address, setAddress] = useState('')
  const { chains, groupedSafes, isSigner } = useDetectedSafes(address)
  const { saveSafe, saveAllSafes, safes } = useSafeStorage()

  return {
    address,
    setAddress,
    chains,
    groupedSafes,
    isSigner,
    saveSafe,
    saveAllSafes,
    savedSafes: safes,
  }
}
