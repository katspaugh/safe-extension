import React from 'react'

export default function EnterAddress() {
  return (
    <div>
      <label htmlFor="address-input">
        Enter your Safe or signer address
        <input
          type="text"
         id="address-input"
         placeholder="e.g., 0x1234...abcd"
         required
         pattern="^0x[a-fA-F0-9]{40}$"
         title="Please enter a valid Ethereum address (42 characters starting with 0x)."
       />
     </label>
    </div>
  )
}
