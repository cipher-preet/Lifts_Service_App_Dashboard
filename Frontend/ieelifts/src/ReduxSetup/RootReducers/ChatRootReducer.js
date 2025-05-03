import { combineReducers } from "redux";

import { createChatReducer } from "../Reducers/ChatReducer"
import { sendMessageReducer } from "../Reducers/ChatReducer"
import { getSenderMessagesReducer } from "../Reducers/ChatReducer"


const ChatRootReducer = combineReducers({
    createChatReducer:createChatReducer,
    sendMessageReducer:sendMessageReducer,
    getSenderMessagesReducer:getSenderMessagesReducer
})

export default ChatRootReducer;