import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { XStack, Button } from 'tamagui'
import { RoutePaths } from '../routes/paths'

export default function NavigationBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const showBack = location.pathname !== RoutePaths.HOME

  return (
    <XStack alignItems="center" p="$2" borderBottomWidth={1} borderColor="$gray6">
      {showBack && <Button size="$2" onPress={() => navigate(-1)}>Back</Button>}
    </XStack>
  )
}
