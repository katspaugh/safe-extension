import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { RoutePaths } from './routes/paths'
import { Provider } from 'react-redux'
import { TamaguiProvider, Theme } from 'tamagui'
import tamaguiConfig from './tamagui.config'
import store from './store'

const Home = lazy(() => import('./routes/Home'))
const OnboardingStart = lazy(() => import('./routes/onboarding/Start'))
const OnboardingEnterAddress = lazy(() => import('./routes/onboarding/EnterAddress'))

const App = () => (
  <Provider store={store}>
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <Suspense fallback={<div>Loading...</div>}>
          <MemoryRouter>
            <Routes>
              <Route path={RoutePaths.HOME} element={<Home />} />
              <Route path={RoutePaths.ONBOARDING_START} element={<OnboardingStart />} />
              <Route path={RoutePaths.ONBOARDING_ENTER_ADDRESS} element={<OnboardingEnterAddress />} />
            </Routes>
          </MemoryRouter>
        </Suspense>
      </Theme>
    </TamaguiProvider>
  </Provider>
)

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(<App />)
