import { createSlice } from "@reduxjs/toolkit";

const EditDataSlice = createSlice({
    name:"EditData",
    initialState:{},
    reducers:{
        UpdatedEditData(state,action){
            state = action.payload;
            console.log(state)
            return state;
        }
    }
})
export const { UpdatedEditData } = EditDataSlice.actions;
export default EditDataSlice.reducer;