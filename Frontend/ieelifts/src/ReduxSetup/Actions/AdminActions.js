import axios from "axios";
import config from "../../config";

import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// all the type constants
export const GET_ALL_CALLBACK = "GET_ALL_CALLBACK";
export const GET_CALLBACK_BY_ID = "GET_CALLBACK_BY_ID";
export const GET_ALL_CLIENT_DETAIL = "GET_ALL_CLIENT_DETAIL";
export const GET_ALL_CHECKLIST = "GET_ALL_CHECKLIST";
export const GET_ENGG_DETAIL = "GET_ENGG_DETAIL";
export const CLEAR_TABLE_DATA = "CLEAR_TABLE_DATA";
export const ASSIGN_CALLBACK_BY_ADMIN = "ASSIGN_CALLBACK_BY_ADMIN";
export const GET_ASSIGN_CALLBACK_DETAILS = "GET_ASSIGN_CALLBACK_DETAILS";
export const GET_ALL_SERVICE_REQUEST = "GET_ALL_SERVICE_REQUEST";
export const GET_REQUEST_DETAIL_BY_REQUEST_ID =
  "GET_REQUEST_DETAIL_BY_REQUEST_ID";

export const ASSIGN_SERVICE_REQUEST_BY_ADMIN =
  "ASSIGN_SERVICE_REQUEST_BY_ADMIN";

export const GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID =
  "GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID";

export const GET_ALL_ASSIGN_SERVICE_REQUEST = "GET_ALL_ASSIGN_SERVICE_REQUEST";

export const GET_ALL_ASSIGN_CALLBACK = "GET_ALL_ASSIGN_CALLBACK";

export const GET_CURRENT_DATE_ASSIGN_CALLBACK =
  "GET_CURRENT_DATE_ASSIGN_CALLBACK";

export const CHANGE_CLIENT_LAYOUT = "CHANGE_CLIENT_LAYOUT";
export const CHANGE_MEMBERSHIP_LAYOUT = "CHANGE_MEMBERSHIP_LAYOUT";

/* export const TICKET_COMPONENT_RENDERED = "TICKET_COMPONENT_RENDERED"; */
/* export const TICKET_COMPONENT_RENDERED = "TICKET_COMPONENT_RENDERED"; */

export const GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST =
  "GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST";

export const GET_BOOKED_DATES_FOR_ENGGS = "GET_BOOKED_DATES_FOR_ENGGS";

export const GET_ENGG_BASIC_DATA_FOR_CROUSER =
  "GET_ENGG_BASIC_DATA_FOR_CROUSER";

export const GET_ENG_ASSIGN_SLOTS = "GET_ENG_ASSIGN_SLOTS";

export const GET_ENGG_LOCATION_DETAILS = "GET_ENGG_LOCATION_DETAILS";

export const GET_CLIENT_MEMBERSHIP_HISTORY = "GET_CLIENT_MEMBERSHIP_HISTORY";
export const GET_CLIENT_CALL_DETAILS = "GET_CLIENT_CALL_DETAILS";
export const CREATE_CLIENT_CALL = "CREATE_CLIENT_CALL";
export const GET_CLIENT_DETAILS = "GET_CLIENT_DETAILS";
export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const GET_FILTER_DATA = "GET_FILTER_DATA";

export const GET_MEMBERSHIP_DATA = "GET_MEMBERSHIP_DATA";
export const GET_LIMITED_CLIENT_DATA = "GET_LIMITED_CLIENT_DATA";
export const GET_LIMITED_CLIENT_DATA_EXPIRED =
  "GET_LIMITED_CLIENT_DATA_EXPIRED";
export const GET_FILTER_LOCATIONS = "GET_FILTER_LOCATIONS";
export const GET_Engineer_Name = "GET_Engineer_Name";
export const GET_SEARCHED_CLIENTS = "GET_SEARCHED_CLIENTS";
export const CHANGE_MEMBERSHIP_LAYOUT_BUTTON =
  "CHANGE_MEMBERSHIP_LAYOUT_BUTTON";

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const LOGIN_SERVICE_ADMIN = "LOGIN_SERVICE_ADMIN";

export const SEND_OTP_ACTION = "SEND_OTP_ACTION";

