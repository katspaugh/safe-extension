import React from 'react'
import { Stack, Label, Input, Button } from 'tamagui'
import SafeList from './SafeList'
import type { Chain } from '../../hooks/useDetectedSafes'
import type { SaveSafe } from '../../hooks/useSafeStorage'

interface Props {
  address: string
  setAddress: (value: string) => void
  chains: Chain[]
  groupedSafes: Record<string, string[]>
  isSigner: boolean
  savedSafes: Record<string, string[]>
  onAdd: SaveSafe
  onAddAll: () => void
}

export default function EnterAddress({
  address,
  setAddress,
  chains,
  groupedSafes,
  isSigner,
  savedSafes,
  onAdd,
  onAddAll,
}: Props) {
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
        width="100%"
      />
      {isSigner && <Button onPress={() => {}}>Import this signer</Button>}
      <SafeList
        groupedSafes={groupedSafes}
        chains={chains}
        savedSafes={savedSafes}
        onAdd={onAdd}
        onAddAll={onAddAll}
      />
    </Stack>
  )
}
