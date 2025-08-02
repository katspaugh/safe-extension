import React from 'react'
import { Stack, Label, Input } from 'tamagui'

export default function EnterAddress() {
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
      />
    </Stack>
  )
}
