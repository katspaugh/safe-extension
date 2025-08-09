import React from 'react'
import { Button, Paragraph, Image, XStack, Stack } from 'tamagui'
import type { Chain } from '../hooks/useDetectedSafes'

interface Props {
  safes: Record<string, string[]>
  chains: Chain[]
  onSelect: (safeAddress: string) => void
}

export default function SavedSafesList({ safes, chains, onSelect }: Props) {
  const entries = Object.entries(safes)
  if (entries.length === 0) return null
  return (
    <Stack display="grid" gap="$2">
      {entries.map(([safeAddress, chainIds]) => (
        <Button
          key={safeAddress}
          onPress={() => onSelect(safeAddress)}
          justifyContent="flex-start"
        >
          <XStack alignItems="center" width="100%">
            <Paragraph>{safeAddress}</Paragraph>
            <XStack ml="auto">
              {chainIds.map((id, index) => {
                const chain = chains.find((c) => c.chainId === id)
                return chain?.chainLogoUri ? (
                  <Image
                    key={id}
                    src={chain.chainLogoUri}
                    width={16}
                    height={16}
                    alt={chain.chainName}
                    ml={index === 0 ? 0 : -8}
                  />
                ) : null
              })}
            </XStack>
          </XStack>
        </Button>
      ))}
    </Stack>
  )
}
