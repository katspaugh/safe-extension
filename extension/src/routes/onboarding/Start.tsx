import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from '../paths'

export default function Start() {
  const navigate = useNavigate()
  return (
    <div>
      <h2>Welcome to Safe</h2>
      <button onClick={() => navigate(RoutePaths.ONBOARDING_ENTER_ADDRESS)}>Already have a Safe?</button>
      <button>Create a Safe</button>
    </div>
  )
}
