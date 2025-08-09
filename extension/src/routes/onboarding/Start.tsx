import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from '../paths'
import Start from '../../components/onboarding/Start'

export default function StartRoute() {
  const navigate = useNavigate()
  return (
    <Start
      onEnterAddress={() => navigate(RoutePaths.ONBOARDING_ENTER_ADDRESS)}
      onCreateSafe={() => {}}
    />
  )
}
