import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './features/group/group.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      group: groupReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']