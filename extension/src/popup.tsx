import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { TamaguiProvider, Theme } from 'tamagui'
import tamaguiConfig from './tamagui.config'
import store from './store'

const Home = lazy(() => import('./routes/Home'))

const App = () => (
  <Provider store={store}>
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <Suspense fallback={<div>Loading...</div>}>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </MemoryRouter>
        </Suspense>
      </Theme>
    </TamaguiProvider>
  </Provider>
)

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(<App />)
