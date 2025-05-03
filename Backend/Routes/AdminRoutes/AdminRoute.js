const fs = require("fs");
const path = require("path");
const multer = require("multer");
const express = require("express");
const router = express.Router();
// const {verifyToken} = require('../../Middleware/ClientAuthMiddleware')

const adminContoller = require("../../Controllers/AdminController/AdminController");
const serviceEnggContoller = require("../../Controllers/ServiceEngineerContoller/ServiceEnggController");
const ClientController = require("../../Controllers/ClientController/ClientController");

const uploadClientData = require("../../Multer/ClientDocumentUpload");

const { uploadEdit } = require("../../Multer/EnggAttachmentUpload");

const { token } = require("../../Controllers/AdminController/AdminController")

//----------------------------- All post requests ---------------------------------------------

router.post("/assigncallback", adminContoller.assignCallbacks);

router.post("/assignRequest", adminContoller.AssignServiceRequests);

router.post("/createMembership", adminContoller.createClientMemebership);

router.post("/createServiceAdmin", adminContoller.createServiceAdmin); // crete service admin

router.post("/createServiceAdmin", adminContoller.createServiceAdmin); // crete service admin
router.post(
  "/createFilteringLocations",
  adminContoller.createLocationForFilter
); // crete service admin

//------------------------------ All get requests -------------------------------------------------

router.get("/Allcallbacks", adminContoller.getAllCallbacks);
router.get("/Allservices", adminContoller.getAllRequests);
router.get("/AllClients", adminContoller.getAllClientsData);
router.get("/AllServiceEngg", adminContoller.getAllServiceEnggData);
router.get(
  "/getClientCalbackDetailWithClientDetail/:callbackId",
  adminContoller.getCallbackDetailByCallbackId
);
router.get("/getCheckList", adminContoller.getAllChecklist);

router.get("/getEnggDetailById/:EnggId", adminContoller.getEnggDetail);

router.get(
  "/getAssignCallbackDetail/:callbackId",
  adminContoller.getAssignCallbackByCallbackId
);

router.get(
  "/getRequestDetailByRequestid/:RequestId",
  adminContoller.getRequestDetailByRequestId
);
// router.get(
//   "/getAssignCallbackDetail/:callbackId",
//   adminContoller.getAssignCallbackByCallbackId
// );

router.get(
  "/getAssignRequestDetail/:RequestId",
  adminContoller.getAssignServiceRequestByServiceRequestId
);
router.get("/getBookedDates", adminContoller.getBookedDates);
router.get("/clientDetail/:JobOrderNumber", ClientController.getClientDetail);

router.get("/getAllAssignServices", adminContoller.getAllAssignServiceRequest);

router.get("/getAllReferals", adminContoller.getAllreferals);

router.get("/getAllAssignCallback", adminContoller.getAllAssignCallbacks);

router.get(
  "/getCurrentDateAssignCallback",
  adminContoller.getCurrentDateAssignCallback
);

router.get(
  "/getCurrentDateAssignServiceRequest",
  adminContoller.getCurrentDateAssignServiceRequest
);

router.get("/getAvailbaleEng", adminContoller.getBookedSlotsForParticularEngg);

router.get("/getEnggCrouserData", adminContoller.getEnggCrouserData);
router.get("/getFilteringLocations", adminContoller.getFilteringLocations);

//-------------------------------Handle-CheckList-Routes ------------------------------------------

router.post("/checklist", adminContoller.createCheckList);

//------------------------------------admin Getting all the eng location----------------------------------------
router.get(
  "/getEnggLocationDetail",
  serviceEnggContoller.getEnggLocationDetail
);

router.get(
  "/fetchEnggAttendance/:ServiceEnggId/:selectedDate",
  adminContoller.fetchEnggAttendance
);

router.put("/approveLeaveByAdmin", adminContoller.approveLeaveByAdmin);

router.post("/filterClient", adminContoller.filterClient);
router.get("/serchingClient", adminContoller.searchClients);
router.get("/clientDetail/:JobOrderNumber", ClientController.getClientDetail);
router.get("/getClientDataForMembership", adminContoller.getClientData);
router.get("/getClientCalls", adminContoller.getClientCalls);
router.get("/getMembershipHistory", adminContoller.getMembershipHistory);
router.get("/getMembershipDetails", adminContoller.getMembershipDetails);
router.get("/getClientId/:JON", adminContoller.getClientDetail);
router.get("/getMembership", adminContoller.getClientMembership);
router.post("/createMembership", adminContoller.createClientMemebership);
router.post("/createCall", adminContoller.createClientCallDetails);
router.post("/createSpearParts", adminContoller.createSpearParts);
router.get("/getEngineerNames", adminContoller.getEngineerNames);
router.get("/getEngineerLeaveHistory", adminContoller.getEngineerLeaveHistory);
router.get(
  "/getEngineerRequestedLeave",
  adminContoller.getEngineerRequestedLeave
);
router.get("/takeActionOnLeave", adminContoller.takeActionOnLeave);

router.post("/loginAdmin", adminContoller.loginServiceAdmin);

//api for assignedEnggDetails
// router.get("/assignedEnggDetails/:ServiceEnggId",adminContoller.assignedEnggDetails)

