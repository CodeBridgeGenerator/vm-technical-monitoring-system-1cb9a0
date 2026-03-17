const { Service } = require("feathers-mongoose");
const FindService = require("../../utils/abstracts/FindService");
const MixedService = FindService(Service);

exports.MemStockInDetails = class MemStockInDetails extends MixedService {
  
};