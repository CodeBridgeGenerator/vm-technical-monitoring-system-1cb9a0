const { Service } = require("feathers-mongoose");
const FindService = require("../../utils/abstracts/FindService");
const MixedService = FindService(Service);

exports.IncomingMachineAbortHistory = class IncomingMachineAbortHistory extends MixedService {
  
};