const { Service } = require("feathers-mongoose");
const FindService = require("../../utils/abstracts/FindService");
const MixedService = FindService(Service);

exports.IncomingMachineChecklists = class IncomingMachineChecklists extends MixedService {
  
};