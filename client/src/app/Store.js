import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/user/userSlice.js";
import connectionsReducer from "../Features/connections/connectonsSlice.js";
import messagesReducer from "../Features/messages/messagesSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        connections: connectionsReducer,
        messages: messagesReducer,
    },
});
