import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import MachineMasterPage from "../MachineMasterPage/MachineMasterPage";
import JobStationsPage from "../JobStationsPage/JobStationsPage";
import OperationCentresPage from "../OperationCentresPage/OperationCentresPage";
import LocationMasterPage from "../LocationMasterPage/LocationMasterPage";
import ExternalTicketsPage from "../ExternalTicketsPage/ExternalTicketsPage";
import AtlasTicketsPage from "../AtlasTicketsPage/AtlasTicketsPage";
import IncomingMachineTicketsPage from "../IncomingMachineTicketsPage/IncomingMachineTicketsPage";
import ExternalChecklistsPage from "../ExternalChecklistsPage/ExternalChecklistsPage";
import ExternalChecksPage from "../ExternalChecksPage/ExternalChecksPage";
import SupervisorChecklistsPage from "../SupervisorChecklistsPage/SupervisorChecklistsPage";
import SupervisorChecksPage from "../SupervisorChecksPage/SupervisorChecksPage";
import TechnicianChecklistsPage from "../TechnicianChecklistsPage/TechnicianChecklistsPage";
import TechnicianChecksPage from "../TechnicianChecksPage/TechnicianChecksPage";
import AtlasChecklistsPage from "../AtlasChecklistsPage/AtlasChecklistsPage";
import JobStationQueuesPage from "../JobStationQueuesPage/JobStationQueuesPage";
import AtlasChecksPage from "../AtlasChecksPage/AtlasChecksPage";
import VendingMachinesPage from "../VendingMachinesPage/VendingMachinesPage";
import MachineMasterRawPage from "../MachineMasterRawPage/MachineMasterRawPage";
import PartsMasterPage from "../PartsMasterPage/PartsMasterPage";
import PartsMasterRawPage from "../PartsMasterRawPage/PartsMasterRawPage";
import IncomingMachineChecklistsPage from "../IncomingMachineChecklistsPage/IncomingMachineChecklistsPage";
import IncomingMachineChecksPage from "../IncomingMachineChecksPage/IncomingMachineChecksPage";
import StockInDetailsPage from "../StockInDetailsPage/StockInDetailsPage";
import WarehouseMasterPage from "../WarehouseMasterPage/WarehouseMasterPage";
import PartRequestDetailsPage from "../PartRequestDetailsPage/PartRequestDetailsPage";
import StockOutDetailsPage from "../StockOutDetailsPage/StockOutDetailsPage";
import TransferDetailsPage from "../TransferDetailsPage/TransferDetailsPage";
import SampleDetailsPage from "../SampleDetailsPage/SampleDetailsPage";
import DisposalDetailsPage from "../DisposalDetailsPage/DisposalDetailsPage";
import CustomerSalesOrdersPage from "../CustomerSalesOrdersPage/CustomerSalesOrdersPage";
import SalesOrderItemsPage from "../SalesOrderItemsPage/SalesOrderItemsPage";
import IrmsQuotationsPage from "../IrmsQuotationsPage/IrmsQuotationsPage";
import QuotationItemsPage from "../QuotationItemsPage/QuotationItemsPage";
import CustomerPurchaseOrdersPage from "../CustomerPurchaseOrdersPage/CustomerPurchaseOrdersPage";
import PurchaseOrderItemsPage from "../PurchaseOrderItemsPage/PurchaseOrderItemsPage";
import IrmsDeliveryOrdersPage from "../IrmsDeliveryOrdersPage/IrmsDeliveryOrdersPage";
import DeliveryOrderItemsPage from "../DeliveryOrderItemsPage/DeliveryOrderItemsPage";
import AtlasMachinesPage from "../AtlasMachinesPage/AtlasMachinesPage";
import WorkflowServicesPage from "../WorkflowServicesPage/WorkflowServicesPage";
import IncomingMachineAbortHistoryPage from "../IncomingMachineAbortHistoryPage/IncomingMachineAbortHistoryPage";
import MiscellaneousChargesPage from "../MiscellaneousChargesPage/MiscellaneousChargesPage";
import WarantyPeriodDetailsPage from "../WarantyPeriodDetailsPage/WarantyPeriodDetailsPage";
import ClosureStatesPage from "../ClosureStatesPage/ClosureStatesPage";
import ExternalPartRequestsPage from "../ExternalPartRequestsPage/ExternalPartRequestsPage";
import TransferItemsPage from "../TransferItemsPage/TransferItemsPage";
import DisposalItemsPage from "../DisposalItemsPage/DisposalItemsPage";
import SampleItemsPage from "../SampleItemsPage/SampleItemsPage";
import EtikaTicketsPage from "../EtikaTicketsPage/EtikaTicketsPage";
import MemMachinesPage from "../MemMachinesPage/MemMachinesPage";
import QuotationDeliveryDetailsPage from "../QuotationDeliveryDetailsPage/QuotationDeliveryDetailsPage";
import QuotationPayementDetailsPage from "../QuotationPayementDetailsPage/QuotationPayementDetailsPage";
import MemPartsPage from "../MemPartsPage/MemPartsPage";
import IrmsPartsPage from "../IrmsPartsPage/IrmsPartsPage";
import IrmsWarehousePartsPage from "../IrmsWarehousePartsPage/IrmsWarehousePartsPage";
import ExternalMachinesPage from "../ExternalMachinesPage/ExternalMachinesPage";
import MemWarehousePartsPage from "../MemWarehousePartsPage/MemWarehousePartsPage";
import MemStockInDetailsPage from "../MemStockInDetailsPage/MemStockInDetailsPage";
import MemWarehousesPage from "../MemWarehousesPage/MemWarehousesPage";
import MemStockOutDetailsPage from "../MemStockOutDetailsPage/MemStockOutDetailsPage";
import MemTransferDetailsPage from "../MemTransferDetailsPage/MemTransferDetailsPage";
import IrmsMachinesPage from "../IrmsMachinesPage/IrmsMachinesPage";
import MemTransferItemsPage from "../MemTransferItemsPage/MemTransferItemsPage";
import IncomingUsedPartsQuotationsPage from "../IncomingUsedPartsQuotationsPage/IncomingUsedPartsQuotationsPage";
import CustomerDetailsPage from "../CustomerDetailsPage/CustomerDetailsPage";
import DocumentationDetailsPage from "../DocumentationDetailsPage/DocumentationDetailsPage";
import NotificationTemplatesPage from "../NotificationTemplatesPage/NotificationTemplatesPage";
import VmListsPage from "../VmListsPage/VmListsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "machineMaster":
                return <MachineMasterPage />;
