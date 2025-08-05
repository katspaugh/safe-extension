import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Paragraph, Image, XStack, Stack } from 'tamagui'
import type { Chain } from '../routes/onboarding/hooks/useDetectedSafes'

interface Props {
  safes: Record<string, string[]>
  chains: Chain[]
}

export default function SavedSafesList({ safes, chains }: Props) {
  const navigate = useNavigate()
  const entries = Object.entries(safes)
  if (entries.length === 0) return null
  return (
    <Stack display="grid" gap="$2">
      {entries.map(([safeAddress, chainIds]) => (
        <Button
          key={safeAddress}
          onPress={() => navigate(`/dashboard/${safeAddress}`)}
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
