import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, H2, Paragraph, Image, XStack } from 'tamagui'
import { useSafeStorage } from './onboarding/hooks/useSafeStorage'
import { useDetectedSafes } from './onboarding/hooks/useDetectedSafes'
import { useLazySafesGetOverviewForManyQuery } from '@safe-global/store/src/gateway/safes'

export default function Dashboard() {
  const { address = '' } = useParams<{ address: string }>()
  const { safes } = useSafeStorage()
  const { chains } = useDetectedSafes('')
  const chainIds = safes[address] || []
  const [fetchSafes, { data: safesData }] = useLazySafesGetOverviewForManyQuery()

  const formatFiatValue = (value: number) => {
    const options: Intl.NumberFormatOptions = { notation: 'compact' }
    options.maximumFractionDigits = value >= 1 ? 0 : 2
    return new Intl.NumberFormat('en-US', options).format(value)
  }

  useEffect(() => {
    if (address && chainIds.length > 0) {
      const safesParam = chainIds.map((id) => `${id}:${address}`)
      fetchSafes({ safes: safesParam, currency: 'usd' })
    }
  }, [address, chainIds, fetchSafes])

  return (
    <Stack display="grid" gap="$4" p="$4">
      <H2>{address}</H2>
      {safesData?.map((safe) => {
        const chain = chains.find((c) => c.chainId === safe.chainId)
        return (
          <XStack key={safe.chainId} alignItems="center" space="$2">
            {chain?.chainLogoUri && (
              <Image
                src={chain.chainLogoUri}
                width={16}
                height={16}
                alt={chain.chainName}
              />
            )}
            <Paragraph>
              {chain?.chainName || safe.chainId}: {safe.threshold}/{safe.owners.length}, {formatFiatValue(Number(safe.fiatTotal))}$
            </Paragraph>
          </XStack>
        )
      })}
    </Stack>
  )
}
