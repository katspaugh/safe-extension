import { configureStore } from '@reduxjs/toolkit'
import { cgwClient, setBaseUrl } from '@safe-global/store'

setBaseUrl('https://safe-client.safe.global')

const store = configureStore({
  reducer: {
    [cgwClient.reducerPath]: cgwClient.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cgwClient.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
