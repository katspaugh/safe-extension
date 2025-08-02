import React, { useEffect, useMemo, useState } from 'react'
import { Stack, Label, Input, XStack, Paragraph, Image } from 'tamagui'
import { apiSliceWithChainsConfig, chainsAdapter } from '@safe-global/store/src/gateway/chains'
import { useLazySafesGetOverviewForManyQuery } from '@safe-global/store/src/gateway/safes'
import { useLazyOwnersGetAllSafesByOwnerV2Query } from '@safe-global/store/src/gateway/AUTO_GENERATED/owners'

export default function EnterAddress() {
  const [address, setAddress] = useState('')
  const { data: chainsState } = apiSliceWithChainsConfig.useGetChainsConfigQuery()
  const [fetchSafes, { data: safesData }] = useLazySafesGetOverviewForManyQuery()
  const [fetchOwnerSafes, { data: ownerSafesData }] = useLazyOwnersGetAllSafesByOwnerV2Query()

  const chains = useMemo(
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

  const groupedSafes = useMemo(() => {
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

    if (!ownerSafesData) return {}

    return Object.entries(ownerSafesData).reduce((acc, [chainId, safes]) => {
      safes.forEach((safeAddress) => {
        if (!acc[safeAddress]) {
          acc[safeAddress] = []
        }
        acc[safeAddress].push(chainId)
      })
      return acc
    }, {} as Record<string, string[]>)
  }, [safesData, ownerSafesData])

  return (
    <Stack
      display="grid"
      gap="$4"
      p="$4"
      width="100%"
      height="100%"
      justifyContent="center"
      alignContent="center"
    >
      <Label htmlFor="address-input">Enter your Safe or signer address</Label>
      <Input
        id="address-input"
        placeholder="e.g., 0x1234...abcd"
        required
        pattern="^0x[a-fA-F0-9]{40}$"
        title="Please enter a valid Ethereum address (42 characters starting with 0x)."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {Object.entries(groupedSafes).map(([safeAddress, chainIds]) => (
        <XStack key={safeAddress} alignItems="center" gap="$2">
          <Paragraph>{safeAddress}</Paragraph>
          {chainIds.map((id) => {
            const chain = chains.find((c) => c.chainId === id)
            return chain?.chainLogoUri ? (
              <Image key={id} src={chain.chainLogoUri} width={16} height={16} alt={chain.chainName} />
            ) : null
          })}
        </XStack>
      ))}
    </Stack>
  )
}
