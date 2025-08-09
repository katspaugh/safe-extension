import React from 'react'
import { Button } from 'tamagui'
import SafeItem from './SafeItem'
import type { SaveSafe } from '../../hooks/useSafeStorage'
import type { Chain } from '../../hooks/useDetectedSafes'

interface Props {
  groupedSafes: Record<string, string[]>
  chains: Chain[]
  savedSafes: Record<string, string[]>
  onAdd: SaveSafe
  onAddAll: () => void
}

export default function SafeList({ groupedSafes, chains, savedSafes, onAdd, onAddAll }: Props) {
  const entries = Object.entries(groupedSafes)
  if (entries.length === 0) return null

  return (
    <>
      {entries.map(([safeAddress, chainIds]) => (
        <SafeItem
          key={safeAddress}
          safeAddress={safeAddress}
          chainIds={chainIds}
          chains={chains}
          saved={!!savedSafes[safeAddress]}
          onAdd={onAdd}
        />
      ))}
      <Button onPress={onAddAll}>Add all</Button>
    </>
  )
}
