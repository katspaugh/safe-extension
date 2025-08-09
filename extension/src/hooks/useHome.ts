import { useSafeStorage } from './useSafeStorage'
import { useDetectedSafes } from './useDetectedSafes'

export const useHome = () => {
  const { safes } = useSafeStorage()
  const { chains } = useDetectedSafes('')
  return { safes, chains }
}
