const { Service } = require("feathers-mongoose");
const FindService = require("../../utils/abstracts/FindService");
const MixedService = FindService(Service);

exports.ClosureStates = class ClosureStates extends MixedService {
  
};