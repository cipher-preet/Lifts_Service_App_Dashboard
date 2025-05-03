const ServiceAssigntoEngg = require("../../Modals/ServiceEngineerModals/AssignCallbacks");

const AssignSecheduleRequest = require("../../Modals/ServiceEngineerModals/AssignServiceRequest");

const getAllServiceRequest = require("../../Modals/ServicesModal/ClientServicesRequest");

const getAllCalbacks = require("../../Modals/ServicesModal/ClinetCallback");

const clientDetailSchema = require("../../Modals/ClientDetailModals/RegisterClientDetailSchema");

const ServiceEnggData = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const ChecklistModal = require("../../Modals/ChecklistModal/ChecklistModal");

const ServiceEnggBasicSchema = require("../../Modals/ServiceEngineerModals/ServiceEngineerDetailSchema");

const AssignMemeberships = require("../../Modals/MemebershipModal/MembershipsSchema");

const ReferalSchema = require("../../Modals/ClientDetailModals/ClientReferalSchema");

const EnggRating = require("../../Modals/Rating/Rating");

const serviceAdmin = require("../../Modals/ServiceAdminModel/ServiceAdminSchema");

const EnggAttendanceServiceRecord = require("../../Modals/ServiceEngineerModals/Attendance");

const EnggLeaveServiceRecord = require("../../Modals/ServiceEngineerModals/EnggLeaveSchema");

const ClientCalls = require("../../Modals/ClientDetailModals/ClientCallsSchema");

const SpearParts = require("../../Modals/SpearParts/SpearParts");

const LocationSchema = require("../../Modals/LocationModel/MajorLocationForFilter");

const ForgetPassOTP = require("../../Modals/OTP/ForgetPasswordOtp");

const SparePartTable = require("../../Modals/SpearParts/SparePartRequestModel");

const ReportTable = require("../../Modals/ReportModal/ReportModal");

const ElevatorFormSchema = require("../../Modals/ClientDetailModals/ClientFormSchema");

const RegisteredElevatorForm = require("../../Modals/ClientDetailModals/ClientFormSchema");

const MembershipTable = require("../../Modals/MemebershipModal/MembershipDataSchema");

const { generateToken } = require("../../Middleware/ClientAuthMiddleware");

const mongoose = require("mongoose");

const nodemailer = require("nodemailer");
const Notification = require("../../Modals/NotificationModal/notificationModal");

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// function to handle Engg Crouser Data on dashboard only   ServiceEnggId, ServiceEnggName, ServiceEnggPic ,averageRating

