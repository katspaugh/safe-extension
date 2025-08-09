import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSafeStorage } from './useSafeStorage'
import { useDetectedSafes } from './useDetectedSafes'
import { useLazySafesGetOverviewForManyQuery } from '@safe-global/store/src/gateway/safes'

export const useDashboard = () => {
  const { address = '' } = useParams<{ address: string }>()
  const { safes } = useSafeStorage()
  const { chains } = useDetectedSafes('')
  const chainIds = safes[address] || []
  const [fetchSafes, { data: safesData }] = useLazySafesGetOverviewForManyQuery()

  useEffect(() => {
    if (address && chainIds.length > 0) {
      const safesParam = chainIds.map((id) => `${id}:${address}`)
      fetchSafes({ safes: safesParam, currency: 'usd' })
    }
  }, [address, chainIds, fetchSafes])

  const formatFiatValue = (value: number) => {
    const options: Intl.NumberFormatOptions = { notation: 'compact' }
    options.maximumFractionDigits = value >= 1 ? 0 : 2
    return new Intl.NumberFormat('en-US', options).format(value)
  }

  return { address, chains, safesData, formatFiatValue }
}