export const VERIFY_OTP_PASSWORD = "VERIFY_OTP_PASSWORD";
export const FETCH_ENG_DETAILS = "FETCH_ENG_DETAILS";

export const GET_ASSIGNED_ENGG_DETAILS = "GET_ASSIGNED_ENGG_DETAILS";
export const UPDATE_ENGG_LOCATION = "UPDATE_ENGG_LOCATION";
export const UPDATE_ENGG_CART_LOCATION = "UPDATE_ENGG_CART_LOCATION";
export const GET_ENGINEER_LEAVE_HISTORY = "GET_ENGINEER_LEAVE_HISTORY";
export const APPROVE_LEAVE_BY_ADMIN = "APPROVE_LEAVE_BY_ADMIN";
export const GET_ENGINEER_REQUESTED_LEAVE = "GET_ENGINEER_REQUESTED_LEAVE";
export const GET_ENGINEER_ATTENDANCE = "GET_ENGINEER_ATTENDANCE";
export const GET_ADMIN_REPORT_DATA = "GET_ADMIN_REPORT_DATA";
export const REPORT_CROUSER_HANDLER = "REPORT_CROUSER_HANDLER";

export const OPEN_CLIENT_MODAL = "OPEN_CLIENT_MODAL";
export const CLOSE_CLIENT_MODAL = "CLOSE_CLIENT_MODAL";

export const GET_CLIENT_MODAL_INFORMATION = "GET_CLIENT_MODAL_INFORMATION";

export const REGISTER_CLIENT_DATA = "REGISTER_CLIENT_DATA";
export const UPDATE_CLIENT_DATA = "UPDATE_CLIENT_DATA";
export const UPDATE_CLIENT_FORM_USING_PAGINATION =
  "UPDATE_CLIENT_FORM_USING_PAGINATION";
export const GET_CLIENT_FORM_DATA = "GET_CLIENT_FORM_DATA";
export const CLEAR_CLIENT_FORM_DATA = "CLEAR_CLIENT_FORM_DATA";

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// by preet 05/04/2024
//function to handle Registraction Engginers  (hook)

