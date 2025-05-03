const callback = require("../Modals/ServicesModal/ClinetCallback");
const service = require("../Modals/ServicesModal/ClientServicesRequest");

const AssignCallback = require("../Modals/ServiceEngineerModals/AssignCallbacks");
const AssignService = require("../Modals/ServiceEngineerModals/AssignServiceRequest");

const checkClientServiceExist = async (req, res, next) => {
  const { JobOrderNumber } = req.body;

  const ClientServiceData = await callback.find({ JobOrderNumber });
  const ClientCallbackData = await service.find({ JobOrderNumber });

  let data = [];

  if (ClientServiceData.length > 0) {
    ClientServiceData.map((item) => {
      data.push(item);
    });
  }
  if (ClientCallbackData.length > 0) {
    ClientCallbackData.map((item) => {
      data.push(item);
    });
  }

  const AssignedFalse = data.filter((item) => !item.isAssigned);
  const AssignedTrue = data.filter((item) => item.isAssigned);

  if(AssignedFalse.length > 0){
      return res.status(200).json({
        status:'error',
          message: "Wait until previous Service is Assigned and Completed"
      })
  }

  if (AssignedTrue.length > 0) {
    const checkComplete = await Promise.all(
      AssignedTrue.map(async (item) => {
        console.log(item.JobOrderNumber);
        const assignServices = await AssignService.find({
          JobOrderNumber: item.JobOrderNumber,
          ServiceProcess: "InCompleted",
        });
        const assignCallbacks = await AssignCallback.find({
          JobOrderNumber: item.JobOrderNumber,
          ServiceProcess: "InCompleted",
        });

        if (assignServices.length > 0 || assignCallbacks.length > 0) {
          return {
            JobOrderNumber: item.JobOrderNumber,
            assignServices,
            assignCallbacks,
          };
        } else {
          return null;
        }
      })
    );
    const filteredResults = checkComplete.filter((result) => result !== null);
    if (filteredResults.length > 0) {
      return res.status(200).json({
        status:'error',
        message: "Wait until previous Service is Completed"
      });
    }
  }

  next();
};

module.exports = checkClientServiceExist;