// --------------- by Arrman date -> 29/03/2024   starts ---------------------------------------
router.get("/getEngineerLeaveHistory", adminContoller.getEngineerLeaveHistory);
router.get(
  "/getEngineerRequestedLeave",
  adminContoller.getEngineerRequestedLeave
);
router.get("/takeActionOnLeave", adminContoller.takeActionOnLeave);
// --------------- by Arrman date -> 29/03/2024   ends ---------------------------------------

// --by amit 29/03/2024 ------------
router.get(
  "/assignedEnggDetails/:ServiceEnggId",
  adminContoller.assignedEnggDetails
);

// --by Preet 02/04/2024 ------------
router.get(
  "/getSparePartRequest/:EnggId",
  adminContoller.getSparePartRequestByEngg
);
//--- by Preet 03/04/2024
router.post(
  "/ApproveDenySparepart",
  adminContoller.ApproveDenySparePartRequest
);
router.get(
  "/fetchAllotedSparePart/:EnggId",
  adminContoller.fetchAllotedSparePart
);
router.get(
  "/fetchDeniedSparePart/:EnggId",
  adminContoller.fetchDeniedSparePart
);

//--- by Preet 10/04/2024
router.get("/getReportForAdmin/:serviceId", adminContoller.fetchReportForAdmin);

//---by aayush malviya 18/04/24

// retain routes again 03/04/2024   ------------
router.post("/SendOtpEmail", adminContoller.sendPasswordResetOTPOnEmail);
router.post("/veriyfyOTP", adminContoller.ValidateOTPForgetPassword);
router.post("/updatePassword", adminContoller.updatePassword);

router.get("/getNotification", adminContoller.getNotification);
/**
 * <------------------------------Author: Rahul Kumar ------------01/05/2024------------->
 */

// ---------------------------- Armaan Singh 29/04/2024 ----------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uplodes/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.originalname}-${Date.now()}.jpeg`);
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/ElevatorDimensions/");
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    const fileName = file.originalname.split(".")[0];
    cb(null, `${fileName}-${Date.now()}.${parts}`);
  },
});
const upload = multer({ storage: storage });

router.put(
  "/putElevatorDimensions",
  upload.any(),
  adminContoller.updatElevatorDimensions
);
// ---------------------------- Armaan Singh 29/04/2024 ----------------------------

router.post(
  "/registerClientData",
  uploadClientData.fields([
    {
      name: "signedQuotation",
      maxCount: 1,
    },
    {
      name: "paymentForm",
      maxCount: 1,
    },
    {
      name: "salesOrder",
      maxCount: 1,
    },
    {
      name: "chequeForm",
      maxCount: 1,
    },
  ]),
  adminContoller.postElevatorForm
);

router.put("/updateClientForm", adminContoller.putElevatorForm);


router.get(
  "/getClientModalInformation/:jon",
  adminContoller.getClientModalInformation
);
router.put("/updateClientModalInformation", adminContoller.updateSecondStep);






//by preet ------------------ 30/05/2024  ------------------------------------  Add Engg cash Data --------------------------------

// router.put("/addEnggCash", adminContoller.addEnggCashByAdmin);
router.put("/depositeEnggCash", adminContoller.DepositeEnggCash);



//by preet ------------------ 03/06/2024  ------------------------------------  Add Engg Rating Data --------------------------------

router.get("/getEnggRatingById/:ServiceEnggId", adminContoller.getEnggRatingById)


//by preet ------------------ 05/06/2024  ------------------------------------ client Service history --------------------------------


router.get("/getClientServiceHistory/:JobOrderNumber", adminContoller.getClientServiceHistoryByJON)
router.get("/getClientCallbackHistory/:JobOrderNumber", adminContoller.getClientCallbackByJON)



// By Raj ----------------------------10/06/2024-----------------------get checkin checkout asset-------------------------------------------------

router.get("/getCheckInCheckOut/:ServiceEnggId", adminContoller.getCheckInCheckOut)   //



// --------------------------Create by Raj-----------------23/05/2024 ----------> 

router.get(
  "/getClientModalInformation/:jon",
  adminContoller.getClientModalInformation
);

router.get("/getEnggPersonalData/:EnggId", adminContoller.getEnggPersonalData);  //

//by preet ------------------ 27/05/2024  ------------------------------------  edit Engg formData --------------------------------

router.put(
  "/editEnggDetails/:EnggId",
  uploadEdit.fields([
    {
      name: "profilePhoto",
      maxCount: 1,
    },
    {
      name: "addharPhoto",
      maxCount: 1,
    },
    {
      name: "pancardPhoto",
      maxCount: 1,
    },
    {
      name: "drivingLicensePhoto",
      maxCount: 1,
    },
    {
      name: "additionalCoursePhoto",
      maxCount: 1,
    },
    {
      name: "qualificationPhoto",
      maxCount: 1,
    },
  ]),
  adminContoller.editEnggDetailsForm            //
);






router.post("/registerNewMembershipData", adminContoller.postMembershipData)



router.post('/offerDiscountByServiceEngg', adminContoller.offerMemberShipDiscount);





// router.post('/registerFirebaseTokenTesting', adminContoller.FirebaseNotificationTestingPurpose);




router.get('/getEnggSparePartRevenueData/:EnggId',adminContoller.getEnggSparePartRevenueData);


router.get('/GetSparePartProfitSummaryGraphData/:EnggId', adminContoller.GetSparePartProfitSummaryGraphData);



router.get('/getEnggCheckInOrNotOnCurrentDate/:ServiceEnggId', adminContoller.checkEnggCheckInOrNotOnCurrentDate);




module.exports = router;