import React, { useEffect, useMemo, useState } from 'react'
import { Stack, Label, Input, XStack, Paragraph, Image } from 'tamagui'
import { apiSliceWithChainsConfig, chainsAdapter } from '@safe-global/store/src/gateway/chains'
import { useLazySafesGetOverviewForManyQuery } from '@safe-global/store/src/gateway/safes'

export default function EnterAddress() {
  const [address, setAddress] = useState('')
  const { data: chainsState } = apiSliceWithChainsConfig.useGetChainsConfigQuery()
  const [fetchSafes, { data: safesData }] = useLazySafesGetOverviewForManyQuery()

  const chains = chainsState ? chainsAdapter.getSelectors().selectAll(chainsState) : []

  useEffect(() => {
    if (/^0x[a-fA-F0-9]{40}$/.test(address) && chains.length > 0) {
      const safesParam = chains.map((chain) => `${chain.chainId}:${address}`)
      fetchSafes({ safes: safesParam })
    }
  }, [address, chains, fetchSafes])

  const groupedSafes = useMemo(() => {
    if (!safesData) return {}
    return safesData.reduce((acc, safe) => {
      const safeAddress = safe.address.value
      if (!acc[safeAddress]) {
        acc[safeAddress] = []
      }
      acc[safeAddress].push(safe.chainId)
      return acc
    }, {} as Record<string, string[]>)
  }, [safesData])

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
