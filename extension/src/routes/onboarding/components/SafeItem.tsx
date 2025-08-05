import React from 'react'
import { Stack, Paragraph, Image, XStack, Button } from 'tamagui'
import type { Chain } from '../hooks/useDetectedSafes'

interface Props {
  safeAddress: string
  chainIds: string[]
  chains: Chain[]
  onAdd: (safeAddress: string, chainIds: string[]) => void
}

export default function SafeItem({
  safeAddress,
  chainIds,
  chains,
  onAdd,
}: Props) {
  return (
    <Stack display="grid" gridTemplateRows="auto auto" gap="$1">
      <Paragraph>{safeAddress}</Paragraph>
      <XStack alignItems="center">
        <XStack>
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
        <Button ml="auto" onPress={() => onAdd(safeAddress, chainIds)}>
          + Add
        </Button>
      </XStack>
    </Stack>
  )
}
