import React from 'react'
import Dashboard from '../components/Dashboard'
import { useDashboard } from '../hooks/useDashboard'

export default function DashboardRoute() {
  const { address, chains, safesData, formatFiatValue } = useDashboard()

  return (
    <Dashboard
      address={address}
      chains={chains}
      safes={safesData}
      formatFiatValue={formatFiatValue}
    />
  )
}
