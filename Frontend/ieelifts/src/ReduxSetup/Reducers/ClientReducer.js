import { GET_Client_DETAILS } from "../Actions/ClientActions";




//-----------------------------------------------------------------------------------------------------------------------------------------------------
//function to fetch ClientDetails

const initialDetails = {
    clientDetails:null
}
export const fetchClientDetailsByJon = (state = initialDetails , action)=>{
    
    switch(action.type){
        case  GET_Client_DETAILS:
            return{
                ...state,
                clientDetails:action.payload
            }
            default:
                return state;
            
    }
}