export const RegistrationEnggDetails = async (formData) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/serviceEngg/RegistrationServiceEngg`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// by preet 04/04/2024
//function to handle get alloted SparePart  (hook)
export const fetchAllotedSparePartToSpecificEngg = async (EnggId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/fetchAllotedSparePart/${EnggId}`
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//by preet 03/04/2024
//function to handle Approve Deny Spare part Request  (Hook)
export const ApproveDenySparepartAction = async (
  RequestId,
  isApproved,
  isDenied
) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/admin/ApproveDenySparepart`,
      {
        RequestId,
        isApproved,
        isDenied,
      }
    );
    return response;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// by preet 02/04/2024
//handle getSparepartRequest by engg Id  (Hook)

export const getSparePartRequestedByEnggIdAction = async (EnggId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getSparePartRequest/${EnggId}`
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle login Service Admin
export const loginServiceAdminAction = (AdminId, Password, Role) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/admin/loginAdmin`, {
        AdminId,
        Password,
        Role,
      });
      if (response.data.Admin.Role != Role) {
        toast.error(`Permission denied for ${Role}`);
      } else {
        localStorage.setItem("adminData", JSON.stringify(response.data.token));
        localStorage.setItem("Role", response.data.Admin.Role);
        dispatch({
          type: LOGIN_SERVICE_ADMIN,
          payload: response,
        });

        toast.success("login successfully");
      }
    } catch (error) {
      toast.error("Please fill the correct Details");
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle get Engg Basic data in the Engg crouser

export const getEnggBasicDataForCrouserAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getEnggCrouserData`
      );
      //console.log(response,"response from eng crousal")
      dispatch({
        type: GET_ENGG_BASIC_DATA_FOR_CROUSER,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle getBooked slots for enggs.

export const getBookedSlotsforEnggsAction = (date) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getAvailbaleEng/?Date=${date}`
      );
      dispatch({
        type: GET_BOOKED_DATES_FOR_ENGGS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle get Current Date Assign Service Request
export const getCurrentDateAssignServiceRequestAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getCurrentDateAssignServiceRequest`
      );
      dispatch({
        type: GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle get Current date assign callbacks

export const getCurrentDateAssignCalbackAction = () => {
  return async (dispatch) => {
    try {
      //console.log("USEeFFECT CALLED PART 2")
      const response = await axios.get(
        `${config.apiUrl}/admin/getCurrentDateAssignCallback`
      );
      //console.log("response",response);
      dispatch({
        type: GET_CURRENT_DATE_ASSIGN_CALLBACK,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle getAllAssignCallback Request ("not is use may be use in future also")

export const getAllAssignCallbackRequestAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getAllAssignCallback`
      );

      dispatch({
        type: GET_ALL_ASSIGN_CALLBACK,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle get all assignRequests

export const getAllAssignServiceRequestAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getAllAssignServices`
      );
      dispatch({
        type: GET_ALL_ASSIGN_SERVICE_REQUEST,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//action to handle get Assign service Request detail By Request Id

export const assignServiceRequestDetailByRequestIdAction = (RequestId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getAssignRequestDetail/${RequestId}`
      );
      dispatch({
        type: GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle Assign service Request by admin

export const assignserviceRequestByAdmin = (
  ServiceEnggId,
  JobOrderNumber,
  RequestId,
  AllotAChecklist,
  Slot,
  Date,
  Message,
  name,
  enggJon,
  RepresentativeName,
  RepresentativeNumber
) => {
  return async (dispatch) => {
    try {
      console.log("RepresentativeName", RepresentativeName);
      console.log("RepresentativeNumber", RepresentativeNumber);

      const response = await axios.post(
        `${config.apiUrl}/admin/assignRequest`,
        {
          ServiceEnggId,
          JobOrderNumber,
          RequestId,
          AllotAChecklist,
          Slot,
          Date,
          Message,
          RepresentativeName,
          RepresentativeNumber,
        }
      );

      await axios.put(`${config.apiUrl}/client/updateServiceRequest`, {
        RequestId,
        name,
        enggJon,
      });
      dispatch({
        type: ASSIGN_SERVICE_REQUEST_BY_ADMIN,
        payload: response.data,
      });

      toast.success("Assign Request successfully");
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//action to handle get request by request Id

export const getRequestDetailByRequestIdAction = (RequestId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getRequestDetailByRequestid/${RequestId}`
      );

      dispatch({
        type: GET_REQUEST_DETAIL_BY_REQUEST_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle callBack Assign BY Admin

export const assignCallBackByAdminAction = (
  ServiceEnggId,
  JobOrderNumber,
  callbackId,
  AllotAChecklist,
  Slot,
  Date,
  Message,
  name,
  enggJon
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/admin/assigncallback`,
        {
          ServiceEnggId,
          JobOrderNumber,
          callbackId,
          AllotAChecklist,
          Slot,
          Date,
          Message,
        }
      );

      await axios.put(`${config.apiUrl}/client/updateCallbacks`, {
        callbackId,
        name,
        enggJon,
      });

      dispatch({
        type: ASSIGN_CALLBACK_BY_ADMIN,
        payload: response.data,
      });
      toast.success("Assign callback successfully");
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// Action to handle fetch Engg detail by Id
export const fetchEnggDetailAction = (EnggId) => {
  return async (dispatch) => {
    try {
      if (EnggId === undefined) {
        dispatch({
          type: GET_ENGG_DETAIL,
          payload: null,
        });
      } else {
        const response = await axios.get(
          `${config.apiUrl}/admin/getEnggDetailById/${EnggId}`
        );
        dispatch({
          type: GET_ENGG_DETAIL,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//Action to handle fetchcheck list
export const fetchChecklistAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getCheckList`);
      dispatch({
        type: GET_ALL_CHECKLIST,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching checklist", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Admin actions to handle get All the clientcallbacks
export const fetchAllCallbacksAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/Allcallbacks`);
      dispatch({
        type: GET_ALL_CALLBACK,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching callback", error);
    }
  };
};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//Admin actions to handle get All the fetch All Service Requests Action
export const fetchAllServiceRequestsAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/Allservices`);
      dispatch({
        type: GET_ALL_SERVICE_REQUEST,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching callback", error);
    }
  };
};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// fetch callback with id and correspondin the client details action

export const fetchCallbackDetailWithCallbackIdAction = (callbackId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getClientCalbackDetailWithClientDetail/${callbackId}`
      );
      // console.log(response)
      dispatch({
        type: GET_CALLBACK_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//functio to fetch All Clients detail action

export const fetchAllClientDetailAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/AllServiceEngg`);
      // console.log(response);

      dispatch({
        type: GET_ALL_CLIENT_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

export const requestAssignCallbackDetail = (callbackId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getAssignCallbackDetail/${callbackId}`
      );
      //console.log("assign_responce",response.data);

      dispatch({
        type: GET_ASSIGN_CALLBACK_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

export const EnggLocationDetailsFetch = (/* {ServiceEnggId} */) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getEnggLocationDetail`
      );
      dispatch({
        type: GET_ENGG_LOCATION_DETAILS,
        payload: response.data?.combinedData,
      });
    } catch (error) {
      console.log("error while fetching EnggLocation data", error);
    }
  };
};

// -------------------armaan-dev----------------------------------------------------------------------------------------------------------------------

export const requestGetMemberShipDataAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getMembershipDetails`
      );

      dispatch({
        type: GET_MEMBERSHIP_DATA,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

export const requestLimitedClientDataAction = async (
  dispatch,
  dataType,
  wanted,
  page,
  pageSize
) => {
  try {
    const response = await axios.get(`${config.apiUrl}/admin/getMembership`, {
      params: {
        dataType,
        wanted,
        page,
        pageSize,
      },
    });
    if (wanted === "expiring") {
      dispatch({
        type: GET_LIMITED_CLIENT_DATA,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_LIMITED_CLIENT_DATA_EXPIRED,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getClientMembershipHistoryAction = (jobOrderNumber) => {
  return async (dispatch) => {
    try {
      if (!jobOrderNumber) {
        dispatch({
          type: GET_CLIENT_MEMBERSHIP_HISTORY,
          payload: [],
        });
        return;
      }
      const response = await axios.get(
        `${config.apiUrl}/admin/getMembershipHistory`,
        {
          params: {
            jobOrderNumber,
          },
        }
      );
      dispatch({
        type: GET_CLIENT_MEMBERSHIP_HISTORY,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getClientCallsDetails = (jobOrderNumber, callType) => {
  return async (dispatch) => {
    try {
      if (!jobOrderNumber) {
        dispatch({
          type: GET_CLIENT_CALL_DETAILS,
          payload: [],
        });
        return;
      }
      const response = await axios.get(
        `${config.apiUrl}/admin/getClientCalls`,
        {
          params: {
            jobOrderNumber,
            callType,
          },
        }
      );
      dispatch({
        type: GET_CLIENT_CALL_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

export const createClientCalls = (jobOrderNumber, callType, callDate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/admin/createCall`, {
        jobOrderNumber,
        callType,
        callDate,
      });
      dispatch({
        type: CREATE_CLIENT_CALL,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
export const getClientMembershipDetails = (jobOrderNumber) => {
  return async (dispatch) => {
    try {
      if (!jobOrderNumber) {
        dispatch({
          type: GET_CLIENT_DETAILS,
          payload: [],
        });
        return;
      }
      const response = await axios.get(
        `${config.apiUrl}/admin/getClientDataForMembership`,
        {
          params: {
            jobOrderNumber,
          },
        }
      );
      dispatch({
        type: GET_CLIENT_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getClients = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/AllClients`);
      dispatch({
        type: GET_ALL_CLIENTS,
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const getfilteredData = (filterCondition) => {
  return async (dispatch) => {
    try {
      if (!filterCondition.length) {
        dispatch({
          type: GET_FILTER_DATA,
          payload: [],
        });
        return;
      }
      const response = await axios.post(`${config.apiUrl}/admin/filterClient`, {
        filterCondition,
      });
      console.log(response.data);
      dispatch({
        type: GET_FILTER_DATA,
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const changeLayout = (type, to) => {
  return async (dispatch) => {
    try {
      switch (type) {
        case "client":
          dispatch({
            type: CHANGE_CLIENT_LAYOUT,
            payload: to ? { layout: "grid" } : { layout: "list" },
          });
          break;
        case "membership":
          dispatch({
            type: CHANGE_MEMBERSHIP_LAYOUT,
            payload: to ? { layout: "open" } : { layout: "close" },
          });
          break;
        default:
          break;
      }
    } catch (error) {}
  };
};

export const getFilterLocation = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getFilteringLocations`
      );
      dispatch({
        type: GET_FILTER_LOCATIONS,
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const getEngineerNames = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getEngineerNames`
      );
      dispatch({
        type: GET_Engineer_Name,
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const searchClients = (searchTerm) => {
  return async (dispatch) => {
    try {
      if (searchTerm === null || searchTerm === "") {
        dispatch({
          type: GET_SEARCHED_CLIENTS,
          payload: [],
        });
        return;
      }
      const response = await axios.get(
        `${config.apiUrl}/admin/serchingClient`,
        {
          params: {
            searchTerm,
          },
        }
      );
      dispatch({
        type: GET_SEARCHED_CLIENTS,
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const membershipLayoutButton = (button) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CHANGE_MEMBERSHIP_LAYOUT_BUTTON,
        payload: { button },
      });
    } catch (error) {}
  };
};

// -------------------armaan-dev---------------

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//open modal action for addEngg component

export const openAddEngggModalAction = () => ({
  type: "OPEN_MODAL",
});
export const closeAddEngggModalAction = () => ({
  type: "CLOSE_MODAL",
});

//-------------------------x
export const openAddClientModalAction = () => ({
  type: "OPEN_CLIENT_MODAL",
});
export const closeClientModalAction = () => ({
  type: "CLOSE_CLIENT_MODAL",
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

// IFSC code API : https://ifsc.razorpay.com/
// PinCode : https://api.postalpincode.in/pincode/

export const getBankDetails = async (IFSCCode) => {
  try {
    const response = await axios.get(`https://ifsc.razorpay.com/${IFSCCode}`);
    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getDetailByPinCode = async (pincode) => {
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---by preet ---

//action to handle sendOTP action

export const sendOTPAction = async (email) => {
  try {
    const response = await axios.post(`${config.apiUrl}/admin/SendOtpEmail`, {
      email,
    });
    // console.log(response.data)
    toast.success("Email Sent. Please check your inbox");
    setTimeout(() => {
      window.location.href = "/enterOTP";
    }, 1000);
    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
    toast.error("Please fill correct Details");
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle verify OTP

export const VerifyOTPPasswordAction = (email, otp) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/admin/veriyfyOTP`, {
        email,
        otp,
      });
      dispatch({
        type: VERIFY_OTP_PASSWORD,
        payload: response.data,
      });

      if (response.data.success) {
        toast.success("otp verified!! wait for Redirect...");
      } else {
        toast.error("Please Provide correct OTP Details");
      }
    } catch (error) {
      console.log("error while fetching data", error);
      toast.error("!!! something went Wrong");
    }
  };
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle update Passsword  (custom hooks)

export const updatePassswordAction = async (email, newPassword) => {
  try {
    const response = await axios.post(`${config.apiUrl}/admin/updatePassword`, {
      email,
      newPassword,
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);

    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

//---------------------------------------------------------------------------------fetchEngDetailsf-----------------------------------------------------------------------------
export const fetchEngDetails = () => {
  return async (dispatch) => {
    console.log(dispatch);
    try {
      const response = await axios.get(
        `${config.apiUrl}/serviceEngg/getAllEngDetails`
      );
      dispatch({
        type: FETCH_ENG_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

//emit code for the enggpage task-section
export const assignedEnggDetails = (ServiceEnggId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/assignedEnggDetails/${ServiceEnggId}`
      );
      dispatch({
        type: GET_ASSIGNED_ENGG_DETAILS,
        payload: response.data,
      });
      console.log(response.data);
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

//----------------------------------------------------------------------------------------------------------
//emit action for engg location
export const onClickEnggCart = (ServiceEnggId) => {
  return async (dispatch) => {
    try {
      if (ServiceEnggId === undefined || !ServiceEnggId) {
        dispatch({
          type: UPDATE_ENGG_CART_LOCATION,
          payload: ServiceEnggId,
        });
      }
      dispatch({
        type: UPDATE_ENGG_LOCATION,
        payload: ServiceEnggId,
      });
    } catch (error) {
      console.log("error while UPDATE_ENGG_LOCATION", error);
    }
  };
};
//----------------------------------------------------------------------------------------------------------

//emit action for updating engg cart on click of pin
export const onClickPinCart = (ServiceEnggId) => {
  return async (dispatch) => {
    try {
      if (ServiceEnggId === undefined || !ServiceEnggId) {
        dispatch({
          type:  UPDATE_ENGG_CART_LOCATION,
          payload: ServiceEnggId,
        });
      }
      dispatch({
        type: UPDATE_ENGG_CART_LOCATION,
        payload: ServiceEnggId,
      });
    } catch (error) {
      console.log("error while UPDATE_ENGG_LOCATION", error);
    }
  };
}; 
// {/armaan-dev}
export const getEngineerLeaveHistory = (ServiceEnggId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getEngineerLeaveHistory`,
        {
          params: {
            ServiceEnggId,
          },
        }
      );
      dispatch({
        type: "GET_ENGINEER_LEAVE_HISTORY",
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
export const approveLeaveByAdmin = (_id, IsApproved) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/takeActionOnLeave`,
        {
          params: {
            _id,
            IsApproved,
          },
        }
      );
      console.log(response.data);
      dispatch({
        type: "APPROVE_LEAVE_BY_ADMIN",
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getRequstedLeaves = (ServiceEnggId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getEngineerRequestedLeave`,
        {
          params: {
            ServiceEnggId,
          },
        }
      );
      dispatch({
        type: "GET_ENGINEER_REQUESTED_LEAVE",
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

export const getEngineerAttendance = (ServiceEnggId, selectedDate) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/fetchEnggAttendance/${ServiceEnggId}/${selectedDate}`
      );
      dispatch({
        type: "GET_ENGINEER_ATTENDANCE",
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

// {/armaan-dev}

//-------------------------------------------------------------------------------------------------------
//amit and preet get notification data from backend

export const getNotificationDataAction = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/admin/getNotification`);
    return response.data;
  } catch (error) {
    console.log("error while fetching Notification data", error);
  }
};

//-------------------------------------------------------------------------------------------------------

//===============================create by aayush for admin report data change end point and pass callback id=============================================================================

export const getadminReportData = (callbackId) => {
  //if any problem occur then call from useEffect and some change are lefts also update end point and check for callback id

  return async (dispatch) => {
    if (!callbackId) {
      return;
    }

    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getReportForAdmin/${callbackId}`
      );
      dispatch({
        type: GET_ADMIN_REPORT_DATA,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

export const ReportCrouserHandler = (Index, IsOpen) => {
  return async (dispatch) => {
    dispatch({
      type: REPORT_CROUSER_HANDLER,
      payload: { Index, IsOpen },
    });
  };
};

// -------------Created by Raj---------------------------------------------------------------
//--------------- Action to handle fetch Engg personal dets by Id---------------------------------------------

export const fetchEnggPersonalData = async (EnggId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getEnggPersonalData/${EnggId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching Eng_Personal_details", error);
  }
};

// ---------------Edit personal data --------------------------------------------------

export const editEnggPersonalData = async (EnggId, formData) => {
  try {
    const response = await axios.put(
      `${config.apiUrl}/admin/editEnggDetails/${EnggId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("sunday", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while fetching Edit_Eng_Personal_details", error);
  }
};

// -----------Deposite Enginner cash to admin collect cash------------------------------------------------

export const depositeEnggCash = async (EnggId, AvailableCash) => {
  try {
    const response = await axios.put(
      `${config.apiUrl}/admin/depositeEnggCash`,
      {
        EnggId,
        AvailableCash,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching Deposit Engineer Cash", error);
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//   -------  fetch final report for admin -------by Raj

export const fetchFinalReportData = async (serviceId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/serviceEngg/fetchFinalReport/${serviceId}`
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

// ---------------------------Get Rating data in rating.js page =▶ Raj --------------------------------------------------------------------------------------------------------------

export const fetchEnggRatingData = async (serviceId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getEnggRatingById/${serviceId}`
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

// ------------------------------------------Get Client Modal information page =▶ Raj------------------------------------------------------------------------------------------

export const getClientModalData = (jonId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getClientModalInformation/${jonId}`
      );
      dispatch({
        type: GET_CLIENT_MODAL_INFORMATION,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

export const RegisterClientDataAction = (formData) => {
  return async (dispatch) => {
    try {
      if (!formData) {
        dispatch({
          type: REGISTER_CLIENT_DATA,
          payload: {},
        });
        return;
      }
      const response = await axios.post(
        `${config.apiUrl}/admin/registerClientData`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({
        type: REGISTER_CLIENT_DATA,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateClientData = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${config.apiUrl}/admin/updateClientForm`,
        formData
      );
      dispatch({
        type: UPDATE_CLIENT_DATA,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
//---------------------------------------Rahul Kumar----------------------------------------------------------
// third step
export const updateClientFormUsingPagination = (formData, jon) => {
  return async (dispatch) => {
    try {
      if (!jon) {
        dispatch({
          type: UPDATE_CLIENT_FORM_USING_PAGINATION,
          payload: {},
        });
        return;
      }
      const response = await axios.put(
        `${config.apiUrl}/admin/putElevatorDimensions`,
        {
          JON: jon,
          data: formData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: UPDATE_CLIENT_FORM_USING_PAGINATION,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
//---------------------------------------------------------------------------------------------------------
//-------------------------------Rahul Kumar ---------------------------------------------------------------

export const putDataBasedOnJon = (response) => {
  return async (dispatch) => {
    try {
      if (!response) {
        dispatch({
          type: GET_CLIENT_FORM_DATA,
          payload: {},
        });
        return;
      }
      dispatch({
        type: GET_CLIENT_FORM_DATA,
        payload: response.response,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

export const getDataBasedOnJon = async (jon) => {
  if (!jon) {
    return;
  }

  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getClientModalInformation/${jon}`
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching data", error);
  }
};

//------------------------------------------------------------------------------------------------------------

// -------------Created by Raj---------------------------------------------------------------
//--------------- Action to handle fetch Engg personal dets by Id---------------------------------------------

// export const fetchEnggPersonalData = async (EnggId) => {
//   try {
//     const response = await axios.get(
//       `${config.apiUrl}/admin/getEnggPersonalData/${EnggId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log("Error while fetching Eng_Personal_details", error);
//   }
// };

// ---------------Edit personal data --------------------------------------------------

// export const editEnggPersonalData = async (EnggId, formData) => {
//   try {
//     const response = await axios.put(
//       `${config.apiUrl}/admin/editEnggDetails/${EnggId}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log("sunday", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("Error while fetching Edit_Eng_Personal_details", error);
//   }
// };

// -----------Deposite Enginner cash to admin collect cash------------------------------------------------

// export const depositeEnggCash = async (EnggId, AvailableCash) => {
//   try {
//     const response = await axios.put(
//       `${config.apiUrl}/admin/depositeEnggCash`,
//       {
//         EnggId,
//         AvailableCash,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log("Error while fetching Deposit Engineer Cash", error);
//   }
// };

//-----------------------------------------------------------------------------------------------------------------------------------------------------

export const getClientCallbackHistory = async (jonId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getClientCallbackHistory/${jonId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching data", error);
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------

export const getClientServiceHistory = async (jonId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getClientServiceHistory/${jonId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching data", error);
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------

export const getCheckInCheckOuts = async (serviceId, date) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getCheckInCheckOut/${serviceId}?Date=${date}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching data", error);
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle get Revenue Data sin revenu page table in spare part Section
export const getRevenueTablerDataAction = async (EnggId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getEnggSparePartRevenueData/${EnggId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching Revenue Table data", error);
  }
};
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle GetSparePartProfitSummaryGraphData

export const GetSparePartProfitSummaryGraphDataAction = async (EnggId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/GetSparePartProfitSummaryGraphData/${EnggId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching Revenue Table data", error);
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------

//custom hook to get the response to handle get engg checkin or not on toadays date

export const getEnggCheckinOrNotOnToadaysDate = async (EnggId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/getEnggCheckInOrNotOnCurrentDate/${EnggId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching todays Engg check In data", error);
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------
