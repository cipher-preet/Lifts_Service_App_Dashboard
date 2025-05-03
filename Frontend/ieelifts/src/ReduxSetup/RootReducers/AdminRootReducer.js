import { combineReducers } from "redux";

import { fetchAllCallbackReducer, getClientModalDataReducer } from "../Reducers/AdminReducer";
import { fetchCallbackDetailWithCallbackIdReducer } from "../Reducers/AdminReducer";
import { fetchAllClientDetailReducer } from "../Reducers/AdminReducer";
import { fetchChecklistReducer } from "../Reducers/AdminReducer";
import { fetchEnggDetailReducer } from "../Reducers/AdminReducer";
import { assignCallBackByAdminReducer } from "../Reducers/AdminReducer";
import { fetchAssignCallbacksDetailsReducer } from "../Reducers/AdminReducer";
import { fetchAllServiceRequestsReducers } from "../Reducers/AdminReducer";
import { getRequestDetailByRequestIdReducer } from "../Reducers/AdminReducer";
import { assignServiceRequestDetailByRequestIdAction } from "../Reducers/AdminReducer";
import { getAllAssignServiceRequestReducer } from "../Reducers/AdminReducer";
import { getAllAssignCallbackRequestReducer } from "../Reducers/AdminReducer";
import { getCurrentDateAssignCalbackAction } from "../Reducers/AdminReducer";
import { getCurrentDateAssignServiceRequestReducer } from "../Reducers/AdminReducer";
import { getBookedSlotsforEnggsReducer } from "../Reducers/AdminReducer";
import { getEnggBasicDataForCrouserReducer } from "../Reducers/AdminReducer";

import { fetchClientDetailsByJon } from "../Reducers/ClientReducer";
import { requestGetMemberShipHistoryReducer } from "../Reducers/AdminReducer";
import { requestGetMemberShipCallReducer } from "../Reducers/AdminReducer";
import { requestGetMemberShipClientReducer } from "../Reducers/AdminReducer";
import { createClientCallReducer } from "../Reducers/AdminReducer";
import { getClientsReducer } from "../Reducers/AdminReducer";
import { getFilterDataReducer } from "../Reducers/AdminReducer";
import { requestGetMemberShipDataActionReducer } from "../Reducers/AdminReducer";
import { requestLimitedClientDataReducer } from "../Reducers/AdminReducer";
import { EnggLocationDetailsFetchReducer } from "../Reducers/AdminReducer";
import { getBankDetils } from "../Actions/AdminActions";
import { ChangeLayoutReducer } from "../Reducers/AdminReducer";
import { filteringLocationsReducer } from "../Reducers/AdminReducer";
import { searchClientReducer } from "../Reducers/AdminReducer";
import { membershipButtonLayoutReducer } from "../Reducers/AdminReducer";
import { modalOpenerReducer } from "../Reducers/AdminReducer";
import { loginAdminReducer } from "../Reducers/AdminReducer";
import { VerifyOTPPasswordReducer } from "../Reducers/AdminReducer";
import { engineersReducer } from "../Reducers/AdminReducer";
import { reducerfetchengdetails } from "../Reducers/AdminReducer";
import { approveLeaveByAdminReducer } from "../Reducers/AdminReducer";
import { engineerLeaveHistoryReducer } from "../Reducers/AdminReducer";
import { engineerAttendanceReducer } from "../Reducers/AdminReducer";
import { engineerRequestedLeaveReducer } from "../Reducers/AdminReducer";
import { fetchassignedEnggDetailsReducer } from "../Reducers/AdminReducer";
import { onClickEnggCartEnggLocationReducer } from "../Reducers/AdminReducer";
import { onClickEnggPinEnggLocationReducer } from "../Reducers/AdminReducer";
import { openAddClientModalReducer } from "../Reducers/AdminReducer";
import { RegisterClientDataReducer } from "../Reducers/AdminReducer";
import {getAdminReportDataReducer} from "../Reducers/AdminReducer";
import { ReportCrouserHandlerReducer} from "../Reducers/AdminReducer";
import {ClientFormDataFromApiReducer} from "../Reducers/AdminReducer";

