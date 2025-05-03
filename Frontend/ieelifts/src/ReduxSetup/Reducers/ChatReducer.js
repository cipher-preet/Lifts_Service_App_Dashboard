import { CREATE_CHAT_ACTION } from "../Actions/ChatActions";

import { SEND_MESSAGE_BY_SENDER } from "../Actions/ChatActions";

import { FETCH_ALL_MESSAGES_BY_CHATID } from "../Actions/ChatActions";


//-------------------------------------------------------------------------------------------------------------------
//function to Handle Create Chat Reducer

const intialChatState = {
    createChat:null
}

export const createChatReducer = (state=intialChatState, action) => {
    switch(action.type) {
        case CREATE_CHAT_ACTION :
            return {
                ...state, createChat:action.payload}
            default:
                return state;
    }

}

//-------------------------------------------------------------------------------------------------------------------

const intialMessage = {
    chatMessage:null
}

export const sendMessageReducer = (state=intialMessage, action) => {
    switch(action.type) {
        case SEND_MESSAGE_BY_SENDER :
            return {
                ...state,
                chatMessage:action.payload
            }
                default:
                    return state;
            }
    }



//-------------------------------------------------------------------------------------------------------------------

//reducer of get messages

const getMessages = {
    message:null
}

export const getSenderMessagesReducer = (state=getMessages, action) => {
    switch(action.type){
        case FETCH_ALL_MESSAGES_BY_CHATID :
            return {
                ...state,
                message:action.payload
            }
            default:
                return state;
    }
}

//-------------------------------------------------------------------------------------------------------------------