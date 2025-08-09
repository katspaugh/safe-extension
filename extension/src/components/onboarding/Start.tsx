import React from 'react'
import { Stack, H2, Button, XStack } from 'tamagui'

interface Props {
  onEnterAddress: () => void
  onCreateSafe: () => void
}

export default function Start({ onEnterAddress, onCreateSafe }: Props) {
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
      <H2 textAlign="center">Welcome to Safe</H2>
      <XStack space="$2" justifyContent="center">
        <Button onPress={onEnterAddress}>Already have a Safe?</Button>
        <Button onPress={onCreateSafe}>Create a Safe</Button>
      </XStack>
    </Stack>
  )
}
