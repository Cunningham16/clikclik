import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpenSidebar: false
    },
    reducers: {
        setIsOpenSidebar(state, action: PayloadAction<boolean>){
            state.isOpenSidebar = action.payload
        }
    }
})

export const { setIsOpenSidebar } = sidebarSlice.actions
export const sidebarReducer = sidebarSlice.reducer