const AdminRootReducer = combineReducers({
  EnggLocationDetailsFetchReducer: EnggLocationDetailsFetchReducer,
  fetchClientDetailsByJon: fetchClientDetailsByJon,
  fetchAssignCallbacksDetailsReducer: fetchAssignCallbacksDetailsReducer,
  fetchAllCallbackReducer: fetchAllCallbackReducer,
  fetchCallbackDetailWithCallbackIdReducer:
    fetchCallbackDetailWithCallbackIdReducer,
  fetchAllClientDetailReducer: fetchAllClientDetailReducer,
  fetchChecklistReducer: fetchChecklistReducer,
  fetchEnggDetailReducer: fetchEnggDetailReducer,
  assignCallBackByAdminReducer: assignCallBackByAdminReducer,
  fetchAllServiceRequestsReducers: fetchAllServiceRequestsReducers,
  getRequestDetailByRequestIdReducer: getRequestDetailByRequestIdReducer,
  assignServiceRequestDetailByRequestIdAction:
    assignServiceRequestDetailByRequestIdAction,
  getAllAssignServiceRequestReducer: getAllAssignServiceRequestReducer,
  getAllAssignCallbackRequestReducer: getAllAssignCallbackRequestReducer,
  getCurrentDateAssignCalbackAction: getCurrentDateAssignCalbackAction,
  getCurrentDateAssignServiceRequestReducer:
    getCurrentDateAssignServiceRequestReducer,
  getBookedSlotsforEnggsReducer: getBookedSlotsforEnggsReducer,
  getEnggBasicDataForCrouserReducer: getEnggBasicDataForCrouserReducer,
  requestGetMemberShipDataActionReducer: requestGetMemberShipDataActionReducer,
  requestLimitedClientDataReducer: requestLimitedClientDataReducer,
  requestGetMemberShipHistoryReducer: requestGetMemberShipHistoryReducer,
  requestGetMemberShipCallReducer: requestGetMemberShipCallReducer,
  requestGetMemberShipClientReducer: requestGetMemberShipClientReducer,
  createClientCallReducer: createClientCallReducer,
  getClientsReducer: getClientsReducer,
  getFilterDataReducer: getFilterDataReducer,
  ChangeLayoutReducer: ChangeLayoutReducer,
  filteringLocationsReducer: filteringLocationsReducer,
  searchClientReducer: searchClientReducer,
  membershipButtonLayoutReducer: membershipButtonLayoutReducer,
  modalOpenerReducer: modalOpenerReducer,
  loginAdminReducer: loginAdminReducer,
  VerifyOTPPasswordReducer: VerifyOTPPasswordReducer,
  engineersReducer: engineersReducer,
  reducerfetchengdetails: reducerfetchengdetails,
  engineerRequestedLeaveReducer: engineerRequestedLeaveReducer,
  approveLeaveByAdminReducer: approveLeaveByAdminReducer,
  engineerLeaveHistoryReducer: engineerLeaveHistoryReducer,
  engineerAttendanceReducer: engineerAttendanceReducer,
  fetchassignedEnggDetailsReducer: fetchassignedEnggDetailsReducer,
  onClickEnggCartEnggLocationReducer: onClickEnggCartEnggLocationReducer,
  onClickEnggPinEnggLocationReducer: onClickEnggPinEnggLocationReducer,
  openAddClientModalReducer:openAddClientModalReducer,
  RegisterClientDataReducer:RegisterClientDataReducer,
  getAdminReportDataReducer:getAdminReportDataReducer,
  ReportCrouserHandlerReducer:ReportCrouserHandlerReducer,
  getClientModalDataReducer:getClientModalDataReducer,
  ClientFormDataFromApiReducer:ClientFormDataFromApiReducer
});

export default AdminRootReducer;
