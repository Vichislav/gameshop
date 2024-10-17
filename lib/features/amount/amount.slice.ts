import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export  interface amountState {
    amount: {
        [key: string]: number 
    } 
}

export  interface amountProps {
        key: string,
        value: number 
}

const initialState: amountState = {
    amount: {},
}

export const amountSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    createAmountData: (state, action: PayloadAction<amountProps>) => {
        state.amount[action.payload.key] = action.payload.value;
    },
    removeAmountData: (state, action: PayloadAction<string>) => {
        delete state.amount[action.payload];
    },
  },
})

// Action creators are generated for each case reducer function
export const { createAmountData, removeAmountData} = amountSlice.actions

export default amountSlice.reducer