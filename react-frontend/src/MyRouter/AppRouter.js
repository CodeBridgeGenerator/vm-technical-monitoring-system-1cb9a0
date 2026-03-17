import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleMachineMasterPage from "../components/app_components/MachineMasterPage/SingleMachineMasterPage";
import MachineMasterProjectLayoutPage from "../components/app_components/MachineMasterPage/MachineMasterProjectLayoutPage";
import SingleJobStationsPage from "../components/app_components/JobStationsPage/SingleJobStationsPage";
import JobStationProjectLayoutPage from "../components/app_components/JobStationsPage/JobStationProjectLayoutPage";
import SingleOperationCentresPage from "../components/app_components/OperationCentresPage/SingleOperationCentresPage";
import OperationCentreProjectLayoutPage from "../components/app_components/OperationCentresPage/OperationCentreProjectLayoutPage";
import SingleLocationMasterPage from "../components/app_components/LocationMasterPage/SingleLocationMasterPage";
import LocationMasterProjectLayoutPage from "../components/app_components/LocationMasterPage/LocationMasterProjectLayoutPage";
import SingleExternalTicketsPage from "../components/app_components/ExternalTicketsPage/SingleExternalTicketsPage";
import ExternalTicketProjectLayoutPage from "../components/app_components/ExternalTicketsPage/ExternalTicketProjectLayoutPage";
import SingleAtlasTicketsPage from "../components/app_components/AtlasTicketsPage/SingleAtlasTicketsPage";
import AtlasTicketProjectLayoutPage from "../components/app_components/AtlasTicketsPage/AtlasTicketProjectLayoutPage";
import SingleIncomingMachineTicketsPage from "../components/app_components/IncomingMachineTicketsPage/SingleIncomingMachineTicketsPage";
import IncomingMachineTicketProjectLayoutPage from "../components/app_components/IncomingMachineTicketsPage/IncomingMachineTicketProjectLayoutPage";
import SingleExternalChecklistsPage from "../components/app_components/ExternalChecklistsPage/SingleExternalChecklistsPage";
import ExternalChecklistProjectLayoutPage from "../components/app_components/ExternalChecklistsPage/ExternalChecklistProjectLayoutPage";
import SingleExternalChecksPage from "../components/app_components/ExternalChecksPage/SingleExternalChecksPage";
import ExternalCheckProjectLayoutPage from "../components/app_components/ExternalChecksPage/ExternalCheckProjectLayoutPage";
import SingleSupervisorChecklistsPage from "../components/app_components/SupervisorChecklistsPage/SingleSupervisorChecklistsPage";
import SupervisorChecklistProjectLayoutPage from "../components/app_components/SupervisorChecklistsPage/SupervisorChecklistProjectLayoutPage";
import SingleSupervisorChecksPage from "../components/app_components/SupervisorChecksPage/SingleSupervisorChecksPage";
import SupervisorCheckProjectLayoutPage from "../components/app_components/SupervisorChecksPage/SupervisorCheckProjectLayoutPage";
import SingleTechnicianChecklistsPage from "../components/app_components/TechnicianChecklistsPage/SingleTechnicianChecklistsPage";
import TechnicianChecklistProjectLayoutPage from "../components/app_components/TechnicianChecklistsPage/TechnicianChecklistProjectLayoutPage";
import SingleTechnicianChecksPage from "../components/app_components/TechnicianChecksPage/SingleTechnicianChecksPage";
import TechnicianCheckProjectLayoutPage from "../components/app_components/TechnicianChecksPage/TechnicianCheckProjectLayoutPage";
import SingleAtlasChecklistsPage from "../components/app_components/AtlasChecklistsPage/SingleAtlasChecklistsPage";
import AtlasChecklistProjectLayoutPage from "../components/app_components/AtlasChecklistsPage/AtlasChecklistProjectLayoutPage";
import SingleJobStationQueuesPage from "../components/app_components/JobStationQueuesPage/SingleJobStationQueuesPage";
import JobStationQueueProjectLayoutPage from "../components/app_components/JobStationQueuesPage/JobStationQueueProjectLayoutPage";
import SingleAtlasChecksPage from "../components/app_components/AtlasChecksPage/SingleAtlasChecksPage";
import AtlasCheckProjectLayoutPage from "../components/app_components/AtlasChecksPage/AtlasCheckProjectLayoutPage";
import SingleVendingMachinesPage from "../components/app_components/VendingMachinesPage/SingleVendingMachinesPage";
import VendingMachineProjectLayoutPage from "../components/app_components/VendingMachinesPage/VendingMachineProjectLayoutPage";
import SingleMachineMasterRawPage from "../components/app_components/MachineMasterRawPage/SingleMachineMasterRawPage";
import MachineMasterRawProjectLayoutPage from "../components/app_components/MachineMasterRawPage/MachineMasterRawProjectLayoutPage";
import SinglePartsMasterPage from "../components/app_components/PartsMasterPage/SinglePartsMasterPage";
import PartsMasterProjectLayoutPage from "../components/app_components/PartsMasterPage/PartsMasterProjectLayoutPage";
import SinglePartsMasterRawPage from "../components/app_components/PartsMasterRawPage/SinglePartsMasterRawPage";
import PartsMasterRawProjectLayoutPage from "../components/app_components/PartsMasterRawPage/PartsMasterRawProjectLayoutPage";
import SingleIncomingMachineChecklistsPage from "../components/app_components/IncomingMachineChecklistsPage/SingleIncomingMachineChecklistsPage";
import IncomingMachineChecklistProjectLayoutPage from "../components/app_components/IncomingMachineChecklistsPage/IncomingMachineChecklistProjectLayoutPage";
import SingleIncomingMachineChecksPage from "../components/app_components/IncomingMachineChecksPage/SingleIncomingMachineChecksPage";
import IncomingMachineCheckProjectLayoutPage from "../components/app_components/IncomingMachineChecksPage/IncomingMachineCheckProjectLayoutPage";
import SingleStockInDetailsPage from "../components/app_components/StockInDetailsPage/SingleStockInDetailsPage";
import StockInDetailProjectLayoutPage from "../components/app_components/StockInDetailsPage/StockInDetailProjectLayoutPage";
import SingleWarehouseMasterPage from "../components/app_components/WarehouseMasterPage/SingleWarehouseMasterPage";
import WarehouseMasterProjectLayoutPage from "../components/app_components/WarehouseMasterPage/WarehouseMasterProjectLayoutPage";
import SinglePartRequestDetailsPage from "../components/app_components/PartRequestDetailsPage/SinglePartRequestDetailsPage";
import PartRequestDetailProjectLayoutPage from "../components/app_components/PartRequestDetailsPage/PartRequestDetailProjectLayoutPage";
import SingleStockOutDetailsPage from "../components/app_components/StockOutDetailsPage/SingleStockOutDetailsPage";
import StockOutDetailProjectLayoutPage from "../components/app_components/StockOutDetailsPage/StockOutDetailProjectLayoutPage";
import SingleTransferDetailsPage from "../components/app_components/TransferDetailsPage/SingleTransferDetailsPage";
import TransferDetailProjectLayoutPage from "../components/app_components/TransferDetailsPage/TransferDetailProjectLayoutPage";
import SingleSampleDetailsPage from "../components/app_components/SampleDetailsPage/SingleSampleDetailsPage";
import SampleDetailProjectLayoutPage from "../components/app_components/SampleDetailsPage/SampleDetailProjectLayoutPage";
import SingleDisposalDetailsPage from "../components/app_components/DisposalDetailsPage/SingleDisposalDetailsPage";
import DisposalDetailProjectLayoutPage from "../components/app_components/DisposalDetailsPage/DisposalDetailProjectLayoutPage";
import SingleCustomerSalesOrdersPage from "../components/app_components/CustomerSalesOrdersPage/SingleCustomerSalesOrdersPage";
import CustomerSalesOrderProjectLayoutPage from "../components/app_components/CustomerSalesOrdersPage/CustomerSalesOrderProjectLayoutPage";
import SingleSalesOrderItemsPage from "../components/app_components/SalesOrderItemsPage/SingleSalesOrderItemsPage";
import SalesOrderItemProjectLayoutPage from "../components/app_components/SalesOrderItemsPage/SalesOrderItemProjectLayoutPage";
import SingleIrmsQuotationsPage from "../components/app_components/IrmsQuotationsPage/SingleIrmsQuotationsPage";
import IrmsQuotationProjectLayoutPage from "../components/app_components/IrmsQuotationsPage/IrmsQuotationProjectLayoutPage";
import SingleQuotationItemsPage from "../components/app_components/QuotationItemsPage/SingleQuotationItemsPage";
import QuotationItemProjectLayoutPage from "../components/app_components/QuotationItemsPage/QuotationItemProjectLayoutPage";
import SingleCustomerPurchaseOrdersPage from "../components/app_components/CustomerPurchaseOrdersPage/SingleCustomerPurchaseOrdersPage";
import CustomerPurchaseOrderProjectLayoutPage from "../components/app_components/CustomerPurchaseOrdersPage/CustomerPurchaseOrderProjectLayoutPage";
import SinglePurchaseOrderItemsPage from "../components/app_components/PurchaseOrderItemsPage/SinglePurchaseOrderItemsPage";
import PurchaseOrderItemProjectLayoutPage from "../components/app_components/PurchaseOrderItemsPage/PurchaseOrderItemProjectLayoutPage";
import SingleIrmsDeliveryOrdersPage from "../components/app_components/IrmsDeliveryOrdersPage/SingleIrmsDeliveryOrdersPage";
import IrmsDeliveryOrderProjectLayoutPage from "../components/app_components/IrmsDeliveryOrdersPage/IrmsDeliveryOrderProjectLayoutPage";
import SingleDeliveryOrderItemsPage from "../components/app_components/DeliveryOrderItemsPage/SingleDeliveryOrderItemsPage";
import DeliveryOrderItemProjectLayoutPage from "../components/app_components/DeliveryOrderItemsPage/DeliveryOrderItemProjectLayoutPage";
import SingleAtlasMachinesPage from "../components/app_components/AtlasMachinesPage/SingleAtlasMachinesPage";
import AtlasMachineProjectLayoutPage from "../components/app_components/AtlasMachinesPage/AtlasMachineProjectLayoutPage";
import SingleWorkflowServicesPage from "../components/app_components/WorkflowServicesPage/SingleWorkflowServicesPage";
import WorkflowServiceProjectLayoutPage from "../components/app_components/WorkflowServicesPage/WorkflowServiceProjectLayoutPage";
import SingleIncomingMachineAbortHistoryPage from "../components/app_components/IncomingMachineAbortHistoryPage/SingleIncomingMachineAbortHistoryPage";
import IncomingMachineAbortHistoryProjectLayoutPage from "../components/app_components/IncomingMachineAbortHistoryPage/IncomingMachineAbortHistoryProjectLayoutPage";
import SingleMiscellaneousChargesPage from "../components/app_components/MiscellaneousChargesPage/SingleMiscellaneousChargesPage";
import MiscellaneousChargeProjectLayoutPage from "../components/app_components/MiscellaneousChargesPage/MiscellaneousChargeProjectLayoutPage";
import SingleWarantyPeriodDetailsPage from "../components/app_components/WarantyPeriodDetailsPage/SingleWarantyPeriodDetailsPage";
import WarantyPeriodDetailProjectLayoutPage from "../components/app_components/WarantyPeriodDetailsPage/WarantyPeriodDetailProjectLayoutPage";
import SingleClosureStatesPage from "../components/app_components/ClosureStatesPage/SingleClosureStatesPage";
import ClosureStateProjectLayoutPage from "../components/app_components/ClosureStatesPage/ClosureStateProjectLayoutPage";
import SingleExternalPartRequestsPage from "../components/app_components/ExternalPartRequestsPage/SingleExternalPartRequestsPage";
import ExternalPartRequestProjectLayoutPage from "../components/app_components/ExternalPartRequestsPage/ExternalPartRequestProjectLayoutPage";
import SingleTransferItemsPage from "../components/app_components/TransferItemsPage/SingleTransferItemsPage";
import TransferItemProjectLayoutPage from "../components/app_components/TransferItemsPage/TransferItemProjectLayoutPage";
import SingleDisposalItemsPage from "../components/app_components/DisposalItemsPage/SingleDisposalItemsPage";
import DisposalItemProjectLayoutPage from "../components/app_components/DisposalItemsPage/DisposalItemProjectLayoutPage";
import SingleSampleItemsPage from "../components/app_components/SampleItemsPage/SingleSampleItemsPage";
import SampleItemProjectLayoutPage from "../components/app_components/SampleItemsPage/SampleItemProjectLayoutPage";
import SingleEtikaTicketsPage from "../components/app_components/EtikaTicketsPage/SingleEtikaTicketsPage";
import EtikaTicketProjectLayoutPage from "../components/app_components/EtikaTicketsPage/EtikaTicketProjectLayoutPage";
import SingleMemMachinesPage from "../components/app_components/MemMachinesPage/SingleMemMachinesPage";
import MemMachineProjectLayoutPage from "../components/app_components/MemMachinesPage/MemMachineProjectLayoutPage";
import SingleQuotationDeliveryDetailsPage from "../components/app_components/QuotationDeliveryDetailsPage/SingleQuotationDeliveryDetailsPage";
import QuotationDeliveryDetailProjectLayoutPage from "../components/app_components/QuotationDeliveryDetailsPage/QuotationDeliveryDetailProjectLayoutPage";
import SingleQuotationPayementDetailsPage from "../components/app_components/QuotationPayementDetailsPage/SingleQuotationPayementDetailsPage";
import QuotationPayementDetailProjectLayoutPage from "../components/app_components/QuotationPayementDetailsPage/QuotationPayementDetailProjectLayoutPage";
import SingleMemPartsPage from "../components/app_components/MemPartsPage/SingleMemPartsPage";
import MemPartProjectLayoutPage from "../components/app_components/MemPartsPage/MemPartProjectLayoutPage";
import SingleIrmsPartsPage from "../components/app_components/IrmsPartsPage/SingleIrmsPartsPage";
import IrmsPartProjectLayoutPage from "../components/app_components/IrmsPartsPage/IrmsPartProjectLayoutPage";
import SingleIrmsWarehousePartsPage from "../components/app_components/IrmsWarehousePartsPage/SingleIrmsWarehousePartsPage";
import IrmsWarehousePartProjectLayoutPage from "../components/app_components/IrmsWarehousePartsPage/IrmsWarehousePartProjectLayoutPage";
import SingleExternalMachinesPage from "../components/app_components/ExternalMachinesPage/SingleExternalMachinesPage";
import ExternalMachineProjectLayoutPage from "../components/app_components/ExternalMachinesPage/ExternalMachineProjectLayoutPage";
import SingleMemWarehousePartsPage from "../components/app_components/MemWarehousePartsPage/SingleMemWarehousePartsPage";
import MemWarehousePartProjectLayoutPage from "../components/app_components/MemWarehousePartsPage/MemWarehousePartProjectLayoutPage";
import SingleMemStockInDetailsPage from "../components/app_components/MemStockInDetailsPage/SingleMemStockInDetailsPage";
import MemStockInDetailProjectLayoutPage from "../components/app_components/MemStockInDetailsPage/MemStockInDetailProjectLayoutPage";
import SingleMemWarehousesPage from "../components/app_components/MemWarehousesPage/SingleMemWarehousesPage";
import MemWarehouseProjectLayoutPage from "../components/app_components/MemWarehousesPage/MemWarehouseProjectLayoutPage";
import SingleMemStockOutDetailsPage from "../components/app_components/MemStockOutDetailsPage/SingleMemStockOutDetailsPage";
import MemStockOutDetailProjectLayoutPage from "../components/app_components/MemStockOutDetailsPage/MemStockOutDetailProjectLayoutPage";
import SingleMemTransferDetailsPage from "../components/app_components/MemTransferDetailsPage/SingleMemTransferDetailsPage";
import MemTransferDetailProjectLayoutPage from "../components/app_components/MemTransferDetailsPage/MemTransferDetailProjectLayoutPage";
import SingleIrmsMachinesPage from "../components/app_components/IrmsMachinesPage/SingleIrmsMachinesPage";
import IrmsMachineProjectLayoutPage from "../components/app_components/IrmsMachinesPage/IrmsMachineProjectLayoutPage";
import SingleMemTransferItemsPage from "../components/app_components/MemTransferItemsPage/SingleMemTransferItemsPage";
import MemTransferItemProjectLayoutPage from "../components/app_components/MemTransferItemsPage/MemTransferItemProjectLayoutPage";
import SingleIncomingUsedPartsQuotationsPage from "../components/app_components/IncomingUsedPartsQuotationsPage/SingleIncomingUsedPartsQuotationsPage";
import IncomingUsedPartsQuotationProjectLayoutPage from "../components/app_components/IncomingUsedPartsQuotationsPage/IncomingUsedPartsQuotationProjectLayoutPage";
import SingleCustomerDetailsPage from "../components/app_components/CustomerDetailsPage/SingleCustomerDetailsPage";
import CustomerDetailProjectLayoutPage from "../components/app_components/CustomerDetailsPage/CustomerDetailProjectLayoutPage";
import SingleDocumentationDetailsPage from "../components/app_components/DocumentationDetailsPage/SingleDocumentationDetailsPage";
import DocumentationDetailProjectLayoutPage from "../components/app_components/DocumentationDetailsPage/DocumentationDetailProjectLayoutPage";
import SingleDocumentStoragesPage from "../components/app_components/DocumentStoragesPage/SingleDocumentStoragesPage";
import DocumentStorageProjectLayoutPage from "../components/app_components/DocumentStoragesPage/DocumentStorageProjectLayoutPage";
import SingleNotificationTemplatesPage from "../components/app_components/NotificationTemplatesPage/SingleNotificationTemplatesPage";
import NotificationTemplateProjectLayoutPage from "../components/app_components/NotificationTemplatesPage/NotificationTemplateProjectLayoutPage";
import SingleVmListsPage from "../components/app_components/VmListsPage/SingleVmListsPage";
import VmListProjectLayoutPage from "../components/app_components/VmListsPage/VmListProjectLayoutPage";
import SingleQontakWhatsappRecordsPage from "../components/app_components/QontakWhatsappRecordsPage/SingleQontakWhatsappRecordsPage";
import QontakWhatsappRecordProjectLayoutPage from "../components/app_components/QontakWhatsappRecordsPage/QontakWhatsappRecordProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/machineMaster/:singleMachineMasterId" exact element={<SingleMachineMasterPage />} />
<Route path="/machineMaster" exact element={<MachineMasterProjectLayoutPage />} />
<Route path="/jobStations/:singleJobStationsId" exact element={<SingleJobStationsPage />} />
<Route path="/jobStations" exact element={<JobStationProjectLayoutPage />} />
<Route path="/operationCentres/:singleOperationCentresId" exact element={<SingleOperationCentresPage />} />
<Route path="/operationCentres" exact element={<OperationCentreProjectLayoutPage />} />
<Route path="/locationMaster/:singleLocationMasterId" exact element={<SingleLocationMasterPage />} />
<Route path="/locationMaster" exact element={<LocationMasterProjectLayoutPage />} />
<Route path="/externalTickets/:singleExternalTicketsId" exact element={<SingleExternalTicketsPage />} />
<Route path="/externalTickets" exact element={<ExternalTicketProjectLayoutPage />} />
<Route path="/atlasTickets/:singleAtlasTicketsId" exact element={<SingleAtlasTicketsPage />} />
<Route path="/atlasTickets" exact element={<AtlasTicketProjectLayoutPage />} />
<Route path="/incomingMachineTickets/:singleIncomingMachineTicketsId" exact element={<SingleIncomingMachineTicketsPage />} />
<Route path="/incomingMachineTickets" exact element={<IncomingMachineTicketProjectLayoutPage />} />
<Route path="/externalChecklists/:singleExternalChecklistsId" exact element={<SingleExternalChecklistsPage />} />
<Route path="/externalChecklists" exact element={<ExternalChecklistProjectLayoutPage />} />
<Route path="/externalChecks/:singleExternalChecksId" exact element={<SingleExternalChecksPage />} />
<Route path="/externalChecks" exact element={<ExternalCheckProjectLayoutPage />} />
<Route path="/supervisorChecklists/:singleSupervisorChecklistsId" exact element={<SingleSupervisorChecklistsPage />} />
<Route path="/supervisorChecklists" exact element={<SupervisorChecklistProjectLayoutPage />} />
<Route path="/supervisorChecks/:singleSupervisorChecksId" exact element={<SingleSupervisorChecksPage />} />
<Route path="/supervisorChecks" exact element={<SupervisorCheckProjectLayoutPage />} />
<Route path="/technicianChecklists/:singleTechnicianChecklistsId" exact element={<SingleTechnicianChecklistsPage />} />
<Route path="/technicianChecklists" exact element={<TechnicianChecklistProjectLayoutPage />} />
<Route path="/technicianChecks/:singleTechnicianChecksId" exact element={<SingleTechnicianChecksPage />} />
<Route path="/technicianChecks" exact element={<TechnicianCheckProjectLayoutPage />} />
<Route path="/atlasChecklists/:singleAtlasChecklistsId" exact element={<SingleAtlasChecklistsPage />} />
<Route path="/atlasChecklists" exact element={<AtlasChecklistProjectLayoutPage />} />
<Route path="/jobStationQueues/:singleJobStationQueuesId" exact element={<SingleJobStationQueuesPage />} />
<Route path="/jobStationQueues" exact element={<JobStationQueueProjectLayoutPage />} />
<Route path="/atlasChecks/:singleAtlasChecksId" exact element={<SingleAtlasChecksPage />} />
<Route path="/atlasChecks" exact element={<AtlasCheckProjectLayoutPage />} />
<Route path="/vendingMachines/:singleVendingMachinesId" exact element={<SingleVendingMachinesPage />} />
<Route path="/vendingMachines" exact element={<VendingMachineProjectLayoutPage />} />
<Route path="/machineMasterRaw/:singleMachineMasterRawId" exact element={<SingleMachineMasterRawPage />} />
<Route path="/machineMasterRaw" exact element={<MachineMasterRawProjectLayoutPage />} />
<Route path="/partsMaster/:singlePartsMasterId" exact element={<SinglePartsMasterPage />} />
<Route path="/partsMaster" exact element={<PartsMasterProjectLayoutPage />} />
<Route path="/partsMasterRaw/:singlePartsMasterRawId" exact element={<SinglePartsMasterRawPage />} />
<Route path="/partsMasterRaw" exact element={<PartsMasterRawProjectLayoutPage />} />
<Route path="/incomingMachineChecklists/:singleIncomingMachineChecklistsId" exact element={<SingleIncomingMachineChecklistsPage />} />
<Route path="/incomingMachineChecklists" exact element={<IncomingMachineChecklistProjectLayoutPage />} />
<Route path="/incomingMachineChecks/:singleIncomingMachineChecksId" exact element={<SingleIncomingMachineChecksPage />} />
<Route path="/incomingMachineChecks" exact element={<IncomingMachineCheckProjectLayoutPage />} />
<Route path="/stockInDetails/:singleStockInDetailsId" exact element={<SingleStockInDetailsPage />} />
<Route path="/stockInDetails" exact element={<StockInDetailProjectLayoutPage />} />
<Route path="/warehouseMaster/:singleWarehouseMasterId" exact element={<SingleWarehouseMasterPage />} />
<Route path="/warehouseMaster" exact element={<WarehouseMasterProjectLayoutPage />} />
<Route path="/partRequestDetails/:singlePartRequestDetailsId" exact element={<SinglePartRequestDetailsPage />} />
<Route path="/partRequestDetails" exact element={<PartRequestDetailProjectLayoutPage />} />
<Route path="/stockOutDetails/:singleStockOutDetailsId" exact element={<SingleStockOutDetailsPage />} />
<Route path="/stockOutDetails" exact element={<StockOutDetailProjectLayoutPage />} />
<Route path="/transferDetails/:singleTransferDetailsId" exact element={<SingleTransferDetailsPage />} />
<Route path="/transferDetails" exact element={<TransferDetailProjectLayoutPage />} />
<Route path="/sampleDetails/:singleSampleDetailsId" exact element={<SingleSampleDetailsPage />} />
<Route path="/sampleDetails" exact element={<SampleDetailProjectLayoutPage />} />
<Route path="/disposalDetails/:singleDisposalDetailsId" exact element={<SingleDisposalDetailsPage />} />
<Route path="/disposalDetails" exact element={<DisposalDetailProjectLayoutPage />} />
<Route path="/customerSalesOrders/:singleCustomerSalesOrdersId" exact element={<SingleCustomerSalesOrdersPage />} />
<Route path="/customerSalesOrders" exact element={<CustomerSalesOrderProjectLayoutPage />} />
<Route path="/salesOrderItems/:singleSalesOrderItemsId" exact element={<SingleSalesOrderItemsPage />} />
<Route path="/salesOrderItems" exact element={<SalesOrderItemProjectLayoutPage />} />
<Route path="/irmsQuotations/:singleIrmsQuotationsId" exact element={<SingleIrmsQuotationsPage />} />
<Route path="/irmsQuotations" exact element={<IrmsQuotationProjectLayoutPage />} />
<Route path="/quotationItems/:singleQuotationItemsId" exact element={<SingleQuotationItemsPage />} />
<Route path="/quotationItems" exact element={<QuotationItemProjectLayoutPage />} />
<Route path="/customerPurchaseOrders/:singleCustomerPurchaseOrdersId" exact element={<SingleCustomerPurchaseOrdersPage />} />
<Route path="/customerPurchaseOrders" exact element={<CustomerPurchaseOrderProjectLayoutPage />} />
<Route path="/purchaseOrderItems/:singlePurchaseOrderItemsId" exact element={<SinglePurchaseOrderItemsPage />} />
<Route path="/purchaseOrderItems" exact element={<PurchaseOrderItemProjectLayoutPage />} />
<Route path="/irmsDeliveryOrders/:singleIrmsDeliveryOrdersId" exact element={<SingleIrmsDeliveryOrdersPage />} />
<Route path="/irmsDeliveryOrders" exact element={<IrmsDeliveryOrderProjectLayoutPage />} />
<Route path="/deliveryOrderItems/:singleDeliveryOrderItemsId" exact element={<SingleDeliveryOrderItemsPage />} />
<Route path="/deliveryOrderItems" exact element={<DeliveryOrderItemProjectLayoutPage />} />
<Route path="/atlasMachines/:singleAtlasMachinesId" exact element={<SingleAtlasMachinesPage />} />
<Route path="/atlasMachines" exact element={<AtlasMachineProjectLayoutPage />} />
<Route path="/workflowServices/:singleWorkflowServicesId" exact element={<SingleWorkflowServicesPage />} />
<Route path="/workflowServices" exact element={<WorkflowServiceProjectLayoutPage />} />
<Route path="/incomingMachineAbortHistory/:singleIncomingMachineAbortHistoryId" exact element={<SingleIncomingMachineAbortHistoryPage />} />
<Route path="/incomingMachineAbortHistory" exact element={<IncomingMachineAbortHistoryProjectLayoutPage />} />
<Route path="/miscellaneousCharges/:singleMiscellaneousChargesId" exact element={<SingleMiscellaneousChargesPage />} />
<Route path="/miscellaneousCharges" exact element={<MiscellaneousChargeProjectLayoutPage />} />
<Route path="/warantyPeriodDetails/:singleWarantyPeriodDetailsId" exact element={<SingleWarantyPeriodDetailsPage />} />
<Route path="/warantyPeriodDetails" exact element={<WarantyPeriodDetailProjectLayoutPage />} />
<Route path="/closureStates/:singleClosureStatesId" exact element={<SingleClosureStatesPage />} />
<Route path="/closureStates" exact element={<ClosureStateProjectLayoutPage />} />
<Route path="/externalPartRequests/:singleExternalPartRequestsId" exact element={<SingleExternalPartRequestsPage />} />
<Route path="/externalPartRequests" exact element={<ExternalPartRequestProjectLayoutPage />} />
<Route path="/transferItems/:singleTransferItemsId" exact element={<SingleTransferItemsPage />} />
<Route path="/transferItems" exact element={<TransferItemProjectLayoutPage />} />
<Route path="/disposalItems/:singleDisposalItemsId" exact element={<SingleDisposalItemsPage />} />
<Route path="/disposalItems" exact element={<DisposalItemProjectLayoutPage />} />
<Route path="/sampleItems/:singleSampleItemsId" exact element={<SingleSampleItemsPage />} />
<Route path="/sampleItems" exact element={<SampleItemProjectLayoutPage />} />
<Route path="/etikaTickets/:singleEtikaTicketsId" exact element={<SingleEtikaTicketsPage />} />
<Route path="/etikaTickets" exact element={<EtikaTicketProjectLayoutPage />} />
<Route path="/memMachines/:singleMemMachinesId" exact element={<SingleMemMachinesPage />} />
<Route path="/memMachines" exact element={<MemMachineProjectLayoutPage />} />
<Route path="/quotationDeliveryDetails/:singleQuotationDeliveryDetailsId" exact element={<SingleQuotationDeliveryDetailsPage />} />
<Route path="/quotationDeliveryDetails" exact element={<QuotationDeliveryDetailProjectLayoutPage />} />
<Route path="/quotationPayementDetails/:singleQuotationPayementDetailsId" exact element={<SingleQuotationPayementDetailsPage />} />
<Route path="/quotationPayementDetails" exact element={<QuotationPayementDetailProjectLayoutPage />} />
<Route path="/memParts/:singleMemPartsId" exact element={<SingleMemPartsPage />} />
<Route path="/memParts" exact element={<MemPartProjectLayoutPage />} />
<Route path="/irmsParts/:singleIrmsPartsId" exact element={<SingleIrmsPartsPage />} />
<Route path="/irmsParts" exact element={<IrmsPartProjectLayoutPage />} />
<Route path="/irmsWarehouseParts/:singleIrmsWarehousePartsId" exact element={<SingleIrmsWarehousePartsPage />} />
<Route path="/irmsWarehouseParts" exact element={<IrmsWarehousePartProjectLayoutPage />} />
<Route path="/externalMachines/:singleExternalMachinesId" exact element={<SingleExternalMachinesPage />} />
<Route path="/externalMachines" exact element={<ExternalMachineProjectLayoutPage />} />
<Route path="/memWarehouseParts/:singleMemWarehousePartsId" exact element={<SingleMemWarehousePartsPage />} />
<Route path="/memWarehouseParts" exact element={<MemWarehousePartProjectLayoutPage />} />
<Route path="/memStockInDetails/:singleMemStockInDetailsId" exact element={<SingleMemStockInDetailsPage />} />
<Route path="/memStockInDetails" exact element={<MemStockInDetailProjectLayoutPage />} />
<Route path="/memWarehouses/:singleMemWarehousesId" exact element={<SingleMemWarehousesPage />} />
<Route path="/memWarehouses" exact element={<MemWarehouseProjectLayoutPage />} />
<Route path="/memStockOutDetails/:singleMemStockOutDetailsId" exact element={<SingleMemStockOutDetailsPage />} />
<Route path="/memStockOutDetails" exact element={<MemStockOutDetailProjectLayoutPage />} />
<Route path="/memTransferDetails/:singleMemTransferDetailsId" exact element={<SingleMemTransferDetailsPage />} />
<Route path="/memTransferDetails" exact element={<MemTransferDetailProjectLayoutPage />} />
<Route path="/irmsMachines/:singleIrmsMachinesId" exact element={<SingleIrmsMachinesPage />} />
<Route path="/irmsMachines" exact element={<IrmsMachineProjectLayoutPage />} />
<Route path="/memTransferItems/:singleMemTransferItemsId" exact element={<SingleMemTransferItemsPage />} />
<Route path="/memTransferItems" exact element={<MemTransferItemProjectLayoutPage />} />
<Route path="/incomingUsedPartsQuotations/:singleIncomingUsedPartsQuotationsId" exact element={<SingleIncomingUsedPartsQuotationsPage />} />
<Route path="/incomingUsedPartsQuotations" exact element={<IncomingUsedPartsQuotationProjectLayoutPage />} />
<Route path="/customerDetails/:singleCustomerDetailsId" exact element={<SingleCustomerDetailsPage />} />
<Route path="/customerDetails" exact element={<CustomerDetailProjectLayoutPage />} />
<Route path="/documentationDetails/:singleDocumentationDetailsId" exact element={<SingleDocumentationDetailsPage />} />
<Route path="/documentationDetails" exact element={<DocumentationDetailProjectLayoutPage />} />
<Route path="/documentStorages/:singleDocumentStoragesId" exact element={<SingleDocumentStoragesPage />} />
<Route path="/documentStorages" exact element={<DocumentStorageProjectLayoutPage />} />
<Route path="/notificationTemplates/:singleNotificationTemplatesId" exact element={<SingleNotificationTemplatesPage />} />
<Route path="/notificationTemplates" exact element={<NotificationTemplateProjectLayoutPage />} />
<Route path="/vmLists/:singleVmListsId" exact element={<SingleVmListsPage />} />
<Route path="/vmLists" exact element={<VmListProjectLayoutPage />} />
<Route path="/qontakWhatsappRecords/:singleQontakWhatsappRecordsId" exact element={<SingleQontakWhatsappRecordsPage />} />
<Route path="/qontakWhatsappRecords" exact element={<QontakWhatsappRecordProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
