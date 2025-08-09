import { useEffect, useMemo } from 'react'
import { apiSliceWithChainsConfig, chainsAdapter } from '@safe-global/store/src/gateway/chains'
import { useLazySafesGetOverviewForManyQuery } from '@safe-global/store/src/gateway/safes'
import { useLazyOwnersGetAllSafesByOwnerV2Query } from '@safe-global/store/src/gateway/AUTO_GENERATED/owners'

export interface Chain {
  chainId: string
  chainLogoUri?: string
  chainName: string
}

export const useDetectedSafes = (address: string) => {
  const { data: chainsState } = apiSliceWithChainsConfig.useGetChainsConfigQuery()
  const [fetchSafes, { data: safesData }] = useLazySafesGetOverviewForManyQuery()
  const [fetchOwnerSafes, { data: ownerSafesData }] =
    useLazyOwnersGetAllSafesByOwnerV2Query()

  const chains: Chain[] = useMemo(
    () => (chainsState ? chainsAdapter.getSelectors().selectAll(chainsState) : []),
    [chainsState],
  )

  useEffect(() => {
    if (/^0x[a-fA-F0-9]{40}$/.test(address) && chains.length > 0) {
      const safesParam = chains.map((chain) => `${chain.chainId}:${address}`)
      fetchSafes({ safes: safesParam, currency: 'usd' })
    }
  }, [address, chains, fetchSafes])

  useEffect(() => {
    if (safesData && safesData.length === 0) {
      fetchOwnerSafes({ ownerAddress: address })
    }
  }, [safesData, address, fetchOwnerSafes])

  useEffect(() => {
    if (!ownerSafesData) return

    const safesList = Object.entries(ownerSafesData).flatMap(([chainId, safes]) =>
      safes.map((safeAddress) => `${chainId}:${safeAddress}`),
    )

    fetchSafes({ safes: safesList, currency: 'usd' })
  }, [ownerSafesData, fetchSafes])

  const groupedSafes = useMemo(() => {
    if (ownerSafesData) {
      return Object.entries(ownerSafesData).reduce((acc, [chainId, safes]) => {
        safes.forEach((safeAddress) => {
          if (!acc[safeAddress]) {
            acc[safeAddress] = []
          }
          acc[safeAddress].push(chainId)
        })
        return acc
      }, {} as Record<string, string[]>)
    }

    if (safesData && safesData.length > 0) {
      return safesData.reduce((acc, safe) => {
        const safeAddress = safe.address.value
        if (!acc[safeAddress]) {
          acc[safeAddress] = []
        }
        acc[safeAddress].push(safe.chainId)
        return acc
      }, {} as Record<string, string[]>)
    }

    return {}
  }, [safesData, ownerSafesData])

  const isSigner = !!ownerSafesData && Object.keys(ownerSafesData).length > 0

  return { chains, groupedSafes, isSigner }
}
