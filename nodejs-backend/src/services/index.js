// company data
const companies = require("./companies/companies.service.js");
const branches = require("./branches/branches.service.js");
const departments = require("./departments/departments.service.js");
const sections = require("./sections/sections.service.js");
const companyAddresses = require("./companyAddresses/companyAddresses.service.js");
const companyPhones = require("./companyPhones/companyPhones.service.js");

// User data
const roles = require("./roles/roles.service.js");
const profiles = require("./profiles/profiles.service.js");
const positions = require("./positions/positions.service.js");
const departmentAdmin = require("./departmentAdmin/departmentAdmin.service.js");
const departmentHOD = require("./departmentHOD/departmentHOD.service.js");
const departmentHOS = require("./departmentHOS/departmentHOS.service.js");
const employees = require("./employees/employees.service.js");
const superior = require("./superior/superior.service.js");
const permissionServices = require("./permissionServices/permissionServices.service.js");
const permissionFields = require("./permissionFields/permissionFields.service.js");
const userChangePassword = require("./userChangePassword/userChangePassword.service.js");
const userAddresses = require("./userAddresses/userAddresses.service.js");
const userPhones = require("./userPhones/userPhones.service.js");
const userInvites = require("./userInvites/userInvites.service.js");
const userLogin = require("./userLogin/userLogin.service.js");
const users = require("./users/users.service.js");
const loginHistory = require("./loginHistory/loginHistory.service.js");
// sample staff info
const staffinfo = require("./staffinfo/staffinfo.service.js");

// mail que and templates
const mailQues = require("./mailQues/mailQues.service.js");
const mails = require("./mails/mails.service.js");
const templates = require("./templates/templates.service.js");
const mailWH = require("./mailWH/mailWH.service.js");

// dynaloader
const dynaLoader = require("./dynaLoader/dynaLoader.service.js");
const dynaFields = require("./dynaFields/dynaFields.service.js");
const jobQues = require("./jobQues/jobQues.service.js");

// gen ai
const prompts = require("./prompts/prompts.service.js");
const config = require("./config/config.service.js");
const chatai = require("./chatai/chatai.service.js");

// documents and guides
const documentStorages = require("./documentStorages/documentStorages.service.js");
const userGuide = require("./userGuide/userGuide.service.js");
const steps = require("./steps/steps.service.js");

// messaging
const inbox = require("./inbox/inbox.service.js");
const notifications = require("./notifications/notifications.service.js");
const comments = require("./comments/comments.service.js");

// errors and bugs
const errorLogs = require("./errorLogs/errorLogs.service.js");
const errorsWH = require("./errorsWH/errorsWH.service.js");
const tickets = require("./tickets/tickets.service.js");
const tests = require("./tests/tests.service.js");

// audit update, delete
const audits = require("./audits/audits.service.js");

// data loader for all services
const uploader = require("./uploader/uploader.service.js");
// 230924

