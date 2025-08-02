import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from './paths'
import { Stack, H1, Button } from 'tamagui'

export default function Home() {
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
      <H1 textAlign="center">Welcome to Safe Extension</H1>
      <Button onPress={() => navigate(RoutePaths.ONBOARDING_START)}>Get started</Button>
    </Stack>
  )
}
