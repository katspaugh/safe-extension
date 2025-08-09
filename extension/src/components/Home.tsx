import React from 'react'
import { Stack, H1, Button } from 'tamagui'
import SavedSafesList from './SavedSafesList'
import type { Chain } from '../hooks/useDetectedSafes'

interface Props {
  safes: Record<string, string[]>
  chains: Chain[]
  onGetStarted: () => void
  onSelectSafe: (safeAddress: string) => void
}

export default function Home({ safes, chains, onGetStarted, onSelectSafe }: Props) {
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
      <H1 textAlign="center">Welcome to Safe Extension</H1>
      <Button onPress={onGetStarted}>Get started</Button>
      <SavedSafesList safes={safes} chains={chains} onSelect={onSelectSafe} />
    </Stack>
  )
}
