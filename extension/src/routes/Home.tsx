import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from './paths'
import Home from '../components/Home'
import { useHome } from '../hooks/useHome'

export default function HomeRoute() {
  const navigate = useNavigate()
  const { safes, chains } = useHome()

  return (
    <Home
      safes={safes}
      chains={chains}
      onGetStarted={() => navigate(RoutePaths.ONBOARDING_START)}
      onSelectSafe={(address) => navigate(`/dashboard/${address}`)}
    />
  )
}
