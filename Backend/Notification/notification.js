const message = require("../Modals/ChatModel/MessageModal");
const Referal = require("../Modals/ClientDetailModals/ClientReferalSchema");
const Notification = require("../Modals/NotificationModal/notificationModal.js");
const engineerRating = require("../Modals/Rating/Rating");
const ReportInfoModel = require("../Modals/ReportModal/ReportModal.js");
const AssignEnggService = require("../Modals/ServiceEngineerModals/AssignCallbacks");
const AssignSecheduleRequest = require("../Modals/ServiceEngineerModals/AssignServiceRequest");
const EnggAttendanceServiceRecord = require("../Modals/ServiceEngineerModals/Attendance");
const EnggLeaveServiceRecord = require("../Modals/ServiceEngineerModals/EnggLeaveSchema");
const serviceRequest = require("../Modals/ServicesModal/ClientServicesRequest");
const CallbackRequests = require("../Modals/ServicesModal/ClinetCallback.js");
const SpearPartsRequested = require("../Modals/SpearParts/SparePartRequestModel");

const report = require("../Modals/ReportModal/ReportModal.js");

const clientDetails = require("../Modals/ClientDetailModals/RegisterClientDetailSchema");
const serviceEnggDetails = require("../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const admin = require("firebase-admin");
serviceAccount = {
  //to do push in .env file
  type: "service_account",
  project_id: "ieelifts-d3155",
  private_key_id: "252d099f8fa4cf72331feca129daf24c5c4dc45d",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9+GS/Vm3igyqK\nwI33G87R2gFWn070fdXrMSSPivmgXtwv9dRr4fJqFaULdGN3IpVvyqPwbKFWxM7J\nHeTmGsKSk+9MZpYf3az0qW+h6qBTzVnSfG4osZLRERy8iikK9I84r48tKGB/1j29\nf2KYg36ol0BEX4ciY5t6AUv9sfRB+hfQv0SesWcxxzMR6FzboPVRT40yQo5V0tPF\ntGdTfeD5X44Yet4hbi3O2lld/on6oUdlfWAfRf0CofNaQFuwI7hN8Fim/yZOSkne\ngpQHgGZDPg1tI451f47xGcH45kXRA0/v/Ab8eXpNWGS2iZ9wxCaS9oHJeaHXWGGg\nT5/hR3+JAgMBAAECggEAFcpQLsJd3bA986cdTE2cQ5CbZrGPVOwPhZLK0Xbs0JW7\nm/oOtkaMj9k7vTyfIXiOEOylhrEZ2zdn9hm/um/csa4rsg/HreViLrjgsn8/NLLx\nV/t93J0XF3QRtRlZQTBxh9xbXUqsXFLZciBn0XwDze12Kbbra+kRBHBG+dVXty7N\nmbuL7V/LYsdGOXMYHZyUjzaxVj7coWzQjiRtB/tA1b6pQdh5935qYF+wT2XEHGQu\noc98rqkjJ1OTAWQAQbrro0AHvJTzFN5Id3aSBs7ncGSMKgArWp7c5fCjDeCDvTct\n5wUatpncA9X9D7GuS0hUsud99wfo1nCGIKQsH5T4oQKBgQD946ct+jH+IyPY3C4H\nGKgOlU6i/aRDBg1RUiQCINAN+8ZFZoLBG3Xf7SK12yebxhXF9N0QQUVTRydJM7GG\nWugzGaiHppdGbCok9WqPC8AUCfV8K1Nqtby1voErW+NPn8A4wjaMeWKSqhYBe3sG\no3za5YZdjSJWsQEJP8wsN2Bq9wKBgQC/jLQAizdHjPVSYBejBNU6m0qLgHCbwvaS\nVW0kkjQy2r51z8mUFE4mJapbWK1mjIg5Zz7r8iV4lkoXaREAi8sX7a9sIjXB8bLl\nmapy9KLd6sbSsQBcOusA/dPDnbUUmd6LwJp3HdwPZrXHkQIiH2twhyd2SiBECCUm\n73bwZx5JfwKBgQDiGec8buAurySxcAQdlbu0oQsS5Edw2ObrUPd4Xbhre5krHQu8\n5bOn5AtRYQZ5F4M0c8ibPUV70JYP/tVODY9UUrlfdOCrepBdsaFgGtrH/cZ8+iij\nk42nXSyzbHWW53HMGklx+HfsnURTtZ/uXZJHbrimf5XhFmkRz5sIlZhsKQKBgQCx\nRlnsyusNOCJu62nUwItK4x+ZffQ547Tpd1A8cWcHzbRJOlX3ytcMrP097xMD/nmw\njqIIIaGWOZk2k1Fd7QK4EYyxifOwm60SmyXJoCj/MuJxacjIkuqdj0ymFNXazBDP\nzB/or+TTCB6iJM0RoXyAt0TJUA8Oh29C2op8MSMxpwKBgGsLdXefzE6Au7qojkTJ\nR+J1i+OS/APkHXxZexikiZTxgWLr+0eUNkS1u8/+BnarwGv8+lhFuKxSk4xitWLR\nVvC6xvwSEMGQ6ZjlVSFwZivUCqIdpj9sYsSTUpE23IjYB4HLXZBwQCnLa6YZAaG/\nxH7HpvimBjlHLh92cWzHocpe\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-zjw6f@ieelifts-d3155.iam.gserviceaccount.com",
  client_id: "113576115845138570846",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zjw6f%40ieelifts-d3155.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//---------------------------------------------------------------------------------------------------------------------------------
const tokenFindinginEnggDatabase = async (data) => {
  let datas;

  if (data.operationType === "update") {
    if (data.ns.coll === "enggleaverecords") {
      const leaveInformation = await EnggLeaveServiceRecord.find({
        _id: data.documentKey._id,
      });
      const enggDetails = await serviceEnggDetails
        .findOne({ EnggId: leaveInformation[0].ServiceEnggId })
        .select("firebaseToken");
      datas = {
        tokens: enggDetails.firebaseToken,
        title: `Leave Status`,
        body:
          leaveInformation[0].IsApproved === "true"
            ? `Your Leave is Approved By Admin for ${leaveInformation[0].Duration.From} to ${leaveInformation[0].Duration.To}`
            : `Your Leave is Not Approved By Admin for ${leaveInformation[0].Duration.From} to ${leaveInformation[0].Duration.To}`,
      };
    }
  }

  if (data.operationType === "insert") {
    const getFirebaseToken = await serviceEnggDetails
      .find({ EnggId: data.fullDocument.ServiceEnggId })
      .select("firebaseToken");
    if (data?.ns?.coll === "assigncallbacks") {
      datas = {
        tokens: getFirebaseToken[0].firebaseToken,
        title: `New Callback Request`,
        body: `A new Callabck has been assigned on ${data.fullDocument.Date}`,
      };
    }

    if (data?.ns?.coll === "assignservicerequests") {
      datas = {
        tokens: getFirebaseToken[0].firebaseToken,
        title: `New Service Request`,
        body: `A new service has been assigned on ${data.fullDocument.Date}`,
      };
    }
  }
  return FirebaseNotificationTestingPurpose(datas);
};

const tokenFindinginClientDatabase = async (data) => {
  let datas;

  if (data.operationType === "insert") {
    const getFirebaseToken = await clientDetails
      .find({ JobOrderNumber: data.fullDocument.JobOrderNumber })
      .select("firebaseToken");

    if (data.ns.coll === "assigncallbacks") {
      datas = {
        tokens: getFirebaseToken[0].firebaseToken,
        title: `Engineer Assigned`,
        body: `An engineer has been assigned to your Callback request on ${data.fullDocument.Date}`,
      };
    }

    if (data?.ns?.coll === "assignservicerequests") {
      datas = {
        tokens: getFirebaseToken[0].firebaseToken,
        title: `Engineer Assigned`,
        body: `An engineer has been assigned to your Service request on ${data.fullDocument.Date}`,
      };
    }

    if (data?.ns?.coll === "reports") {
      datas = {
        tokens: getFirebaseToken[0].firebaseToken,
        title: `Service Accept`,
        body: `Your service request has been accepted by the engineer with ID ${data.fullDocument.EnggId}`,
      };
    }
  }

  return FirebaseNotificationTestingPurpose(datas);
};
//-------------------------------------------------------------------------------------------------------------------------------

module.exports.watchNotifications = async (io) => {
  //-------------------------leave request --------------------------------
  EnggLeaveServiceRecord.watch().on("change", (data) => {
    console.log("EnggLeaveServiceRecord", data);

    if (data.operationType === "update") {
      tokenFindinginEnggDatabase(data);
    }

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Engg"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });

  //-------------------------leave request --------------------------------

  CallbackRequests.watch().on("change", (data) => {
    console.log("CallbackRequests");

    console.log("EnggLeaveServiceRecord--------->", data);

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Client"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });

  EnggAttendanceServiceRecord.watch().on("change", (data) => {
    console.log("EnggAttendanceServiceRecord");

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Engg"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });


  //report Info Model --------------------------------------------------
  ReportInfoModel.watch().on("change", (data) => {
    console.log("Report");

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Engg"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });

  //asssign engg to the client (notification in client app)-----------------------
  AssignEnggService.watch().on("change", (data) => {
    console.log("AssignEnggService2323232323", data);

    if (data.operationType === "insert") {
      tokenFindinginEnggDatabase(data);
      tokenFindinginClientDatabase(data);
    }
    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Engg", "Client"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });

  AssignSecheduleRequest.watch().on("change", (data) => {
    console.log("AssignSecheduleRequest");

    if (data.operationType === "insert") {
      tokenFindinginEnggDatabase(data);
      tokenFindinginClientDatabase(data);
    }

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Engg", "Client"];
    if (data.fullDocument) {
      saveNotification(owner, Data, io);
    }
  });
  // ---------------------------------------------------------------------------------------------------

  SpearPartsRequested.watch().on("change", (data) => {
    console.log("SpearPartsRequested");

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Engg"];
    if (data.fullDocument) {
      saveNotification(owner, Data, io);
    }
  });
  serviceRequest.watch().on("change", (data) => {
    console.log("serviceRequest");

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Client"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });
  message.watch().on("change", (data) => {
    console.log("message");

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Engg"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });

  {
    /* client Notification */
  }
  Referal.watch().on("change", (data) => {
    console.log("Referal");

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Client"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });
  engineerRating.watch().on("change", (data) => {
    console.log("engineerRating");

    const Data = JSON.stringify({
      time: data.wallTime,
      data: data.fullDocument,
    });
    const owner = ["Client"];
    if (data.fullDocument) {
      saveNotification(owner, Data);
    }
  });
};

report.watch().on("change", (data) => {
  console.log(data);
  tokenFindinginClientDatabase(data);
});

//save notification in DataBase
const saveNotification = async (owner, data) => {
  try {
    if (owner && data) {
      await Notification.create({
        Owner: owner,
        Data: data,
      });
    }
  } catch (err) {
    console.log("error in notification", err);
  }
};

//firebase send notification
const FirebaseNotificationTestingPurpose = async (data) => {
  try {
    console.log("ooooooooooo", data);
    let { tokens, title, body } = data;
    if (!tokens) return;

    console.log("===============================", tokens);
    // Convert tokens to array if it's not already an array
    if (!Array.isArray(tokens)) {
      tokens = [tokens];
    }

    await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title,
        body,
      },
    });
    console.log("Successfully sent notifications!");
  } catch (err) {
    console.log(err);
  }
};