const machineMaster = require("./machineMaster/machineMaster.service.js");
const jobStations = require("./jobStations/jobStations.service.js");
const operationCentres = require("./operationCentres/operationCentres.service.js");
const locationMaster = require("./locationMaster/locationMaster.service.js");
const externalTickets = require("./externalTickets/externalTickets.service.js");
const atlasTickets = require("./atlasTickets/atlasTickets.service.js");
const incomingMachineTickets = require("./incomingMachineTickets/incomingMachineTickets.service.js");
const externalChecklists = require("./externalChecklists/externalChecklists.service.js");
const externalChecks = require("./externalChecks/externalChecks.service.js");
const supervisorChecklists = require("./supervisorChecklists/supervisorChecklists.service.js");
const supervisorChecks = require("./supervisorChecks/supervisorChecks.service.js");
const technicianChecklists = require("./technicianChecklists/technicianChecklists.service.js");
const technicianChecks = require("./technicianChecks/technicianChecks.service.js");
const atlasChecklists = require("./atlasChecklists/atlasChecklists.service.js");
const jobStationQueues = require("./jobStationQueues/jobStationQueues.service.js");
const atlasChecks = require("./atlasChecks/atlasChecks.service.js");
const vendingMachines = require("./vendingMachines/vendingMachines.service.js");
const machineMasterRaw = require("./machineMasterRaw/machineMasterRaw.service.js");
const partsMaster = require("./partsMaster/partsMaster.service.js");
const partsMasterRaw = require("./partsMasterRaw/partsMasterRaw.service.js");
const incomingMachineChecklists = require("./incomingMachineChecklists/incomingMachineChecklists.service.js");
const incomingMachineChecks = require("./incomingMachineChecks/incomingMachineChecks.service.js");
const stockInDetails = require("./stockInDetails/stockInDetails.service.js");
const warehouseMaster = require("./warehouseMaster/warehouseMaster.service.js");
const partRequestDetails = require("./partRequestDetails/partRequestDetails.service.js");
const stockOutDetails = require("./stockOutDetails/stockOutDetails.service.js");
const transferDetails = require("./transferDetails/transferDetails.service.js");
const sampleDetails = require("./sampleDetails/sampleDetails.service.js");
const disposalDetails = require("./disposalDetails/disposalDetails.service.js");
const customerSalesOrders = require("./customerSalesOrders/customerSalesOrders.service.js");
const salesOrderItems = require("./salesOrderItems/salesOrderItems.service.js");
const irmsQuotations = require("./irmsQuotations/irmsQuotations.service.js");
const quotationItems = require("./quotationItems/quotationItems.service.js");
const customerPurchaseOrders = require("./customerPurchaseOrders/customerPurchaseOrders.service.js");
const purchaseOrderItems = require("./purchaseOrderItems/purchaseOrderItems.service.js");
const irmsDeliveryOrders = require("./irmsDeliveryOrders/irmsDeliveryOrders.service.js");
const deliveryOrderItems = require("./deliveryOrderItems/deliveryOrderItems.service.js");
const atlasMachines = require("./atlasMachines/atlasMachines.service.js");
const workflowServices = require("./workflowServices/workflowServices.service.js");
const incomingMachineAbortHistory = require("./incomingMachineAbortHistory/incomingMachineAbortHistory.service.js");
const miscellaneousCharges = require("./miscellaneousCharges/miscellaneousCharges.service.js");
const warantyPeriodDetails = require("./warantyPeriodDetails/warantyPeriodDetails.service.js");
const closureStates = require("./closureStates/closureStates.service.js");
const externalPartRequests = require("./externalPartRequests/externalPartRequests.service.js");
const transferItems = require("./transferItems/transferItems.service.js");
const disposalItems = require("./disposalItems/disposalItems.service.js");
const sampleItems = require("./sampleItems/sampleItems.service.js");
const etikaTickets = require("./etikaTickets/etikaTickets.service.js");
const memMachines = require("./memMachines/memMachines.service.js");
const quotationDeliveryDetails = require("./quotationDeliveryDetails/quotationDeliveryDetails.service.js");
const quotationPayementDetails = require("./quotationPayementDetails/quotationPayementDetails.service.js");
const memParts = require("./memParts/memParts.service.js");
const irmsParts = require("./irmsParts/irmsParts.service.js");
const irmsWarehouseParts = require("./irmsWarehouseParts/irmsWarehouseParts.service.js");
const externalMachines = require("./externalMachines/externalMachines.service.js");
const memWarehouseParts = require("./memWarehouseParts/memWarehouseParts.service.js");
const memStockInDetails = require("./memStockInDetails/memStockInDetails.service.js");
const memWarehouses = require("./memWarehouses/memWarehouses.service.js");
const memStockOutDetails = require("./memStockOutDetails/memStockOutDetails.service.js");
const memTransferDetails = require("./memTransferDetails/memTransferDetails.service.js");
const irmsMachines = require("./irmsMachines/irmsMachines.service.js");
const memTransferItems = require("./memTransferItems/memTransferItems.service.js");
const incomingUsedPartsQuotations = require("./incomingUsedPartsQuotations/incomingUsedPartsQuotations.service.js");
const customerDetails = require("./customerDetails/customerDetails.service.js");
const documentationDetails = require("./documentationDetails/documentationDetails.service.js");
const notificationTemplates = require("./notificationTemplates/notificationTemplates.service.js");
const vmLists = require("./vmLists/vmLists.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(companies);
  app.configure(branches);
  app.configure(departments);
  app.configure(sections);
  app.configure(roles);
  app.configure(positions);
  app.configure(profiles);
  app.configure(templates);
  app.configure(mails);
  app.configure(permissionServices);
  app.configure(permissionFields);
  app.configure(userAddresses);
  app.configure(companyAddresses);
  app.configure(companyPhones);
  app.configure(userPhones);
  app.configure(userInvites);
  app.configure(staffinfo);
  app.configure(dynaLoader);
  app.configure(dynaFields);
  app.configure(mailQues);
  app.configure(employees);
  app.configure(jobQues);
  app.configure(superior);
  // gen ai
  app.configure(prompts);
  app.configure(config);
  app.configure(chatai);

  app.configure(departmentAdmin);
  app.configure(departmentHOD);
  app.configure(departmentHOS);
  app.configure(mailWH);
  app.configure(inbox);
  app.configure(notifications);
  app.configure(documentStorages);
  app.configure(errorLogs);
  app.configure(errorsWH);
  app.configure(userLogin);
  app.configure(userChangePassword);
  app.configure(tickets);
  app.configure(tests);
  app.configure(userGuide);
  app.configure(steps);
  app.configure(audits);
  app.configure(uploader);
  app.configure(comments);
  app.configure(loginHistory);

  app.configure(machineMaster);
  app.configure(jobStations);
  app.configure(operationCentres);
  app.configure(locationMaster);
  app.configure(externalTickets);
  app.configure(atlasTickets);
  app.configure(incomingMachineTickets);
  app.configure(externalChecklists);
  app.configure(externalChecks);
  app.configure(supervisorChecklists);
  app.configure(supervisorChecks);
  app.configure(technicianChecklists);
  app.configure(technicianChecks);
  app.configure(atlasChecklists);
  app.configure(jobStationQueues);
  app.configure(atlasChecks);
  app.configure(vendingMachines);
  app.configure(machineMasterRaw);
  app.configure(partsMaster);
  app.configure(partsMasterRaw);
  app.configure(incomingMachineChecklists);
  app.configure(incomingMachineChecks);
  app.configure(stockInDetails);
  app.configure(warehouseMaster);
  app.configure(partRequestDetails);
  app.configure(stockOutDetails);
  app.configure(transferDetails);
  app.configure(sampleDetails);
  app.configure(disposalDetails);
  app.configure(customerSalesOrders);
  app.configure(salesOrderItems);
  app.configure(irmsQuotations);
  app.configure(quotationItems);
  app.configure(customerPurchaseOrders);
  app.configure(purchaseOrderItems);
  app.configure(irmsDeliveryOrders);
  app.configure(deliveryOrderItems);
  app.configure(atlasMachines);
  app.configure(workflowServices);
  app.configure(incomingMachineAbortHistory);
  app.configure(miscellaneousCharges);
  app.configure(warantyPeriodDetails);
  app.configure(closureStates);
  app.configure(externalPartRequests);
  app.configure(transferItems);
  app.configure(disposalItems);
  app.configure(sampleItems);
  app.configure(etikaTickets);
  app.configure(memMachines);
  app.configure(quotationDeliveryDetails);
  app.configure(quotationPayementDetails);
  app.configure(memParts);
  app.configure(irmsParts);
  app.configure(irmsWarehouseParts);
  app.configure(externalMachines);
  app.configure(memWarehouseParts);
  app.configure(memStockInDetails);
  app.configure(memWarehouses);
  app.configure(memStockOutDetails);
  app.configure(memTransferDetails);
  app.configure(irmsMachines);
  app.configure(memTransferItems);
  app.configure(incomingUsedPartsQuotations);
  app.configure(customerDetails);
  app.configure(documentationDetails);
  app.configure(notificationTemplates);
  app.configure(vmLists);
  // ~cb-add-configure-service-name~
};
