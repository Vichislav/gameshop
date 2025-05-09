import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './features/group/group.slice'
import amountReducer from './features/amount/amount.slice'
import userReducer from './features/user/user.slice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      group: groupReducer,
      amount: amountReducer,
      user: userReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']