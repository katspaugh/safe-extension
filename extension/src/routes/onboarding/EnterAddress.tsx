import React from 'react'
import EnterAddress from '../../components/onboarding/EnterAddress'
import { useEnterAddress } from '../../hooks/useEnterAddress'

export default function EnterAddressRoute() {
  const {
    address,
    setAddress,
    chains,
    groupedSafes,
    isSigner,
    saveSafe,
    saveAllSafes,
    savedSafes,
  } = useEnterAddress()

  return (
    <EnterAddress
      address={address}
      setAddress={setAddress}
      chains={chains}
      groupedSafes={groupedSafes}
      isSigner={isSigner}
      savedSafes={savedSafes}
      onAdd={saveSafe}
      onAddAll={() => saveAllSafes(groupedSafes)}
    />
  )
}
