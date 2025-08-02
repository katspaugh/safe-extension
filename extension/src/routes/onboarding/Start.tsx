import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from '../paths'
import { Stack, H2, Button, XStack } from 'tamagui'

export default function Start() {
  const navigate = useNavigate()
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
        <Button onPress={() => navigate(RoutePaths.ONBOARDING_ENTER_ADDRESS)}>
          Already have a Safe?
        </Button>
        <Button>Create a Safe</Button>
      </XStack>
    </Stack>
  )
}
