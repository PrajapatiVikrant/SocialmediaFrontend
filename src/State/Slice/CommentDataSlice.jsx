import { createSlice } from "@reduxjs/toolkit";

const CommentDataSlice = createSlice({
    name:"CommentData",
    initialState:{},
    reducers:{
        UpdatedCommentData(state,action){
            state = action.payload;
            return state;
        }
    }
})
export const { UpdatedCommentData } = CommentDataSlice.actions;
export default CommentDataSlice.reducer;