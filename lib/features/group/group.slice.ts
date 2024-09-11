import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/app/first/page'

 export interface groupState {
    group: User[],
}

const initialState: groupState = {
  group: [],
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addUserToGroup: (state, action: PayloadAction<User>) => {
      state.group.push(action.payload)
    },
    removeUserToGroup: (state, action: PayloadAction<number>) => {
        //const { id } = action.payload;
        state.group = state.group.filter((el) => el.id !== action.payload);
    },
    /* incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }, */
  },
})

// Action creators are generated for each case reducer function
export const { addUserToGroup, removeUserToGroup} = groupSlice.actions

export default groupSlice.reducer