case "jobStations":
                return <JobStationsPage />;
case "operationCentres":
                return <OperationCentresPage />;
case "locationMaster":
                return <LocationMasterPage />;
case "externalTickets":
                return <ExternalTicketsPage />;
case "atlasTickets":
                return <AtlasTicketsPage />;
case "incomingMachineTickets":
                return <IncomingMachineTicketsPage />;
case "externalChecklists":
                return <ExternalChecklistsPage />;
case "externalChecks":
                return <ExternalChecksPage />;
case "supervisorChecklists":
                return <SupervisorChecklistsPage />;
case "supervisorChecks":
                return <SupervisorChecksPage />;
case "technicianChecklists":
                return <TechnicianChecklistsPage />;
case "technicianChecks":
                return <TechnicianChecksPage />;
case "atlasChecklists":
                return <AtlasChecklistsPage />;
case "jobStationQueues":
                return <JobStationQueuesPage />;
case "atlasChecks":
                return <AtlasChecksPage />;
case "vendingMachines":
                return <VendingMachinesPage />;
case "machineMasterRaw":
                return <MachineMasterRawPage />;
case "partsMaster":
                return <PartsMasterPage />;
case "partsMasterRaw":
                return <PartsMasterRawPage />;
case "incomingMachineChecklists":
                return <IncomingMachineChecklistsPage />;
case "incomingMachineChecks":
                return <IncomingMachineChecksPage />;
case "stockInDetails":
                return <StockInDetailsPage />;
case "warehouseMaster":
                return <WarehouseMasterPage />;
case "partRequestDetails":
                return <PartRequestDetailsPage />;
case "stockOutDetails":
                return <StockOutDetailsPage />;
case "transferDetails":
                return <TransferDetailsPage />;
case "sampleDetails":
                return <SampleDetailsPage />;
case "disposalDetails":
                return <DisposalDetailsPage />;
case "customerSalesOrders":
                return <CustomerSalesOrdersPage />;
case "salesOrderItems":
                return <SalesOrderItemsPage />;
case "irmsQuotations":
                return <IrmsQuotationsPage />;
case "quotationItems":
                return <QuotationItemsPage />;
case "customerPurchaseOrders":
                return <CustomerPurchaseOrdersPage />;
case "purchaseOrderItems":
                return <PurchaseOrderItemsPage />;
case "irmsDeliveryOrders":
                return <IrmsDeliveryOrdersPage />;
case "deliveryOrderItems":
                return <DeliveryOrderItemsPage />;
case "atlasMachines":
                return <AtlasMachinesPage />;
case "workflowServices":
                return <WorkflowServicesPage />;
case "incomingMachineAbortHistory":
                return <IncomingMachineAbortHistoryPage />;
case "miscellaneousCharges":
                return <MiscellaneousChargesPage />;
case "warantyPeriodDetails":
                return <WarantyPeriodDetailsPage />;
case "closureStates":
                return <ClosureStatesPage />;
case "externalPartRequests":
                return <ExternalPartRequestsPage />;
case "transferItems":
                return <TransferItemsPage />;
case "disposalItems":
                return <DisposalItemsPage />;
case "sampleItems":
                return <SampleItemsPage />;
case "etikaTickets":
                return <EtikaTicketsPage />;
case "memMachines":
                return <MemMachinesPage />;
case "quotationDeliveryDetails":
                return <QuotationDeliveryDetailsPage />;
case "quotationPayementDetails":
                return <QuotationPayementDetailsPage />;
case "memParts":
                return <MemPartsPage />;
case "irmsParts":
                return <IrmsPartsPage />;
case "irmsWarehouseParts":
                return <IrmsWarehousePartsPage />;
case "externalMachines":
                return <ExternalMachinesPage />;
case "memWarehouseParts":
                return <MemWarehousePartsPage />;
case "memStockInDetails":
                return <MemStockInDetailsPage />;
case "memWarehouses":
                return <MemWarehousesPage />;
case "memStockOutDetails":
                return <MemStockOutDetailsPage />;
case "memTransferDetails":
                return <MemTransferDetailsPage />;
case "irmsMachines":
                return <IrmsMachinesPage />;
case "memTransferItems":
                return <MemTransferItemsPage />;
case "incomingUsedPartsQuotations":
                return <IncomingUsedPartsQuotationsPage />;
case "customerDetails":
                return <CustomerDetailsPage />;
case "documentationDetails":
                return <DocumentationDetailsPage />;
case "notificationTemplates":
                return <NotificationTemplatesPage />;
case "vmLists":
                return <VmListsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
