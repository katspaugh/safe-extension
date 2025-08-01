import { TamaguiProvider, Theme } from 'tamagui'
import tamaguiConfig from './tamagui.config'
import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => (
  <TamaguiProvider config={tamaguiConfig}>
    <Theme name="light">
      <h1>Hello from TamagUI</h1>
    </Theme>
  </TamaguiProvider>
)

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(<App />)
