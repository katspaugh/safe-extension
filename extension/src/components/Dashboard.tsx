import React from 'react'
import { Stack, H2, Paragraph, Image, XStack } from 'tamagui'
import type { Chain } from '../hooks/useDetectedSafes'

interface SafeOverview {
  chainId: string
  threshold: number
  owners: { value: string }[]
  fiatTotal: string
}

interface Props {
  address: string
  chains: Chain[]
  safes: SafeOverview[] | undefined
  formatFiatValue: (value: number) => string
}

export default function Dashboard({ address, chains, safes, formatFiatValue }: Props) {
  return (
    <Stack display="grid" gap="$4" p="$4">
      <H2>{address}</H2>
      {safes?.map((safe) => {
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