module.exports.getEnggCrouserData = async (req, res) => {
  try {
    const EnggDetail = await ServiceEnggData.find({});
    const currentDate = new Date();

    const BasicDetail = await Promise.all(
      EnggDetail.map(async (item) => {
        const enggRating = await EnggRating.find({
          ServiceEnggId: item.EnggId,
        });
        const ratingsCount = enggRating.length;
        const ratingsSum = enggRating.reduce(
          (sum, rating) => sum + rating.Rating,
          0
        );
        const averageRating =
          ratingsCount > 0
            ? parseFloat((ratingsSum / ratingsCount).toFixed(1))
            : 0;

        const ServiceEnggId = item.EnggId;

        const serviceAssignments = await ServiceAssigntoEngg.find({
          ServiceEnggId,
        });
        const assignScheduleRequests = await AssignSecheduleRequest.find({
          ServiceEnggId,
        });

        const mainDetails = serviceAssignments
          .concat(assignScheduleRequests)
          .map((data) => ({
            ServiceEnggId: data.ServiceEnggId,
            JobOrderNumber: data.JobOrderNumber,
            Slot: data.Slot,
            Date: data.Date,
            TaskStatus: data.ServiceProcess,
          }));

        const filteredServiceAssignments = mainDetails.filter((item) => {
          return item.Date === currentDate.toLocaleDateString("en-GB");
        });

        const filteredServiceAssignmentsWithClientName = await Promise.all(
          filteredServiceAssignments.map(async (assignment) => {
            const client = await clientDetailSchema.findOne({
              JobOrderNumber: assignment.JobOrderNumber,
            });
            return {
              ...assignment,
              ClientName: client?.name,
              ClientNumber: client?.PhoneNumber,
              ClientAddress: client?.Address,
            };
          })
        );

        filteredServiceAssignmentsWithClientName.sort((a, b) => {
          const timeA = convertTimeToSortableFormat(a.Slot[0]);
          const timeB = convertTimeToSortableFormat(b.Slot[0]);
          return timeA - timeB;
        });

        return {
          EnggObjId: item._id,
          ServiceEnggId: item.EnggId,
          ServiceEnggName: item.EnggName,
          ServiceEnggPic: item.EnggPhoto,
          averageRating,
          filteredServiceAssignmentsWithClientName,
        };
      })
    );

    res.status(200).json({
      BasicDetailForCrouser: BasicDetail.filter((item) => !item.error),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

function convertTimeToSortableFormat(time) {
  const [startTime, endTime] = time.split("-").map((slot) =>
    slot
      .trim()
      .split(":")
      .map((part) => parseInt(part))
  );
  return (
    startTime[0] * 60 +
    (startTime[1] + (startTime[0] >= 12 ? 12 : 0)) * 60 +
    (startTime[0] >= 12 ? 720 : 0) +
    (startTime[0] === 12 ? -720 : 0)
  );
}
function convertTimeToSortableFormat(time) {
  const [startTime, endTime] = time.split("-").map((slot) =>
    slot
      .trim()
      .split(":")
      .map((part) => parseInt(part))
  );
  return (
    startTime[0] * 60 +
    (startTime[1] + (startTime[0] >= 12 ? 12 : 0)) * 60 +
    (startTime[0] >= 12 ? 720 : 0) +
    (startTime[0] === 12 ? -720 : 0)
  );
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to get the booked slots for the particular Engg...

module.exports.getBookedSlotsForParticularEngg = async (req, res) => {
  try {
    const { Date } = req.query;

    const assignCallbackDate = await ServiceAssigntoEngg.find({
      Date,
    });
    const assignRequestDate = await AssignSecheduleRequest.find({
      Date,
    });

    const combinedData = [...assignCallbackDate, ...assignRequestDate];

    // Grouping slots by ServiceEnggId
    const slotsByEnggId = {};
    combinedData.forEach((entry) => {
      if (!slotsByEnggId[entry.ServiceEnggId]) {
        slotsByEnggId[entry.ServiceEnggId] = [];
      }
      slotsByEnggId[entry.ServiceEnggId].push(...entry.Slot);
    });

    // Converting object into array of objects
    const result = await Promise.all(
      Object.keys(slotsByEnggId).map(async (ServiceEnggId) => {
        const enggDetails = await ServiceEnggBasicSchema.findOne({
          EnggId: ServiceEnggId,
        });
        return {
          ServiceEnggId,
          ServiceEnggName: enggDetails ? enggDetails.EnggName : "Unknown",
          ServiceEnggName: enggDetails ? enggDetails.EnggName : "Unknown",
          slots: slotsByEnggId[ServiceEnggId],
        };
      })
    );

    res.status(200).json({
      BookedSlots: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle get current date Assign Service Detail
module.exports.getCurrentDateAssignServiceRequest = async (req, res) => {
  try {
    const currentDate = new Date().toLocaleDateString("en-GB");
    const currentDetailServiceRequest = await AssignSecheduleRequest.find({
      Date: currentDate,
    });

    if (currentDetailServiceRequest.length === 0) {
      return res.status(400).json({
        message: "no Service Request for today's",
      });
    }

    const serviceRequestDetail = await Promise.all(
      currentDetailServiceRequest.map(async (item) => {
        const enggDetail = await ServiceEnggData.findOne({
          EnggId: item.ServiceEnggId,
        });
        const clientDetail = await clientDetailSchema.findOne({
          JobOrderNumber: item.JobOrderNumber,
        });
        const ServiceRequestdetail = await getAllServiceRequest.findOne({
          RequestId: item.RequestId,
        });
        // Extract only specific fields from enggDetail and clientDetail
        const enggName = enggDetail ? enggDetail.EnggName : null;
        const clientName = clientDetail ? clientDetail.name : null;
        const ClientPhoto = clientDetail ? clientDetail.ProfileImage : null;
        const ClientAddress = clientDetail ? clientDetail.Address : null;
        const ClientPhoneNumber = clientDetail
          ? clientDetail.PhoneNumber
          : null;
        const ClientTypeOfIssue = ServiceRequestdetail
          ? ServiceRequestdetail.TypeOfIssue
          : null;
        const ClientDescription = ServiceRequestdetail
          ? ServiceRequestdetail.Description
          : null;
        const RepresentativeName =
          ServiceRequestdetail.RepresentativeName || null;
        const RepresentativeNumber =
          ServiceRequestdetail.RepresentativeNumber || null;
        return {
          ...item._doc,
          enggName,
          clientName,
          ClientPhoto,
          ClientAddress,
          ClientPhoneNumber,
          ClientTypeOfIssue,
          ClientDescription,
          RepresentativeName,
          RepresentativeNumber,
        };
      })
    );
    return res.status(200).json({
      serviceRequestDetail,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle get AssignCallbackDetail of current date
module.exports.getCurrentDateAssignCallback = async (req, res) => {
  try {
    const currentDate = new Date().toLocaleDateString("en-GB");
    const currentDetailCallback = await ServiceAssigntoEngg.find({
      Date: currentDate,
    });

    if (currentDetailCallback.length === 0) {
      return res.status(400).json({
        message: "no callback for today's",
      });
    }
    // console.log("currentDetailCallback", currentDetailCallback);
    const callbackWithDetails = await Promise.all(
      currentDetailCallback.map(async (item) => {
        const enggDetail = await ServiceEnggData.findOne({
          EnggId: item.ServiceEnggId,
        });
        const clientdetail = await clientDetailSchema.findOne({
          JobOrderNumber: item.JobOrderNumber,
        });
        const callbackdetail = await getAllCalbacks.findOne({
          callbackId: item.callbackId,
        });
        // Extract only specific fields from enggDetail and clientDetail
        const enggName = enggDetail ? enggDetail.EnggName : null;
        const clientName = clientdetail ? clientdetail.name : null;
        const ClientPhoto = clientdetail ? clientdetail.ProfileImage : null;
        const ClientAddress = clientdetail ? clientdetail.Address : null;
        const ClientPhoneNumber = clientdetail
          ? clientdetail.PhoneNumber
          : null;
        const ClientTypeOfIssue = callbackdetail
          ? callbackdetail.TypeOfIssue
          : null;
        const ClientDescription = callbackdetail
          ? callbackdetail.Description
          : null;
        const RepresentativeName = callbackdetail
          ? callbackdetail.RepresentativeName
          : null;
        const RepresentativeNumber = callbackdetail
          ? callbackdetail.RepresentativeNumber
          : null;
        return {
          ...item._doc,
          enggName,
          clientName,
          ClientPhoto,
          ClientAddress,
          ClientPhoneNumber,
          ClientTypeOfIssue,
          ClientDescription,
          RepresentativeName,
          RepresentativeNumber,
        };
      })
    );
    return res.status(200).json({
      callbackWithDetails,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle getAllAssignCallbacks (as used in ticket section)

module.exports.getAllAssignCallbacks = async (req, res) => {
  try {
    const allAssignCallbacks = await ServiceAssigntoEngg.find({});
    if (!allAssignCallbacks || allAssignCallbacks.length === 0) {
      return res.status(400).json({
        message: "No callback",
      });
    }
    return res.status(200).json({
      allAssignCallbacks,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//functio to handle get all Referals for admin
module.exports.getAllreferals = async (req, res) => {
  try {
    const allReferals = await ReferalSchema.find({});
    return res.status(200).json({
      message: "All referals fetched Successfully",
      Referals: allReferals,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

//function to handle get ALL Aassign service request by admin from the assignserviceRequestTable

module.exports.getAllAssignServiceRequest = async (req, res) => {
  try {
    const assignServicerequest = await AssignSecheduleRequest.find();

    // Get all unique JobOrderNumbers and AllotAChecklist ids
    const jobOrderNumbers = assignServicerequest.map(
      (request) => request.JobOrderNumber
    );
    const allotAChecklistIds = assignServicerequest.map(
      (request) => request.AllotAChecklist
    );
    const uniqueJobOrderNumbers = Array.from(new Set(jobOrderNumbers));
    const uniqueAllotAChecklistIds = Array.from(new Set(allotAChecklistIds));

    // Fetch client details for each unique JobOrderNumber
    const clientDetails = await clientDetailSchema.find({
      JobOrderNumber: {
        $in: uniqueJobOrderNumbers,
      },
    });

    // Fetch checklist details for each unique AllotAChecklist id
    const checklistDetails = await ChecklistModal.find({
      _id: {
        $in: uniqueAllotAChecklistIds,
      },
    });

    // Create a map for quick access to client and checklist details
    const clientMap = {};
    clientDetails.forEach((client) => {
      clientMap[client.JobOrderNumber] = client;
    });

    const checklistMap = {};
    checklistDetails.forEach((checklist) => {
      checklistMap[checklist._id] = checklist;
    });

    // Combine assign service requests with client and checklist details
    const clientdetailsEmbeded = assignServicerequest.map((request) => ({
      ...request._doc,
      clientDetail: clientMap[request.JobOrderNumber] || null,
      checklistDetail: checklistMap[request.AllotAChecklist] || null,
    }));

    res.status(200).json({
      message: "Fetch All Assign Service Request successfully",
      clientdetailsEmbeded,
    });
  } catch (error) {
    console.error("Error creating engg detail:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// function to handle get all engg Detail by Id
module.exports.getEnggDetail = async (req, res) => {
  try {
    const { EnggId } = req.params;

    const enggDetail = await ServiceEnggBasicSchema.findOne({
      EnggId,
    });

    if (!enggDetail) {
      return res.status(404).json({
        message: "No services Engg found for the specified Service Engineer ID",
      });
    }

    res.status(200).json({
      message: "servicesc Engg retrieved by ID successfully",
      enggDetail,
    });
  } catch (error) {
    console.error("Error creating engg detail:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle insert data in the { checkList }
module.exports.createCheckList = async (req, res) => {
  try {
    const { checklistName, subcategories } = req.body;

    const newCheckList = await ChecklistModal.create({
      checklistName,
      subcategories,
    });
    res.status(201).json({
      message: "Checklist created successfully",
      checklist: newCheckList,
    });
  } catch (error) {
    console.error("Error creating checklist:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//fucntion to get the checklist
module.exports.getAllChecklist = async (req, res) => {
  try {
    const checklist = await ChecklistModal.find({});

    res.status(200).json({
      message: "fetch checklist sucessfully",
      Checklists: checklist,
    });
  } catch (error) {
    console.error("Error while getting checklist:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle   (assign callbacks to Engg)
module.exports.assignCallbacks = async (req, res) => {
  try {
    const {
      ServiceEnggId,
      JobOrderNumber,
      callbackId,
      AllotAChecklist,
      Slot,
      Date,
      Message,
      ServiceProcess,
    } = req.body;

    let callback;

    // Check if the callbackId already exists
    const existingCallback = await ServiceAssigntoEngg.findOne({
      callbackId,
    });

    if (existingCallback) {
      // Update existing data
      callback = await ServiceAssigntoEngg.findOneAndUpdate(
        {
          callbackId,
        },
        {
          ServiceEnggId,
          JobOrderNumber,
          AllotAChecklist,
          Slot,
          Date,
          Message,
          ServiceProcess,
        },
        {
          new: true,
        } // Return the updated document
      );
    } else {
      // Create a new entry
      callback = await ServiceAssigntoEngg.create({
        ServiceEnggId,
        JobOrderNumber,
        callbackId,
        AllotAChecklist,
        Slot,
        Date,
        Message,
        ServiceProcess,
      });
    }

    const populatedCallback = await ServiceAssigntoEngg.findById(callback._id)
      .populate("AllotAChecklist")
      .exec();

    res.status(201).json({
      message: "callback Assign Succesfully",
      callback: populatedCallback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to assign requests from the client
module.exports.AssignServiceRequests = async (req, res) => {
  try {
    const {
      ServiceEnggId,
      JobOrderNumber,
      RequestId,
      AllotAChecklist,
      Slot,
      Date,
      Message,
      ServiceProcess,
      RepresentativeName,
      RepresentativeNumber,
    } = req.body;

    let callback;
    // console.log("RepresentativeName--",RepresentativeName)
    // console.log("RepresentativeNumber--",RepresentativeNumber)
    const existingCallback = await AssignSecheduleRequest.findOne({
      RequestId,
    });

    if (existingCallback) {
      callback = await AssignSecheduleRequest.findOneAndUpdate(
        {
          RequestId,
        },
        {
          ServiceEnggId,
          JobOrderNumber,
          AllotAChecklist,
          Slot,
          Date,
          Message,
          ServiceProcess,
          RepresentativeName,
          RepresentativeNumber,
          RepresentativeNumber,
        },
        {
          new: true,
        }
      );
    } else {
      callback = await AssignSecheduleRequest.create({
        ServiceEnggId,
        JobOrderNumber,
        RequestId,
        AllotAChecklist,
        Slot,
        Date,
        Message,
        ServiceProcess,
        RepresentativeName,
        RepresentativeNumber,
      });
    }

    await getAllServiceRequest.findOneAndUpdate(
      {
        RequestId,
      },
      {},
      {
        RepresentativeName,
        RepresentativeNumber,
        RepresentativeNumber,
      },
      {
        new: true,
      }
    );

    const populatedService = await AssignSecheduleRequest.findById(Request._id)
      .populate("AllotAChecklist")
      .exec();

    res.status(201).json({
      message: "service Request Assign Succesfully",
      Request: populatedService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to get all the callbacks
module.exports.getAllCallbacks = async (req, res) => {
  try {
    const callBackRequests = await getAllCalbacks.find();

    //fetch extra client detail
    const clientCallbacksDetails = await Promise.all(
      callBackRequests.map(async (callback) => {
        const clientDetail = await clientDetailSchema.findOne({
          JobOrderNumber: callback.JobOrderNumber,
        });
        return {
          ...callback._doc,
          clientDetail: clientDetail,
        };
      })
    );

    res.status(200).json({
      message: "all callBack fetched Succesfully",
      Callbacks: clientCallbacksDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to get all the Requests
module.exports.getAllRequests = async (req, res) => {
  try {
    const serviceRequests = await getAllServiceRequest.find();

    const clientRequestDetail = await Promise.all(
      serviceRequests.map(async (Requests) => {
        const clientDetail = await clientDetailSchema.findOne({
          JobOrderNumber: Requests.JobOrderNumber,
        });
        return {
          ...Requests._doc,
          clientDetail: clientDetail,
        };
      })
    );

    res.status(200).json({
      message: "all services Requests fetched Succesfully",
      ServiceRequest: clientRequestDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Function to handle get Callbackdetail By CallbackId
module.exports.getCallbackDetailByCallbackId = async (req, res) => {
  try {
    const { callbackId } = req.params;

    const clientCallbacksDetails = await getAllCalbacks.findOne({
      callbackId,
    });

    // console.log("HE",clientCallbacksDetails)

    if (!clientCallbacksDetails) {
      res.status(404).json({
        message: "no data found with this callback id",
      });
    }

    const clientDetail = await clientDetailSchema.findOne({
      JobOrderNumber: clientCallbacksDetails.JobOrderNumber,
    });
    // console.log("HE",clientCallbacksDetails.JobOrderNumber)

    const callbackClientdetails = {
      ...clientCallbacksDetails._doc,
      clientDetail: clientDetail,
    };

    res.status(200).json({
      message: "all detal fetched successfully",
      callback: callbackClientdetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Function to handle get Request detail By RequestId
module.exports.getRequestDetailByRequestId = async (req, res) => {
  try {
    const { RequestId } = req.params;

    const clientRequestDetails = await getAllServiceRequest.findOne({
      RequestId,
    });
    // console.log("clientRequestDetails",clientRequestDetails)
    if (!clientRequestDetails) {
      res.status(404).json({
        message: "no data found with this Request id",
      });
    }

    const clientDetail = await clientDetailSchema.findOne({
      JobOrderNumber: clientRequestDetails.JobOrderNumber,
    });
    // console.log("HE",clientCallbacksDetails.JobOrderNumber)

    const RequestClientdetails = {
      ...clientRequestDetails._doc,
      clientDetail: clientDetail,
    };

    res.status(200).json({
      message: "all detal fetched successfully",
      request: RequestClientdetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// get All Clients

//function to handle GetAllClients infromation
module.exports.getAllClientsData = async (req, res) => {
  try {
    const clients = await clientDetailSchema.find();
    res.status(200).json({
      message: "all  Clients fetched Succesfully",
      Clients: clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// get All serviceEnggeniers

//function to handle getAllserviceEngg Details

module.exports.getAllServiceEnggData = async (req, res) => {
  try {
    const serviceEngg = await ServiceEnggData.find();
    res.status(200).json({
      message: "all  ServiceEngg fetched Succesfully",
      ServiceEngg: serviceEngg,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// function to handle getAssign Callback By CallbackId
module.exports.getAssignCallbackByCallbackId = async (req, res) => {
  try {
    const { callbackId } = req.params;

    const callbackDetail = await ServiceAssigntoEngg.findOne({
      callbackId,
    });
    if (!callbackDetail) {
      return res.status(404).json({
        error: "Callback not found",
      });
    }

    const serviceEnggDetail = await ServiceEnggData.findOne({
      EnggId: callbackDetail.ServiceEnggId,
    });
    if (!serviceEnggDetail) {
      return res.status(404).json({
        error: "Service Engineer details not found",
      });
    }
    const checkList = await ChecklistModal.findOne({
      _id: callbackDetail.AllotAChecklist,
    });

    if (!checkList) {
      return res.status(404).json({
        error: "Checklist not found",
      });
    }
    const callbackdetails = {
      ...callbackDetail._doc,
      serviceEnggDetail: serviceEnggDetail,
      checkList: checkList,
    };

    res.status(200).json({
      callbackdetails: callbackdetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function to handle get Assign service request By ServiceId
module.exports.getAssignServiceRequestByServiceRequestId = async (req, res) => {
  try {
    const { RequestId } = req.params;

    const RequestDetail = await AssignSecheduleRequest.findOne({
      RequestId,
    });
    if (!RequestDetail) {
      return res.status(404).json({
        error: "Request not found",
      });
    }

    const serviceEnggDetail = await ServiceEnggData.findOne({
      EnggId: RequestDetail.ServiceEnggId,
    });
    if (!serviceEnggDetail) {
      return res.status(404).json({
        error: "Service Engineer details not found",
      });
    }
    const checkList = await ChecklistModal.findOne({
      _id: RequestDetail.AllotAChecklist,
    });

    if (!checkList) {
      return res.status(404).json({
        error: "Checklist not found",
      });
    }
    const callbackdetails = {
      ...RequestDetail._doc,
      serviceEnggDetail: serviceEnggDetail,
      checkList: checkList,
    };

    res.status(200).json({
      details: callbackdetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

//------------------------------------------------------------------------------------------------------------------------------------
module.exports.getClientMemebership = async (req, res) => {
  try {
    const membershipData = await AssignMemeberships.find();

    const membershipTypes = ["warrenty", "platinum", "gold", "silver"];
    const calculations = {};

    membershipTypes.forEach((type) => {
      const filteredData = filterMembershipByType(membershipData, type);
      calculations[type] = calculateData(filteredData);
    });

    res.status(201).json({
      success: true,
      ...calculations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

// to filter the membership
//-------------------------------------------------------------------------------------------------------------------------------------------------
//function to get all booked dates {amit-features}

module.exports.getBookedDates = async (req, res) => {
  const timeSlots = [
    {
      slot: "9:00-10:00",
    },
    {
      slot: "10:00-11:00",
    },
    {
      slot: "11:00-12:00",
    },
    {
      slot: "12:00-13:00",
    },
    {
      slot: "13:00-14:00",
    },
    {
      slot: "14:00-15:00",
    },
    {
      slot: "15:00-16:00",
    },
    {
      slot: "16:00-17:00",
    },
    {
      slot: "17:00-18:00",
    },
  ];

  try {
    const data = await ServiceAssigntoEngg.find();

    const groupedDates = {};

    data.forEach((entry) => {
      if (!groupedDates[entry.Date]) {
        groupedDates[entry.Date] = {
          slots: [],
          isSlotAvailable: true,
        };
      }
      groupedDates[entry.Date].slots.push(entry.Slot);
    });

    Object.keys(groupedDates).forEach((date) => {
      const slotLength = groupedDates[date].slots.length;
      const allSlots = timeSlots.length;

      if (allSlots === slotLength) {
        groupedDates[date].isSlotAvailable = false;
      }
    });

    res.json(groupedDates);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// This is the api for fetching Eng details acc to current Date for engg crousel

const getClientDetailsByJobOrderNumbers = async (jobOrderNumbers) => {
  const clients = await clientDetailSchema.find({
    JobOrderNumber: {
      $in: jobOrderNumbers,
    },
  });
  return clients.reduce((map, client) => {
    map[client.JobOrderNumber] = client.name;
    return map;
  }, {});
};

module.exports.getEngAssignSlotsDetails = async (req, res) => {
  try {
    const { ServiceEnggId } = req.body;
    const currentDate = new Date().toLocaleDateString("en-GB");

    // Fetch data from both tables concurrently using Promise.all
    const [serviceAssignments, scheduleRequests] = await Promise.all([
      ServiceAssigntoEngg.find({
        ServiceEnggId,
        Date: currentDate,
      }),
      AssignSecheduleRequest.find({
        ServiceEnggId,
        Date: currentDate,
      }),
    ]);

    const jobOrderNumbers = [
      ...new Set([
        ...serviceAssignments.map((assignment) => assignment.JobOrderNumber),
        ...scheduleRequests.map((request) => request.JobOrderNumber),
      ]),
    ];

    const clientDetailsMap = await getClientDetailsByJobOrderNumbers(
      jobOrderNumbers
    );

    const finalData = {
      serviceAssignments: serviceAssignments.map((assignment) => ({
        ...assignment._doc,
        ClientName: clientDetailsMap[assignment.JobOrderNumber],
      })),
      scheduleRequests: scheduleRequests.map((request) => ({
        ...request._doc,
        ClientName: clientDetailsMap[request.JobOrderNumber],
      })),
      currentDate,
    };

    // Send the final data as the response
    res.status(200).json({
      currentateData: finalData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------...

//function to handle login service Engg (Preet)
module.exports.loginServiceAdmin = async (req, res) => {
  try {
    const { AdminId, Password, Role } = req.body;
    const Admin = await serviceAdmin.findOne({ AdminId });
    /*  if(Admin.Role !== Role){
      return res.status(401).json({status:"error", message: "permission denied" });
    }   */

    console.log(AdminId, Password, Role);

    if (!Admin || Admin.Password !== Password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      _id: Admin._id,
      AdminName: Admin.AdminName,
      Phone: Admin.Phone,
      Role: Admin.Role,
      AdminId: Admin.AdminId,
    });

    res.status(200).json({
      message: "You are logged in Successfully",
      Admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.createServiceAdmin = async (req, res) => {
  try {
    const { AdminName, Password, Phone, Role, AdminId, email } = req.body;

    const newData = await serviceAdmin.create({
      AdminName,
      Password,
      Phone,
      Role,
      AdminId,
      email,
    });

    return res.status(201).json({
      newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.fetchEnggAttendance = async (req, res) => {
  try {
    const { ServiceEnggId, selectedDate } = req.params;
    // console.log("ServiceEnggId", ServiceEnggId);
    if (ServiceEnggId) {
      const len = 5;
      const today = new Date(selectedDate);

      const dates = Array.from(
        {
          length: len,
        },
        (_, i) => {
          const previousDay = new Date(today);
          previousDay.setDate(today.getDate() - 2 + i);
          return previousDay.toLocaleDateString("en-GB");
        }
      );

      const attendanceData = await Promise.all(
        dates.map(async (date) => {
          const response = await EnggAttendanceServiceRecord.findOne({
            ServiceEnggId,
            Date: date,
          });
          return response;
        })
      );

      //console.log(attendanceData)

      return res.status(200).json({
        attendanceData,
      });
    }

    return res.status(500).json({
      error: "Invalid Input",
      message: error.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server Error in fetchEnggAttendance",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.approveLeaveByAdmin = async (req, res) => {
  try {
    const { id, IsApproved } = req.body;
    await EnggLeaveServiceRecord.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        IsApproved: IsApproved,
      }
    );

    if (newData.TotalLeave >= newData.UsedLeave) {
      const used_Leave = parseInt(newData.UsedLeave) + 1;
      const newData = await EnggLeaveServiceRecord.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          UsedLeave: used_Leave,
        }
      );

      return res.status(201).json({
        newData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error in approveLeaveByAdmin",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// {armaan-dev}
module.exports.createClientCallDetails = async (req, res) => {
  try {
    const {
      jobOrderNumber,
      callType,
      description,
      discountOffered,
      callDate,
      duration,
    } = req.body;
    const clientCall = await ClientCalls.create({
      jobOrderNumber,
      callType,
      description,
      discountOffered,
      callDate,
      duration,
    });
    res.status(201).json({
      success: true,
      clientCall,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.getClientCalls = async (req, res) => {
  try {
    const { callType, jobOrderNumber } = req.query;
    const clientCallData = await ClientCalls.find({
      jobOrderNumber,
      callType,
    }).sort({
      callDate: -1,
    }); // Sort by callDate in ascending order
    res.status(201).json({
      success: true,
      clientCallData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};
//--------------------------------------------------------------------------------------------------------------------------------------------------
module.exports.getClientData = async (req, res) => {
  try {
    const { jobOrderNumber } = req.query;
    const clientDetails = await clientDetailSchema.find({
      JobOrderNumber: jobOrderNumber,
    });
    const responseData = {
      name: clientDetails[0].name,
      jobOrderNumber,
      number: clientDetails[0].PhoneNumber,
      address: clientDetails[0].Address,
      profileImage: clientDetails[0].ProfileImage,
      DOH: clientDetails[0].DateOfHandover,
    };
    res.status(201).json({
      success: true,
      responseData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.getMembershipHistory = async (req, res) => {
  try {
    const { jobOrderNumber } = req.query;
    const membershipHistory = await AssignMemeberships.find({
      JobOrderNumber: jobOrderNumber,
    });
    const historyData = membershipHistory.filter((a) => {
      return a.EndDate < Date.now(); // Added return statement here
    });
    const ratings = await EnggRating.find({
      JobOrderNumber: jobOrderNumber,
    });
    let averageRating = 0;
    let ratingCount = 0;
    for (const rating in ratings) {
      if (
        rating.createdAt >= historyData.StartDate &&
        rating.createdAt <= historyData.EndDate
      ) {
        averageRating += rating.Rating;
        ratingCount++;
      }
    }
    let calculateRating = averageRating / ratingCount;
    const response = {
      historyData,
      calculateRating,
    };
    res.status(201).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.filterClient = async (req, res) => {
  try {
    const filters = req.body.filterCondition;
    const membershipFilter = filters.filter(
      (type) => type.type === "membership"
    );
    const elevatorTypeFilter = filters.filter(
      (type) => type.type === "elevatorType"
    );
    const locationFilter = filters.filter((type) => type.type === "location");

    const sortFilter = filters.filter(
      (type) => type.type === "date" || type.type === "name"
    );

    let membershipData,
      elevatorData,
      locationData = [];
    const clientData = await clientDetailSchema.find();

    membershipFilter.forEach(async (member) => {
      const { condition } = member;
      try {
        let membership = clientData.filter(
          (client) =>
            client.MembershipType &&
            client.MembershipType.toLowerCase() === condition.toLowerCase()
        );
        if (membershipData && membershipData.length) {
          membershipData = [...membershipData, ...membership];
        } else {
          membershipData = [...membership];
        }
      } catch (error) {
        console.error("Error fetching membership:", error);
      }
    });

    elevatorTypeFilter.forEach(async (member) => {
      const { condition } = member;
      try {
        let elevatorClient = clientData.filter(
          (client) =>
            client.ModelType &&
            client.ModelType.toLowerCase() === condition.toLowerCase()
        );
        if (elevatorData && elevatorData.length) {
          elevatorData = [...elevatorData, ...elevatorClient];
        } else {
          elevatorData = [...elevatorClient];
        }
      } catch (error) {
        console.error("Error fetching membership:", error);
      }
    });

    locationFilter.forEach(async (member) => {
      const { condition } = member;
      try {
        const locationClient = clientData.filter(
          (client) =>
            client.Address &&
            client.Address.toLowerCase().includes(condition.toLowerCase())
        );
        if (locationData && locationData.length) {
          locationData = [...locationData, ...locationClient];
        } else {
          locationData = [...locationClient];
        }
      } catch (error) {
        console.error("Error fetching membership:", error);
      }
    });

    let commonData = [];
    if (
      membershipData &&
      membershipData.length &&
      elevatorData &&
      elevatorData.length &&
      locationData &&
      locationData.length
    ) {
      commonData = membershipData.filter(
        (membership) =>
          elevatorData.some((elevator) => elevator._id === membership._id) &&
          locationData.some((location) => location._id === membership._id)
      );
    } else if (
      ((membershipData && membershipData.length) ||
        membershipFilter.length !== 0) &&
      ((elevatorData && elevatorData.length) || elevatorTypeFilter.length !== 0)
    ) {
      commonData = membershipData.filter((membership) =>
        elevatorData.some((elevator) => elevator._id === membership._id)
      );
    } else if (
      ((elevatorData && elevatorData.length) ||
        elevatorTypeFilter.length !== 0) &&
      ((locationData && locationData.length) || locationFilter.length !== 0)
    ) {
      commonData = elevatorData.filter((elevator) =>
        locationData.some((location) => location._id === elevator._id)
      );
    } else if (
      ((membershipData && membershipData.length) ||
        membershipFilter.length !== 0) &&
      ((locationData && locationData.length) || locationFilter.length !== 0)
    ) {
      commonData = membershipData.filter((membership) =>
        locationData.some((location) => location._id === membership._id)
      );
    } else {
      commonData =
        membershipData && membershipData.length > 0
          ? membershipData
          : elevatorData && elevatorData.length > 0
          ? elevatorData
          : locationData && locationData.length
          ? locationData
          : [];
    }
    let sortType, sortcondition;
    if (sortFilter && sortFilter.length) {
      sortType = sortFilter[0].type;
      sortcondition = sortFilter[0].condition;
    }
    switch (sortType) {
      case "date":
        if (
          membershipFilter.length ||
          elevatorTypeFilter.length ||
          locationFilter.filter
        ) {
          if (sortcondition === "newest") {
            commonData.sort(
              (a, b) => new Date(b.DateOfHandover) - new Date(a.DateOfHandover)
            );
          } else if (sortcondition === "oldest") {
            commonData.sort(
              (a, b) => new Date(a.DateOfHandover) - new Date(b.DateOfHandover)
            );
          } else {
            return res.status(400).json({
              success: false,
              message: "Invalid date condition",
            });
          }
        } else {
          if (sortcondition === "newest") {
            clientData.sort(
              (a, b) => new Date(b.DateOfHandover) - new Date(a.DateOfHandover)
            );
            commonData = clientData;
          } else if (sortcondition === "oldest") {
            clientData.sort(
              (a, b) => new Date(a.DateOfHandover) - new Date(b.DateOfHandover)
            );
            commonData = clientData;
          } else {
            return res.status(400).json({
              success: false,
              message: "Invalid date condition",
            });
          }
        }
        break;
      case "name":
        if (
          membershipFilter.length ||
          elevatorTypeFilter.length ||
          locationFilter.filter
        ) {
          if (sortcondition === "a-z") {
            commonData.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sortcondition === "z-a") {
            commonData.sort((a, b) => b.name.localeCompare(a.name));
          } else {
            return res.status(400).json({
              success: false,
              message: "Invalid name condition",
            });
          }
        } else {
          if (sortcondition === "a-z") {
            clientData.sort((a, b) => a.name.localeCompare(b.name));
            commonData = clientData;
          } else if (sortcondition === "z-a") {
            clientData.sort((a, b) => b.name.localeCompare(a.name));
            commonData = clientData;
          } else {
            return res.status(400).json({
              success: false,
              message: "Invalid name condition",
            });
          }
        }
        break;
    }
    res.status(200).json({
      success: true,
      data: commonData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server Error",
      message: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.searchClients = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    // Create a regular expression to match the search term case-insensitively
    const regex = new RegExp(searchTerm, "i");
    // Use $or operator to search across multiple fields
    const clients = await clientDetailSchema.find({
      $or: [
        {
          JobOrderNumber: {
            $regex: regex,
          },
        },
        {
          name: {
            $regex: regex,
          },
        },
        {
          PhoneNumber: {
            $regex: regex,
          },
        },
        {
          Address: {
            $regex: regex,
          },
        },
      ],
    });
    res.status(200).json({
      success: true,
      clients,
    });
  } catch (error) {
    console.error("Error searching clients:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//--------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------
// {armaan-dev}
// -----------------------------------------------------------------------

// {armaan-dev}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Function to get membership data
module.exports.getMembershipDetails = async (req, res) => {
  try {
    const memberShipDetails = await AssignMemeberships.find();
    const dataTypes = ["warrenty", "platinum", "silver", "gold"];
    const responseData = await Promise.all(
      dataTypes.map(async (type) => {
        const filteredData = filterMembershipByType(memberShipDetails, type);
        const data = await calculateData(filteredData);
        return {
          dataType: type,
          details: data,
        };
      })
    );
    // Send responseData or do whatever you need with it
    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const calculateData = async (data) => {
  let totalRevenue = 0;
  let count = 0;
  const expiredCount = await calculateExpired(data);
  const expiringCount = await calculateExpiring(data);
  for (const d of data) {
    totalRevenue += parseFloat(d.PricePaid);
    // Check if membership is active based on start and end dates, and other conditions
    if (
      d.EndDate > Date.now() &&
      d.StartDate <= Date.now() &&
      !d.isDisable &&
      !d.isRenewed
    ) {
      count++;
    }
  }
  return {
    totalRevenue,
    count,
    expiredCount: expiredCount.length,
    expiringCount: expiringCount.length,
  };
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
// Get client Details
module.exports.getClientDetail = async (req, res) => {
  try {
    const { JON } = req.params;
    const client = await clientDetailSchema.findOne({
      JobOrderNumber: JON,
    });
    if (!client) {
      return res.status(404).json({
        message: "No Client found for the Job OrderNumber",
      });
    }
    res.status(200).json({
      message: "Client found",
      client: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
// {armaan-dev}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// {armaan-dev}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// function to handle create client memenership  {Pankaj -Preet}
module.exports.createClientMemebership = async (req, res) => {
  try {
    const {
      JobOrderNumber,
      MembershipType,
      StartDate,
      Duration,
      Discount,
      PricePaid,
      isRenewed,
      isExpired,
      isDisable,
    } = req.body;

    const startDate = new Date(StartDate);
    const durationInMonths = Number(Duration);
    const EndDate = new Date(
      startDate.setMonth(startDate.getMonth() + durationInMonths)
    );
    const clientData = await clientDetailSchema.findOne({ JobOrderNumber });

    if (!clientData) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    // Update client membership type
    clientData.MembershipType = MembershipType;
    await clientData.save();

    const MemberShipDetails = await AssignMemeberships.create({
      JobOrderNumber,
      MembershipType,
      StartDate: new Date(StartDate),
      EndDate,
      Duration,
      Discount,
      PricePaid,
      isRenewed,
      isExpired,
      isDisable,
    });

    res.status(201).json({
      message: "memebership created successfully",
      MemberShipDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "intenal server error",
    });
  }
};

//================================================================================----------------------------------
//================================================================================----------------------------------
module.exports.createMemberShipOnTable = async (req, res) => {
  try {
    const {
      JobOrderNumber,
      MembershipType,
      StartDate,
      Duration,
      Discount,
      PricePaidisRenewed,
      isExpired,
      isDisable,
      PaymentDetails,
    } = req.body;

    const startDate = new Date(StartDate);
    const durationInMonths = Number(Duration);
    const EndDate = new Date(
      startDate.setMonth(startDate.getMonth() + durationInMonths)
    );
    const clientData = await clientDetailSchema.findOne({ JobOrderNumber });

    if (!clientData) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    const MemberShipDetails = await AssignMemeberships.create({
      JobOrderNumber,
      MembershipType,
      StartDate: new Date(StartDate),
      EndDate,
      Duration,
      Discount,
      PricePaid,
      isRenewed,
      isExpired,
      isDisable,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while Creating MemberShip",
    });
  }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.GetMembershipPrice = async (req, res) => {
  try {
  } catch (error) {}
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// controller to handle membership details (for example in client app shows what services and what price is in (all the data is hande by this api))

module.exports.postMembershipData = async (req, res) => {
  try {
    const { MembershipPrice, MembershipName, ServiceOffer } = req.body;

    const details = await MembershipTable.create({
      MembershipPrice,
      MembershipName,
      ServiceOffer,
    });

    res.status(201).json({
      details,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while Registering membership data",
    });
  }
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//controller to handle give Membership discount
module.exports.offerMemberShipDiscount = async (req, res) => {
  try {
    const { Discount, JobOrderNumber } = req.body;

    const AddDiscount = await clientDetailSchema.findOne({ JobOrderNumber });

    if (!AddDiscount) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    AddDiscount.MembershipDiscount = Discount;
    await AddDiscount.save();

    res.status(201).json({
      message: "Membership Discount added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while adding Membership Discount",
    });
  }
};

//================================================================================----------------------------------
//================================================================================----------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------
// {armaan-dev}
// ---------------------------------------------------------------------
// {armaan-dev}
//--------------------------------------------------------------------------------------------------------------------------------------------------
module.exports.getClientMembership = async (req, res) => {
  try {
    const { dataType, wanted, page, pageSize } = req.query;
    const membershipData = await AssignMemeberships.find();
    const filteredData = filterMembershipByType(membershipData, dataType);
    const skip = (page - 1) * pageSize;
    let clientData, totalExpiredPages, totalExpiringPages;
    switch (wanted) {
      case "expired":
        const expiredData = await calculateExpired(filteredData);
        totalExpiredPages = Math.ceil(expiredData.length / pageSize);
        const sortedExpiredData = expiredData.sort(
          (a, b) => b.EndDate - a.EndDate
        );
        clientData = sortedExpiredData.slice(skip, skip + pageSize);
        break;
      case "expiring":
        const expiringData = await calculateExpiring(filteredData);
        totalExpiringPages = Math.ceil(expiringData.length / pageSize);
        const sortedExpiringData = expiringData.sort(
          (a, b) => b.EndDate - a.EndDate
        );
        clientData = sortedExpiringData.slice(skip, skip + pageSize);
        break;
      default:
        return res.status(404).json({
          success: false,
          message: "Incorrect params",
        });
    }
    const clientDetails = await sentClientData(clientData);
    return res.status(201).json({
      [dataType]: {
        totalPages:
          wanted === "expired" ? totalExpiredPages : totalExpiringPages,
        clientData: clientDetails,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const sentClientData = async (data) => {
  const clientDetailPromises = data.map(async (item) => {
    const clientData = await clientDetailSchema.findOne({
      JobOrderNumber: item.JobOrderNumber,
    });
    return {
      JobOrderNumber: clientData.JobOrderNumber,
      name: clientData.name,
      address: clientData.Address,
      number: clientData.PhoneNumber,
    };
  });
  return Promise.all(clientDetailPromises);
};
const calculateExpiring = async (filteredData) => {
  const expiringData = await Promise.all(
    filteredData.map(async (data) => {
      const timeDifference = data.EndDate - Date.now();
      const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if (daysLeft > 0 && daysLeft <= 30) {
        return data;
      }
    })
  );
  return expiringData.filter(Boolean);
};
const calculateExpired = (filteredData) => {
  const expiredData = filteredData.filter((data) => data.EndDate < Date.now());
  // console.log(expiredData);
  return expiredData;
};
const filterMembershipByType = (data, type) => {
  return data.filter((member) => member.MembershipType === type);
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.createLocationForFilter = async (req, res) => {
  try {
    const { location } = req.body;
    const findLocation = await LocationSchema.find({ location });
    if (findLocation) {
      return res
        .status(400)
        .json({ success: false, message: "Location already exists" });
    }

    const locationCreated = await LocationSchema.create({ location });

    res.status(201).json({ success: true, locationCreated });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports.getFilteringLocations = async (req, res) => {
  try {
    const locations = await LocationSchema.find();

    res.status(201).json({ success: true, locations });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports.getEngineerNames = async (req, res) => {
  try {
    const engineerDetails = await ServiceEnggData.find();
    let engineerNames = [];

    engineerDetails.forEach((engineer) => {
      engineerNames.push(engineer.EnggName);
    });

    res.status(200).json({ success: true, engineerNames });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// {armaan-dev}
//-------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------

module.exports.createSpearParts = async (req, res) => {
  try {
    const { SpearPart, subcategoryName } = req.body;
    if (SpearPart && subcategoryName) {
      const response = await SpearParts.create({
        SpearPart: SpearPart,
        subcategoryName: subcategoryName,
      });
      return res.status(200).json({ response });
    }
    return res
      .status(500)
      .json({ error: "Please fill all fields in createSpearParts" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error in createSpearParts",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//by Preet-----

//function to handle send Password reset otp on Email.

module.exports.sendPasswordResetOTPOnEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const emailVerify = await serviceAdmin.findOne({ email });

    let otp = await ForgetPassOTP.findOne({ email });

    if (!emailVerify) {
      return res
        .status(401)
        .json({ message: "Enter Email is not Associated With Any Account" });
    }

    // Generate OTP
    const otpValue = Math.floor(1000 + Math.random() * 9000);

    if (otp) {
      otp.otp = otpValue.toString();
    } else {
      otp = new ForgetPassOTP({
        email: email,
        otp: otpValue.toString(),
      });
    }

    await otp.save();

    //nodemailer logic ---------- starts ----------
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "psqrco@gmail.com",
        pass: "tczb rxil pioe nrgd",
      },
    });

    const message = `
    <h1>Password Reset OTP</h1>
    <p>Your OTP for password reset is: <strong>${otpValue}</strong></p>
    <p>Please use this OTP to reset your password.</p>
    <p>OTP valid for 5 minutes.</p>
  `;

    const info = await transporter.sendMail({
      from: '"IEE LIFTS" <psqrco@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Password Reset OTP", // Subject line
      text: "Hello world?", // plain text body
      html: message, // html body
    });
    res.status(200).json({ message: "Email sent successfully", email });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error while sending the email",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle send Password reset otp on Phone Number.
// module.exports.sendPasswordResetOTPOnPhoneNumber = (req,res) =>{
//   try {

//   } catch (error) {

//   }
// }

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle validate Forget Password OTP

module.exports.ValidateOTPForgetPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const verifyOTP = await ForgetPassOTP.find({ email });
    if (!verifyOTP) {
      return res
        .status(404)
        .json({ message: "no OPT is found in databse for this Email id" });
    }

    if (otp === verifyOTP[0].otp) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Internal server error while validatin the OTP",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle update password

module.exports.updatePassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    const updatedUser = await serviceAdmin.findOneAndUpdate(
      { email: email },
      { Password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success:'true', message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error while updating the password" });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// {/armaan-dev}

// get engineer leaves History
module.exports.getEngineerLeaveHistory = async (req, res) => {
  try {
    const { ServiceEnggId } = req.query;
    const leaves = await EnggLeaveServiceRecord.find({
      ServiceEnggId,
    });

    const sentLeaves = leaves.filter((leave) => leave.IsApproved !== "false");
    res.status(200).json({
      success: true,
      sentLeaves,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// get engineer leaves requests
module.exports.getEngineerRequestedLeave = async (req, res) => {
  try {
    const { ServiceEnggId } = req.query;
    const leaves = await EnggLeaveServiceRecord.find({
      ServiceEnggId,
    });

    const sentLeaves = leaves.filter((leave) => leave.IsApproved === "false");
    res.status(200).json({
      success: true,
      leaves: sentLeaves,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// take action on leave (approve or reject)
module.exports.takeActionOnLeave = async (req, res) => {
  try {
    const { IsApproved, _id } = req.query;
    const leaves = await EnggLeaveServiceRecord.find();
    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ error: "Leave not found" });
    }
    const last = leaves.find((leave) => leave._id == _id);
    if (!last) {
      return res.status(404).json({ error: "Leave not found" });
    }

    // const approvedLeaves = leaves
    //   .filter(leave => leave.IsApproved === "Approved" && leave.ServiceEnggId === last.ServiceEnggId)
    //   .sort((leaveA, leaveB) => {
    //     const dateA = new Date(leaveA.Date);
    //     const dateB = new Date(leaveB.Date);
    //     return dateA - dateB;
    //   });

    const approvedLeaves = leaves
      .filter(
        (leave) =>
          leave.IsApproved === "Approved" &&
          leave.ServiceEnggId === last.ServiceEnggId
      )
      .sort((leaveA, leaveB) => {
        const [monthA, dateA, yearA] = new Date(leaveA.Date)
          .toLocaleDateString("en-US")
          .split("/");
        const [monthB, dateB, yearB] = new Date(leaveB.Date)
          .toLocaleDateString("en-US")
          .split("/");
        const dateStrA = `${monthA}/${dateA}/${yearA}`;
        const dateStrB = `${monthB}/${dateB}/${yearB}`;
        return new Date(dateStrA) - new Date(dateStrB);
      });

    if (IsApproved === "Approved") {
      last.IsApproved = "Approved";
      const [fromDay, fromMonth, fromYear] = last.Duration.From.split("/");
      const [toDay, toMonth, toYear] = last.Duration.To.split("/");

      const fromDate = new Date(fromYear, fromMonth - 1, fromDay);
      const toDate = new Date(toYear, toMonth - 1, toDay);
      const diffTime = Math.abs(toDate - fromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (approvedLeaves.length > 0) {
        last.UsedLeave =
          approvedLeaves[approvedLeaves.length - 1].UsedLeave + diffDays + 1;
      } else {
        last.UsedLeave = diffDays + 1;
      }
    } else {
      last.IsApproved = "Rejected";
      if (approvedLeaves.length > 0) {
        last.UsedLeave = approvedLeaves[approvedLeaves.length - 1].UsedLeave;
      }
    }
    // console.log(last);
    await last.save();
    res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// {/armaan-dev}

// amit api // 29/03/2024

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//controller to handdle get task histroy of service engg
module.exports.assignedEnggDetails = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;
    // console.log(ServiceEnggId)
    if (ServiceEnggId) {
      const assignCallbacks = await ServiceAssigntoEngg.find({
        ServiceEnggId: ServiceEnggId,
        ServiceProcess: "completed",
      });
      const assignServiceRequests = await AssignSecheduleRequest.find({
        ServiceEnggId: ServiceEnggId,
        ServiceProcess: "completed",
      });
      const assignCallbacksWithClientName = await Promise.all(
        assignCallbacks.map(async (assignment) => {
          const client = await clientDetailSchema.findOne({
            JobOrderNumber: assignment.JobOrderNumber,
          });
          return {
            ...assignment._doc,
            ClientName: client?.name,
            ClientAddress: client?.Address,
          };
        })
      );
      const assignServiceRequestsWithClientName = await Promise.all(
        assignServiceRequests.map(async (assignment) => {
          const client = await clientDetailSchema.findOne({
            JobOrderNumber: assignment.JobOrderNumber,
          });
          return {
            ...assignment._doc,
            ClientName: client?.name,
            ClientAddress: client?.Address,
          };
        })
      );
      const assignCallbacksDetails = assignCallbacksWithClientName.map(
        (data) => ({
          date: data.Date,
          ServiceId: data.callbackId,
          ServiceEnggId: data.ServiceEnggId,
          JobOrderNumber: data.JobOrderNumber,
          Slot: data.Slot,
          name: data?.ClientName,
          address: data?.ClientAddress,
        })
      );
      const assignServiceRequestsDetails =
        assignServiceRequestsWithClientName.map((data) => ({
          date: data.Date,
          ServiceId: data.RequestId,
          ServiceEnggId: data.ServiceEnggId,
          JobOrderNumber: data.JobOrderNumber,
          Slot: data.Slot,
          name: data?.ClientName,
          address: data?.ClientAddress,
        }));
      const assignCallbacksWithRating = await Promise.all(
        assignCallbacksDetails.map(async (assignment) => {
          const Rating = await EnggRating.find({
            ServiceEnggId: assignment.ServiceId,
          });
          // console.log("rating", Rating);
          return {
            ...assignment,
            rating: Rating.Rating,
          };
        })
      );
      const assignServiceRequestsWithRating = await Promise.all(
        assignServiceRequestsDetails.map(async (assignment) => {
          const Rating = await EnggRating.find({
            ServiceEnggId: assignment.ServiceId,
          });
          return {
            ...assignment,
            rating: Rating.Rating,
          };
        })
      );
      return res.status(200).json({
        assignServiceRequests: assignServiceRequestsWithRating,
        assignCallbacks: assignCallbacksWithRating,
      });
    }
    return res.status(400).json({ message: "ServiceEnggId not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error in assignedEnggDetails" });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle fetchSpare Part Request By the Engg
//by preet 02/04/2024

module.exports.getSparePartRequestByEngg = async (req, res) => {
  try {
    const { EnggId } = req.params;
    const spareParts = await SparePartTable.find({ EnggId });

    const filteredSpareParts = spareParts.filter(
      (sparePart) =>
        sparePart.isApproved === false && sparePart.isDenied === false
    );

    return res.status(200).json({ filteredSpareParts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while Fetching The Spare Part Details",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 03/04/2024 - preet

//function to handle Deny, Approve spare part Request.

module.exports.ApproveDenySparePartRequest = async (req, res) => {
  try {
    const { RequestId, isApproved, isDenied } = req.body;

    const sparePartData = await SparePartTable.findOneAndUpdate(
      { _id: RequestId },
      { isApproved: isApproved, isDenied: isDenied },
      { new: true }
    );

    if (!sparePartData) {
      return res
        .status(400)
        .json({ message: "No SparePart Request fing this Id" });
    }

    res.status(200).json({
      message: "SparePart Request Updated Successfully",
      sparePartData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while handling Approved and Deny Request",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 03/04/2024 - preet
// function to handle fetch alloted spare part in Admin Pannel

module.exports.fetchAllotedSparePart = async (req, res) => {
  try {
    const { EnggId } = req.params;

    const allotedSparePart = await SparePartTable.find({ EnggId });

    if (allotedSparePart.length < 0) {
      return res
        .status(400)
        .json({ message: "No sparePart Data is found to this EggId" });
    }

    const FilterAllotedSparePart = allotedSparePart.filter(
      (data) => data.isApproved === true && data.isDenied === false
    );

    res.status(200).json({ FilterAllotedSparePart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while fetching Alloted Spare Part",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 03/04/2024 - preet
// function to handle fetch denied sparePart

module.exports.fetchDeniedSparePart = async (req, res) => {
  try {
    const { EnggId } = req.params;

    const deniedSparePart = await SparePartTable.find({ EnggId });

    if (deniedSparePart.length < 0) {
      return res
        .status(400)
        .json({ message: "No Denied sparePart Data is found to this EggId" });
    }

    const FilterDeniedSparePartRequest = deniedSparePart.filter(
      (data) => data.isApproved === false && data.isDenied === true
    );

    res.status(200).json({ FilterDeniedSparePartRequest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while fetching Alloted Spare Part",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 10/04/2024 - preet
// function to fetch Report For Admin (Complex API I think)   ( toDo - Integration in admin pannel)

module.exports.fetchReportForAdmin = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const ReportData = await ReportTable.findOne({ serviceId });
    const Rating = await EnggRating.findOne({ ServiceId: serviceId });

    const MCRoom = {
      IssuesResolved: [],
      IssuesNotResolved: [],
      SparePartsChanged: [],
      SparePartsRequested: [],
    };
    const CabinFloors = {
      IssuesResolved: [],
      IssuesNotResolved: [],
      SparePartsChanged: [],
      SparePartsRequested: [],
    };
    const CartopShaft = {
      IssuesResolved: [],
      IssuesNotResolved: [],
      SparePartsChanged: [],
      SparePartsRequested: [],
    };
    const PitArea = {
      IssuesResolved: [],
      IssuesNotResolved: [],
      SparePartsChanged: [],
      SparePartsRequested: [],
    };

    // console.log("22222222222222",ReportData.paymentMode);
    // console.log("22222222222222",ReportData.paymentDetils);

    const ReportImages = ReportData.subCategoriesphotos;
    const sortedData = (keys, arr) => {
      const arrData = arr.filter(
        (question) =>
          (question.questionResponse.isResolved &&
            question.questionResponse.sparePartDetail.sparePartsType !== "" &&
            question.questionResponse.sparePartDetail.subsparePartspartid !==
              "") ||
          (question.questionResponse.isResolved &&
            question.questionResponse.SparePartDescription !== "") ||
          !question.questionResponse.isResolved
      );
      arrData.forEach((item) => {
        if (item.questionResponse.isResolved) {
          keys.IssuesResolved.push(item);
        } else {
          keys.IssuesNotResolved.push(item);
        }
        if (
          !item.questionResponse.isSparePartRequest &&
          item.questionResponse.sparePartDetail.sparePartsType !== "" &&
          item.questionResponse.sparePartDetail.subsparePartspartid !== "" &&
          item.questionResponse.isResolved
        ) {
          keys.SparePartsChanged.push(item);
        }
        if (
          item.questionResponse.isSparePartRequest &&
          item.questionResponse.sparePartDetail.sparePartsType !== "" &&
          item.questionResponse.sparePartDetail.subsparePartspartid !== "" &&
          !item.questionResponse.isResolved
        ) {
          keys.SparePartsRequested.push(item);
        }
      });
    };
    const transformedData = ReportData.questionsDetails.reduce((acc, item) => {
      if (!acc[item.subcategoryname]) {
        acc[item.subcategoryname] = [];
      }
      acc[item.subcategoryname].push(item);
      return acc;
    }, {});
    Object.keys(transformedData).forEach((key) => {
      if (key === "M/C Room") {
        sortedData(MCRoom, transformedData[key]);
      } else if (key === "Cabin, Floors") {
        sortedData(CabinFloors, transformedData[key]);
      } else if (key === "Cartop ,Shaft") {
        sortedData(CartopShaft, transformedData[key]);
      } else if (key === "Pit Area") {
        sortedData(PitArea, transformedData[key]);
      }
    });
    const finalReportedData = {
      MCRoom,
      CabinFloors,
      CartopShaft,
      PitArea,
      PaymentMode: ReportData?.paymentMode,
      PaymentDetails: ReportData?.paymentDetils,
    };

    res.status(200).json({ finalReportedData, ReportImages, Rating });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while fetching Report For Admin",
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * <-----------------------------Author: Rahul Kumar---------------------01/05/2024---------->
 */

//post client form controller
module.exports.postElevatorForm = async (req, res) => {
  const { clientFormDetails, clientSalesManDetails, clientArchitect } =
    req.body;

  try {
    const { jon } = JSON.parse(clientFormDetails);
    const existingForm = await ElevatorFormSchema.findOne({
      "clientFormDetails.jon": jon,
    });

    const membershipDocument = {
      signedQuotation:
        req?.files?.signedQuotation && req.files.signedQuotation.length > 0
          ? req.files.signedQuotation[0].filename
          : existingForm.clientMembershipDocument.signedQuotation,
      paymentForm:
        req?.files?.paymentForm && req.files.paymentForm.length > 0
          ? req.files.paymentForm[0].filename
          : existingForm.clientMembershipDocument.paymentForm,
      chequeForm:
        req?.files?.chequeForm && req.files.chequeForm.length > 0
          ? req.files.chequeForm[0].filename
          : existingForm.clientMembershipDocument.chequeForm,
      salesOrder:
        req?.files?.salesOrder && req.files.salesOrder.length > 0
          ? req.files.salesOrder[0].filename
          : existingForm.clientMembershipDocument.salesOrder,
    };

    if (existingForm) {
      existingForm.clientFormDetails = JSON.parse(req.body.clientFormDetails);
      existingForm.clientSalesManDetails = JSON.parse(
        req.body.clientSalesManDetails
      );
      existingForm.clientArchitect = JSON.parse(req.body.clientArchitect);
      existingForm.clientMembershipDocument = membershipDocument;
      await existingForm.save();
      return res.status(200).json({ error: "data updated successfully" });
    }
    const elevatorFormSchema = new ElevatorFormSchema({
      membership: "warrenty",
      clientFormDetails: JSON.parse(req.body.clientFormDetails),
      clientSalesManDetails: JSON.parse(req.body.clientSalesManDetails),
      clientArchitect: JSON.parse(req.body.clientArchitect),
      clientMembershipDocument: membershipDocument,
    });

    await elevatorFormSchema.save();

    res.status(200).json({ msg: "data submit successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

//put request

module.exports.putElevatorForm = async (req, res) => {
  try {
    const newData = req.body;
    const JON = req.body.JON;
    delete newData.JON;
    console.log(newData.stops);
    const updatedData = await ElevatorFormSchema.findOneAndUpdate(
      { "clientFormDetails.jon": JON },
      { elevatorDetails: newData },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports.getNotification = async (req, res) => {
  try {
    const now = new Date()
      .toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
      .split(",")[0];
    const response = await Notification.find({ Date: now });
    // console.log("response", response);
    if (response) {
      return res.status(200).json({ status: "success", response: response });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error while fetching Notification",
    });
  }
};

// by aayush for rating admin=================================

//-----------------------------------------------------------------------
// by armaan regarding 3rd step in client submision form

// module.exports.updatElevatorDimensions = async (req, res) => {
//   try {
//     const files = req.files;
//     const { JON } = req.body;
//     const first = req.body.data[0];
//     const second = req.body.data[1];

//     const data = await ElevatorFormSchema.findOne({ 'clientFormDetails.jon': JON });
//     if (!data) {
//       return res.status(404).json({ error: 'Data not found' });
//     }
//     let Data = data;
//     // Data.dimensions.pitPoint.levelName = first.pitPoint.levelName;
//     // console.log((first.topPoint.levelName === Data.dimensions.topPoint.levelName && second === undefined) || Data.dimensions.topPoint.levelName === undefined);
//     if (((Data.dimensions.pitPoint.levelName) === undefined) && first.pitPoint) {
//       console.log(1);
//       Data.dimensions.pitPoint = first.pitPoint;
//       Data.dimensions.pitPoint.sitePhotos.pitImage = files[0].originalname;
//       Data.dimensions.pitPoint.sitePhotos.bottomToTopImages = files[1].originalname;
//       Data.dimensions.pitPoint.sitePhotos.basementFrontImages = files[2].originalname;

//       Data.dimensions.floors[0] = second.floors[0];
//       Data.dimensions.floors[0].sitePhotos = files[3].originalname;
//     }
//     else if (first.pitPoint && (first.pitPoint.levelName === Data.dimensions.pitPoint.levelName)) {
//       console.log(2);
//       Data.dimensions.pitPoint = first.pitPoint;
//       Data.dimensions.pitPoint.sitePhotos.pitImage = files[0].originalname;
//       Data.dimensions.pitPoint.sitePhotos.bottomToTopImages = files[1].originalname;
//       Data.dimensions.pitPoint.sitePhotos.basementFrontImages = files[2].originalname;

//       Data.dimensions.floors[0] = second.floors[0];
//       Data.dimensions.floors[0].sitePhotos = files[3].originalname;
//     }
//     else if (first.topPoint && (first.topPoint.levelName === Data.dimensions.topPoint.levelName && second === undefined) || Data.dimensions.topPoint.levelName === undefined) {
//       console.log(3);
//       Data.dimensions.topPoint = first.topPoint;
//       console.log(Data);
//       Data.dimensions.topPoint.sitePhotos.floorFront = files[0].originalname;
//       Data.dimensions.topPoint.sitePhotos.bottomToTopImages = files[1].originalname;
//       Data.dimensions.topPoint.sitePhotos.overheadImages = files[2].originalname;
//     }
//     else if (second.topPoint && (second.topPoint.levelName === Data.dimensions.topPoint.levelName)) {
//       console.log(4);
//       Data.topPoint = second.topPoint;
//       Data.topPoint.sitePhotos.floorFront = files[1].originalname;
//       Data.topPoint.sitePhotos.bottomToTopImages = files[2].originalname;
//       Data.topPoint.sitePhotos.overheadImages = files[3].originalname;

//       if (Data.floors.find(floor => floor.levelName === first.levelName)){

//       }
//       Data.floors[Data.floors.length() - 1] = second;
//       Data.floors[Data.floors.length() - 1].sitePhotos = files[0].originalname;
//     }
//     // else {
//     //   Data.floors.find(floor => floor.levelName === first.levelName) = first;
//     //   Data.floors.find(floor => floor.levelName === first.levelName).sitePhotos = files[0].originalname;
//     //   Data.floors.find(second => floor.levelName === second.levelName) = second;
//     //   Data.floors.find(second => floor.levelName === second.levelName).sitePhotos = files[1].originalname;
//     // }

//     Data.save();

//     res.status(200).json({ success: true, Data });

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       error: "Internal server error",
//       message: err.message
//     })
//   }
// }

function updateFormData(formData, fieldName, url) {
  const parts = fieldName.replace(/\]/g, "").split("[");
  parts.shift();
  function update(obj, parts, url) {
    const part = parts.shift();
    if (parts.length === 0) {
      if (Array.isArray(obj[part])) {
        obj[part] = url;
      } else if (obj[part]) {
        if (Array.isArray(obj[part])) {
          obj[part] = url;
        } else {
          obj[part] = url;
        }
      } else {
        obj[part] = url;
      }
    } else {
      if (!obj[part]) {
        obj[part] = isNaN(parts[0]) ? {} : [];
      }
      if (!isNaN(parts[0])) {
        console.log(parts[0]);
        parts[0] = parts[0] - 1;
      }
      update(obj[part], parts, url);
    }
  }

  update(formData, parts, url);
}

module.exports.updatElevatorDimensions = async (req, res) => {
  try {
    const files = req.files;
    const { JON } = req.body;

    const getData = req.body.data;
    const Data = await ElevatorFormSchema.findOne({
      "clientFormDetails.jon": JON,
    });

    const topPoint = getData.topPoint;
    const pitPoint = getData.pitPoint;
    const floors = getData.floors;

    floors.shift();
    floors.pop();

    Data.dimensions.topPoint = topPoint;
    Data.dimensions.pitPoint = pitPoint;
    Data.dimensions.floors = floors;

    // Data.dimensions.pitPoint.sitePhotos.pitImage = files[0].filename;
    // Data.dimensions.pitPoint.sitePhotos.bottomToTopImages = files[1].filename;
    // Data.dimensions.pitPoint.sitePhotos.basementFrontImages = files[2].filename;

    // Data.dimensions.topPoint.sitePhotos.floorFront =
    //   files[files.length - 3].filename;
    // Data.dimensions.topPoint.sitePhotos.bottomToTopImages =
    //   files[files.length - 2].filename;
    // Data.dimensions.topPoint.sitePhotos.overheadImages =
    //   files[files.length - 1].filename;

    let i = 0;
    let data = Data.dimensions;
    console.log(files);
    files.forEach((file, index) => {
      updateFormData(data, file.fieldname, file.filename);
    });

    Data.dimensions = data;
    Data.save();

    res.status(200).json({ success: true, Data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// By Raj for get client modal information -------------↓↓

module.exports.getClientModalInformation = async (req, res) => {
  try {
    const { jon } = req.params;
    const response = await ElevatorFormSchema.findOne({
      "clientFormDetails.jon": jon,
    });
    if (!response) {
      return res.json({ success: false, message: "This JON is not found" });
    }

    let dimensions = response.dimensions;

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while fetching data",
    });
  }
};

/**
 * <-----------------------------Author: Rahul Kumar---------------------05/06/2024---------->
 * @Put Api for updating second step for client form
 */

module.exports.updateSecondStep = async (req, res) => {
  try {
    const files = req.files;
    const newData = req.body;
    const JON = req.body.JON;
    delete newData.JON;
    const { elevatorDetails, dimensions } = newData;

    const updatedData = await ElevatorFormSchema.findOneAndUpdate(
      { "clientFormDetails.jon": JON }
      // { elevatorDetails: elevatorDetails,
      //   dimensions : dimensions
      //  },
      // { new: true }
    );
    updatedData.elevatorDetails = elevatorDetails;
    updatedData.dimensions = dimensions;
    const topPoint = dimensions.floorFrontData;
    const pitpoint = dimensions.basementWithPit;
    const floors = dimensions.levelData;
    floors.shift();
    floors.pop();

    updatedData.dimensions.topPoint = topPoint;
    updatedData.dimensions.pitPoint = pitpoint;
    updatedData.dimensions.floors = floors;

    updatedData.dimensions.pitPoint.sitePhotos.pitImage = files[0].filename;
    updatedData.dimensions.pitPoint.sitePhotos.bottomToTopImages =
      files[1].filename;
    updatedData.dimensions.pitPoint.sitePhotos.basementFrontImages =
      files[2].filename;

    updatedData.dimensions.topPoint.sitePhotos.floorFront =
      files[files.length - 3].filename;
    updatedData.dimensions.topPoint.sitePhotos.bottomToTopImages =
      files[files.length - 2].filename;
    updatedData.dimensions.topPoint.sitePhotos.overheadImages =
      files[files.length - 1].filename;

    let i = 0;

    files.forEach((file, index) => {
      if (
        index !== 0 &&
        index !== 1 &&
        index !== 2 &&
        index !== files.length - 1 &&
        index !== files.length - 2 &&
        index !== files.length - 3
      ) {
        Data.dimensions.floors[i].sitePhotos = file.filename;
        i++;
      }
    });
    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    await updatedData.save();
    res.status(200).json({ success: true, data: updatedData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};
//--------------------------------------------------------------------------------------------

module.exports.editEnggDetailsForm = async (req, res) => {
  try {
    const { EnggId } = req.params;

    const formData = req.files;
    const bodyData = req.body;

    const EnggDataChecker = await ServiceEnggBasicSchema.findOne({ EnggId });

    const EnggData = await ServiceEnggBasicSchema.findOneAndUpdate(
      {
        EnggId,
      },
      {
        EnggName: bodyData.firstName,
        EnggId: bodyData.EngggId,
        AlternativeNumber: bodyData.AlternativeNumber,
        EnggLastName: bodyData.lastName,
        PhoneNumber: bodyData.mobileNumber,
        EnggAddress: bodyData.address,
        EnggPhoto: formData?.profilePhoto
          ? formData?.profilePhoto[0]?.filename
          : EnggDataChecker.EnggPhoto
          ? EnggDataChecker.EnggPhoto
          : "",
        DateOfBirth: bodyData.dateOfBirth,
        Email: bodyData.email,
        PinCode: bodyData.pinCode,
        City: bodyData.city,
        District: bodyData.district,
        State: bodyData.state,
        AddharCardNo: bodyData.addharCardNumber,
        DrivingLicenseNo: bodyData.drivingLisience,
        PanCardNo: bodyData.pancards,
        Qualification: bodyData.qualification,
        AdditionalCourse: bodyData.additionalCourse,
        AccountHolderName: bodyData.accountHolderName,
        BranchName: bodyData.branchName,
        AccountNumber: bodyData.accountNumber,
        IFSCcode: bodyData.IFSCcode,
        AddharPhoto: formData?.addharPhoto
          ? formData?.addharPhoto[0]?.filename
          : EnggDataChecker.AddharPhoto
          ? EnggDataChecker.AddharPhoto
          : "",
        DrivingLicensePhoto: formData?.drivingLicensePhoto
          ? formData?.drivingLicensePhoto[0]?.filename
          : EnggDataChecker.DrivingLicensePhoto
          ? EnggDataChecker.DrivingLicensePhoto
          : "",
        PancardPhoto: formData?.pancardPhoto
          ? formData?.pancardPhoto[0]?.filename
          : EnggDataChecker.PancardPhoto
          ? EnggDataChecker.PancardPhoto
          : "",
        QualificationPhoto: formData?.qualificationPhoto
          ? formData?.qualificationPhoto[0]?.filename
          : EnggDataChecker.QualificationPhoto
          ? EnggDataChecker.QualificationPhoto
          : "",
        AdditionalCoursePhoto: formData?.additionalCoursePhoto
          ? formData?.additionalCoursePhoto[0]?.filename
          : EnggDataChecker.AdditionalCoursePhoto
          ? EnggDataChecker.AdditionalCoursePhoto
          : "",
        DurationOfJob: bodyData.jobDuration,
        CompanyName: bodyData.companyName,
        JobTitle: bodyData.jobTitle,
        ManagerName: bodyData.managerName,
        ManagerNo: bodyData.managerNumber,
      },
      {
        new: true,
      }
    );

    // console.log("abiiiiiii",EnggData)

    if (!EnggData) {
      return res.status(404).json({ message: "This JON is not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Engg Profile updated Succesfully" });

    // console.log("dooooooooooo", EnggData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while fetching editEnggDetailsForm",
    });
  }
};

// function handle get all engg personal details by Id -----------------------
// by Raj---------------

module.exports.getEnggPersonalData = async (req, res) => {
  try {
    const { EnggId } = req.params;

    const enggDetails = await ServiceEnggBasicSchema.findOne({
      EnggId,
    });

    if (!enggDetails) {
      return res.status(404).json({
        message: "No services Engg found for the specified Service Engineer ID",
      });
    }

    res.status(200).json({
      message: "servicesc Engg retrieved by ID successfully",
      enggDetails,
    });
  } catch (error) {
    console.error("Error getting enng detail", error);
    res.status(500).json({
      error: "Internal server Error",
    });
  }
};

//----------------------------------- getCheckInCheckOut controller ------------------------------------------------------------------------------

module.exports.getCheckInCheckOut = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;

    const { Date } = req.query;

    // if (!ServiceEnggId || !Date) {
    //   return res.status(400).json({ error: 'ServiceEnggId  are required' });
    // }

    const record = await EnggAttendanceServiceRecord.findOne({
      ServiceEnggId,
      Date,
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getClientCallbackByJON = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const clientCallbackHistory = await ServiceAssigntoEngg.find({
      JobOrderNumber,
      ServiceProcess: "completed",
    });

    const callbackHistory = await Promise.all(
      clientCallbackHistory.map(async (item) => {
        const EnggName = await ServiceEnggData.findOne({
          EnggId: item.ServiceEnggId,
        }).select("EnggName");
        const checklistName = await ChecklistModal.findById(
          item.AllotAChecklist
        ).select("checklistName");

        const ReportDetails = await ReportTable.find({
          serviceId: item.callbackId,
        });

        const SparePartsChanged = [];

        const filteredData = ReportDetails[0].questionsDetails.filter(
          (question) =>
            (question.questionResponse.isResolved &&
              question.questionResponse.sparePartDetail.sparePartsType !== "" &&
              question.questionResponse.sparePartDetail.subsparePartspartid !==
                "") ||
            (question.questionResponse.isResolved &&
              question.questionResponse.SparePartDescription !== "") ||
            !question.questionResponse.isResolved
        );

        filteredData &&
          filteredData.forEach((element) => {
            if (
              !element.questionResponse.isSparePartRequest &&
              element.questionResponse.sparePartDetail.sparePartsType !== "" &&
              element.questionResponse.sparePartDetail.subsparePartspartid !==
                "" &&
              element.questionResponse.isResolved
            ) {
              SparePartsChanged.push(
                element.questionResponse.sparePartDetail.subsparePartspartname
              );
            }
          });
        return {
          item,
          EnggName,
          checklistName,
          TotalAmount: ReportDetails[0].TotalAmount || 0,
          SparePartsChanged,
          Payment_Mode: ReportDetails[0].paymentMode,
          PaymentDetail: ReportDetails[0].paymentDetils,
        };
      })
    );

    res.status(200).json({
      callbackHistory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while fetching getClientCallbackByJON",
    });
  }
};

module.exports.getClientServiceHistoryByJON = async (req, res) => {
  try {
    const { JobOrderNumber } = req.params;

    const clientServiceHistory = await AssignSecheduleRequest.find({
      JobOrderNumber,
      ServiceProcess: "completed",
    });

    const serviceHistory = await Promise.all(
      clientServiceHistory.map(async (item) => {
        const EnggName = await ServiceEnggData.findOne({
          EnggId: item.ServiceEnggId,
        }).select("EnggName");
        const checklistName = await ChecklistModal.findById(
          item.AllotAChecklist
        ).select("checklistName");

        const ReportDetails = await ReportTable.find({
          serviceId: item.RequestId,
        });

        const SparePartsChanged = [];

        const filteredData = ReportDetails[0].questionsDetails.filter(
          (question) =>
            (question.questionResponse.isResolved &&
              question.questionResponse.sparePartDetail.sparePartsType !== "" &&
              question.questionResponse.sparePartDetail.subsparePartspartid !==
                "") ||
            (question.questionResponse.isResolved &&
              question.questionResponse.SparePartDescription !== "") ||
            !question.questionResponse.isResolved
        );

        filteredData &&
          filteredData.forEach((element) => {
            if (
              !element.questionResponse.isSparePartRequest &&
              element.questionResponse.sparePartDetail.sparePartsType !== "" &&
              element.questionResponse.sparePartDetail.subsparePartspartid !==
                "" &&
              element.questionResponse.isResolved
            ) {
              SparePartsChanged.push(
                element.questionResponse.sparePartDetail.subsparePartspartname
              );
            }
          });

        return {
          item,
          EnggName,
          checklistName,
          TotalAmount: ReportDetails[0].TotalAmount || 0,
          SparePartsChanged,
          Payment_Mode: ReportDetails[0].paymentMode,
          PaymentDetail: ReportDetails[0].paymentDetils,
        };
      })
    );

    res.status(200).json({
      serviceHistory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        "Internal server error while fetching getClientServiceHistoryByJON",
    });
  }
};

//get Engg Rating By Engg ID

module.exports.getEnggRatingById = async (req, res) => {
  try {
    const { ServiceEnggId } = req.params;

    const ratingData = await EnggRating.find({ ServiceEnggId });

    // console.log("jjjjjjj", ratingData);

    const rating = await Promise.all(
      ratingData.map(async (item) => {
        const assignCallback = await ServiceAssigntoEngg.findOne({
          callbackId: item.ServiceId,
        });
        const assignService = await AssignSecheduleRequest.findOne({
          RequestId: item.ServiceId,
        });
        const clientDetails = await clientDetailSchema.findOne({
          JobOrderNumber: item.JobOrderNumber,
        });

        const slots = assignCallback?.Slot || assignService?.Slot;
        const clientName = clientDetails?.name;
        const clientAddress = clientDetails?.Address;
        const ClientRating = item;

        return {
          clientName,
          clientAddress,
          slots,
          ClientRating,
        };
      })
    );

    // Calculate the average rating
    const totalRatings = ratingData.reduce((sum, item) => sum + item.Rating, 0);
    const averageRating = ratingData.length
      ? (totalRatings / ratingData.length).toFixed(1)
      : 0;

    // console.log("rating",rating)

    res.status(200).json({ rating, averageRating });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while fetching rating",
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

//api to DepositeEnggCash To admin  //todo

module.exports.DepositeEnggCash = async (req, res) => {
  try {
    const { EnggId, AvailableCash } = req.body;

    await ServiceEnggBasicSchema.findOneAndUpdate(
      {
        EnggId,
      },
      { $inc: { AvailableCash: -AvailableCash } }
    );

    res.status(200).json({ message: "Deposite Cash Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while add Deposite Details",
    });
  }
};

//-------------------------------------------------------------------------------------------------------

// Api to handle get Revenue under SparePart Details in EnggSection in frontend

module.exports.getEnggSparePartRevenueData = async (req, res) => {
  try {
    const { EnggId } = req.params;

    const sparePartData = await ReportTable.find({ EnggId, isVerify: true });
    
    if (sparePartData.length === 0) {
      return res.status(200).json({ message: "no Spare part data Present" });
    }
    const SparePartsChanged = [];

    const sparePartRevenueData = await Promise.all(
      sparePartData.map(async (item) => {
        const ClientName = await clientDetailSchema
          .findOne({ JobOrderNumber: item.JobOrderNumber })
          .select("JobOrderNumber name");

        const filteredData = sparePartData[0].questionsDetails.filter(
          (question) =>
            (question.questionResponse.isResolved &&
              question.questionResponse.sparePartDetail.sparePartsType !== "" &&
              question.questionResponse.sparePartDetail.subsparePartspartid !==
                "") ||
            (question.questionResponse.isResolved &&
              question.questionResponse.SparePartDescription !== "") ||
            !question.questionResponse.isResolved
        );

        filteredData &&
          filteredData.forEach((element) => {
            if (
              !element.questionResponse.isSparePartRequest &&
              element.questionResponse.sparePartDetail.sparePartsType !== "" &&
              element.questionResponse.sparePartDetail.subsparePartspartid !==
                "" &&
              element.questionResponse.isResolved
            ) {
              SparePartsChanged.push(element.questionResponse.sparePartDetail);
            }
          });

        return {
          ClientName,
          Date: item.Date,
          paymentMode:item.paymentMode,
          SparePartsChanged,
        };
      })
    );

    res.status(200).json({ sparePartRevenueData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error getSparePartRevenueData",
    });
  }
};

//-----------------------------------------------------------------------------------------------------------------

//api to handle get sparePart profitSummary graph Data in Engineers section

module.exports.GetSparePartProfitSummaryGraphData = async (req,res) => {
  try {
    const { EnggId } = req.params;
      

    //get current week data with the help pf current Date----------------------------
    const getWeekDays = (date) => {
      const dayNames = ["Sunday", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const daysOfWeek = [];
    
      // Get the current day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
      const currentDay = date.getDay();    
      // Calculate the date for the start of the week (Sunday)
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - currentDay);
      // Iterate through the days of the week
      for (let i = 1; i < 7; i++) {
        const weekDay = new Date(startOfWeek);
        weekDay.setDate(startOfWeek.getDate() + i);
        daysOfWeek.push({
          date: weekDay.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }),
          dayName: dayNames[weekDay.getDay()]
        });
      }
    
      return daysOfWeek;
    };
    
    const today = new Date();
    const weekDays = getWeekDays(today);
  
//-------------------------------------------------------------------------------

   const WeeklyData =await Promise.all(weekDays.map(async(day) => {
      return await ReportTable.find({ EnggId, isVerify: true, Date:day.date})
     })) 
     
     const result = WeeklyData.map((dayData, index) => {
      const totalAmount = dayData.reduce((sum, report) => sum + report.TotalAmount, 0);
      return {
        dayName: weekDays[index].dayName,
        totalAmount: totalAmount
      };
     })

     res.status(200).json({ result });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error getSpare Graph Data",
    });
  }
}

//-------------------------------------------------------------------------------------------------------------------



//api to get check engg checkIn or Not on Current date

module.exports.checkEnggCheckInOrNotOnCurrentDate = async (req,res) => {
  try {
    const { ServiceEnggId } = req.params;

    const selectedDate = new Date();
    const today = new Date(selectedDate);
    const formattedDate = today.toLocaleDateString('en-GB'); // 'en-GB' locale gives you DD/MM/YYYY format

    const isEnggCheckIn = await EnggAttendanceServiceRecord.findOne({ServiceEnggId,Date:formattedDate});

    if(!isEnggCheckIn) {
      return res.status(200).json({ isCheckIn: false });
    }

    return res.status(200).json({ isCheckIn: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error while getting engg CheckIn Data",
    });
  }
}


//----------------------------------------------------------------------------------------------------------------------