import axios from "axios";
import config from "../../config";
export const GET_Client_DETAILS = "GET_Client_DETAILS"
export const REQUEST_CALLBACK_BY_ADMIN_REDUCERS = "REQUEST_CALLBACK_BY_ADMIN_REDUCERS"


export const requestCallBackByAdmin = (JobOrderNumber,callbackDate,callbackTime,TypeOfIssue,Description ,RepresentativeName , RepresentativeNumber) => {
  return async()=>{
    //console.log("job",JobOrderNumber,"call",callbackDate,"backtime",callbackTime,"Type",TypeOfIssue,"Des",Description);
      try {
        if(JobOrderNumber&&callbackDate&&callbackTime&&TypeOfIssue&&Description){
          const response = await axios.post(`${config.apiUrl}/client/requestCallbacks`,
          {
            JobOrderNumber,
            callbackDate,
            callbackTime,
            TypeOfIssue,
            Description,
            RepresentativeName,
            RepresentativeNumber
          }
        );
        const newCallbackData = response?.data?.Requests?.
        callbackId;
        return newCallbackData;
        }
      }catch (error) {
        console.log("error while fetching data", error);
      }
}
}

//-------------------------------------------------------------------------------------------------------
//function to fetch client details on ticket section 
export const requestClientDetailsByJon = (JobOrderNumber)=>{
  return async(dispatch)=>{
  try{
    if(JobOrderNumber){
      const response = await axios.get(`${config.apiUrl}/admin/clientDetail/${JobOrderNumber}`)
      //console.log("fetchingClientDetails: ",response.data)
      dispatch({
        type: GET_Client_DETAILS,
        payload: response.data,
      });
    }else{
      dispatch({
        type: GET_Client_DETAILS,
        payload:null,
      });
    }
  }catch (error) {
    console.log("error while fetching data", error);
  }

}
}

//-----------------------------------------------------------------------------------------------------------
//function to fetch all the RequestId by admin
export const requestServiceRequestByAdmin = (JobOrderNumber,RequestDate,RequestTime,TypeOfIssue,Description ,RepresentativeName , RepresentativeNumber) => {
  return async()=>{
      try {
        //console.log(JobOrderNumber,RequestDate,RequestTime,TypeOfIssue,Description)
        if(JobOrderNumber&&RequestDate&&RequestTime&&TypeOfIssue&&Description){
          const response = await axios.post(`${config.apiUrl}/client/imediateServiceRequest`,
          {
            JobOrderNumber,
            RequestDate,
            RequestTime,
            TypeOfIssue,
            Description,
            RepresentativeName,
            RepresentativeNumber
          }
        );
        const newCallbackData = response?.data?.imidiateRequest?.RequestId;
        //console.log("this is the new requestId",newCallbackData);
        return newCallbackData;
        }
      }catch (error) {
        console.log("error while fetching data", error);
      }
}
}