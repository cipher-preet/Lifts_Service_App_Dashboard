const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const {verifyToken} = require('../../Middleware/ClientAuthMiddleware')
const checkClientServiceExist = require("../../Middleware/CheckClientPreviousService")

const clientController = require("../../Controllers/ClientController/ClientController");


//-------------------------------- all post requests ------------------------------------
router.post("/RegisterClientsAsJON", clientController.RegisterClientsAsJobOrderNumber);
router.post("/RegisterClientAsPhone", clientController.RegisterClientAsPhoneNumber)
router.post("/loginWithPhone",clientController.loginClientwithPhoneNumber);
router.post("/loginClientJON",clientController.loginClientWithJobOrderNumber)


/* router.post("/requestCallbacks",verifyToken('client'), clientController.RequestCallbacks); */
router.post("/requestCallbacks",checkClientServiceExist, clientController.RequestCallbacks);
router.post("/requestCallbacks", clientController.RequestCallbacks);
/* router.put("/updateCallbacks", verifyToken('client') , clientController.updateCallbacks); */
router.put("/updateCallbacks", clientController.updateCallbacks);

/* router.post("/imediateServiceRequest", verifyToken('client') , clientController.imediateServiceRequest);*/
router.post("/imediateServiceRequest",checkClientServiceExist,clientController.imediateServiceRequest);
router.post("/imediateServiceRequest",clientController.imediateServiceRequest); //await implement middlweware -----------------------------------!!!!!!!!!!!!!

router.post("/createReferal", clientController.referalUser);
// router.post("/createReferal", verifyToken('client'), clientController.referalUser);

router.post("/createReferal", verifyToken('client'), clientController.referalUser);
router.get("/getClientReferalByJobOrderNumber/:jobOrderNumber", verifyToken('client'), clientController.getAllReferalByJobOrderNumber);

router.post("/engineerRating",clientController.Rating)

// ------------------------all get Requests ----------------------------------------
router.get("/clientDetail/:JobOrderNumber", verifyToken('client'), clientController.getClientDetail);
router.get('/clientCallbacks/:JobOrderNumber', verifyToken('client'), clientController.getAllClientCallbacks);
router.get('/clientServices/:JobOrderNumber', verifyToken('client'), clientController.getAllClientServices);

router.get('/clientAllJONs/:PhoneNumber',verifyToken('client'), clientController.GetAllJobOrderNumberByClientPhoneNumber);
//-------------------------verify-----------------------------------------------------
router.get("/verifyclient",clientController.verifyClient);

//-------------------------rating{amit}--------------------------------------------------

// ----------- 17/04/2024 Preet -------------------------------
router.get("/fetchClientServiceHistory/:JobOrderNumber", clientController.fetchClientServiceHistory)



// ------------------------all Put Requests ----------------------------------------------------
router.put("/updateCallbacks", clientController.updateCallbacks);
router.put("/updateServiceRequest", clientController.updateServiceRequest);
// router.post("/engineerRating",verifyToken('client'),clientController.Rating)


// ------------------------20/05/2024 by preet --------------------------------
router.get("/getClientCurentActiveService/:JobOrderNumber", clientController.getCurrentScheduleService);

router.get("/gettrackerdetails/:trackerId", clientController.getStepsAndEnggDetail);

//---------------------------- embeded by preet 24/05/2024---------------------------------------------------------------
router.post(
      "/clientPayment",
      clientController.clientPayment
    );
    

router.get("/getMembershipData",clientController.getMembershipFeatuesDetails)
router.get("/getMembershipDiscount/:JobOrderNumber",clientController.getMembershipDiscount)


router.get("/checkpaymentstatusandmakeinvoice/:JobOrderNumber", clientController.checkPaymentStatusAndMakeInvoice)


router.post('/registerFirebaseToken', clientController.firebaseTokenForPushNotificationPurpose);



module.exports = router;
