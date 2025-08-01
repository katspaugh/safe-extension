import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from './paths'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Welcome to Safe Extension</h1>
      <button onClick={() => navigate(RoutePaths.ONBOARDING_START)}>Get started</button>
    </div>
  )
}
