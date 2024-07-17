import { createSlice } from "@reduxjs/toolkit";


const SelectProfileSlice = createSlice({
    name:"SelectProfile",
    initialState:{},
    reducers:{
       UpdateSelectedProfile(state,action){
        state = action.payload;
        return state;
       }
    }
})
export const {UpdateSelectedProfile} = SelectProfileSlice.actions;
export default SelectProfileSlice.reducer;