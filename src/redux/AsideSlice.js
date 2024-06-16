import { createSlice } from "@reduxjs/toolkit";

const AsideLink = createSlice({
    name: 'AsideLink',
    initialState: '',
    reducers: {
        pageload: (state, action) => {
            state = action.payload ? action.payload : ''
            return state;
        },
        linkClick: (state, action) => {
            state = action.payload ? action.payload : ''
            return state;
        }

    }
});
export const { pageload, linkClick } = AsideLink.actions;
export default AsideLink.reducer;