import { configureStore } from "@reduxjs/toolkit";
import CommentDataReducer from "./Slice/CommentDataSlice";
import EditDataSlice from "./Slice/EditDataSlice";
import MessageDataSlice from "./Slice/MessageDataSlice";
import SelectProfileReducer from "./Slice/SelectProfileData";


const Store = configureStore({
    reducer:{
        CommentData:CommentDataReducer,
        SelectProfile:SelectProfileReducer,
        MessageData:MessageDataSlice,
        EditCard:EditDataSlice
    }
})
export default Store;