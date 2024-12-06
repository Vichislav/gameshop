import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/app/component/enterBtn'

/* export  interface IuserLabel {
        name: string,
        password: string 
} */

export  interface userProps {
    name: string,
    password: string 
}

const initialState: IUser = {
    name: '',
    password: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUserData: (state, action: PayloadAction<userProps>) => {
        console.log('createUserData')
        state.name = action.payload.name;
        state.password = action.payload.password
    }
  },
})

// Action creators are generated for each case reducer function
export const { createUserData} = userSlice.actions

export default userSlice.reducer