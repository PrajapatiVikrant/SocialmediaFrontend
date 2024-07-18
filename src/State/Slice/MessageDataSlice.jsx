import { createSlice } from "@reduxjs/toolkit";

const MessageDataSlice = createSlice({
    name:"MessageDataSlice",
    initialState:{},
    reducers:{
        UpdateMessageData(state,action){
            state = action.payload;
            return state
        }
    }
})
export const {UpdateMessageData} = MessageDataSlice.actions;
export default MessageDataSlice.reducer;