import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/signUp/SignUpPage';
import ResetPage from '../components/LoginPage/ResetPage';
import Dashboard from '../components/Dashboard/Dashboard';
import MaintenancePage from '../components/common/MaintenancePage';
import LoginFaqPage from '../components/LoginPage/LoginFaqPage';
import DashboardAdminControl from '../components/Dashboard/DashboardAdminControl';
import DashboardCompanyData from '../components/Dashboard/DashboardCompanyData';
import DashboardDataManagement from '../components/Dashboard/DashboardDataManagement';
import DashboardErrors from '../components/Dashboard/DashboardErrors';
import DashboardMessaging from '../components/Dashboard/DashboardMessaging';
import DashboardUserManagement from '../components/Dashboard/DashboardUserManagement';

import SingleUsersPage from '../components/cb_components/UsersPage/SingleUsersPage';
import UserProjectLayoutPage from '../components/cb_components/UsersPage/UserProjectLayoutPage';
import SingleUserChangePasswordPage from '../components/cb_components/UserChangePasswordPage/SingleUserChangePasswordPage';
import ChataiProjectLayoutPage from '../components/cb_components/ChatAiProjectLayout/ChataiProjectLayoutPage';
import PromptsUserLayoutPage from '../components/cb_components/ChatAiPromptsPage/UserLayoutPage';
import SinglePromptsPage from '../components/cb_components/ChatAiPromptsPage/SinglePromptsPage';
import ChatAiUsageLayoutPage from '../components/cb_components/ChatAiUsagePage/ChatAiUsageLayoutPage';

import Account from '../components/cb_components/Account/Account';
import SingleUserInvitesPage from '../components/cb_components/UserInvitesPage/SingleUserInvitesPage';
import UserInvitesProjectLayoutPage from '../components/cb_components/UserInvitesPage/UserInvitesProjectLayoutPage';
import SingleCompaniesPage from '../components/cb_components/CompaniesPage/SingleCompaniesPage';
import CompanyProjectLayoutPage from '../components/cb_components/CompaniesPage/CompanyProjectLayoutPage';
import SingleBranchesPage from '../components/cb_components/BranchesPage/SingleBranchesPage';
import BranchProjectLayoutPage from '../components/cb_components/BranchesPage/BranchProjectLayoutPage';
import SingleDepartmentsPage from '../components/cb_components/DepartmentsPage/SingleDepartmentsPage';
import DepartmentProjectLayoutPage from '../components/cb_components/DepartmentsPage/DepartmentProjectLayoutPage';
import SingleSectionsPage from '../components/cb_components/SectionsPage/SingleSectionsPage';
import SectionProjectLayoutPage from '../components/cb_components/SectionsPage/SectionProjectLayoutPage';
import SingleRolesPage from '../components/cb_components/RolesPage/SingleRolesPage';
import RoleProjectLayoutPage from '../components/cb_components/RolesPage/RoleProjectLayoutPage';
import SinglePositionsPage from '../components/cb_components/PositionsPage/SinglePositionsPage';
import PositionProjectLayoutPage from '../components/cb_components/PositionsPage/PositionProjectLayoutPage';
import SingleTemplatesPage from '../components/cb_components/TemplatesPage/SingleTemplatesPage';
import TemplateProjectLayoutPage from '../components/cb_components/TemplatesPage/TemplateProjectLayoutPage';
import SingleMailsPage from '../components/cb_components/MailsPage/SingleMailsPage';
import MailProjectLayoutPage from '../components/cb_components/MailsPage/MailProjectLayoutPage';
import SingleUserAddressesPage from '../components/cb_components/UserAddressesPage/SingleUserAddressesPage';
import UserAddressProjectLayoutPage from '../components/cb_components/UserAddressesPage/UserAddressProjectLayoutPage';
import SingleCompanyAddressesPage from '../components/cb_components/CompanyAddressesPage/SingleCompanyAddressesPage';
import CompanyAddressProjectLayoutPage from '../components/cb_components/CompanyAddressesPage/CompanyAddressProjectLayoutPage';
import SingleCompanyPhonesPage from '../components/cb_components/CompanyPhonesPage/SingleCompanyPhonesPage';
import CompanyPhoneProjectLayoutPage from '../components/cb_components/CompanyPhonesPage/CompanyPhoneProjectLayoutPage';
import SingleUserPhonesPage from '../components/cb_components/UserPhonesPage/SingleUserPhonesPage';
import UserPhoneProjectLayoutPage from '../components/cb_components/UserPhonesPage/UserPhoneProjectLayoutPage';
import StaffinfoProjectLayoutPage from '../components/cb_components/StaffinfoPage/StaffinfoProjectLayoutPage';
import SingleProfilesPage from '../components/cb_components/ProfilesPage/SingleProfilesPage';
import ProfileProjectLayoutPage from '../components/cb_components/ProfilesPage/ProfileProjectLayoutPage';
import SinglePermissionServicesPage from '../components/cb_components/PermissionServicesPage/SinglePermissionServicesPage';
import PermissionServiceProjectLayoutPage from '../components/cb_components/PermissionServicesPage/PermissionServiceProjectLayoutPage';
import SinglePermissionFieldsPage from '../components/cb_components/PermissionFieldsPage/SinglePermissionFieldsPage';
import PermissionFieldProjectLayoutPage from '../components/cb_components/PermissionFieldsPage/PermissionFieldProjectLayoutPage';
import SingleDynaLoaderPage from '../components/cb_components/DynaLoaderPage/SingleDynaLoaderPage';
import DynaLoaderProjectLayoutPage from '../components/cb_components/DynaLoaderPage/DynaLoaderProjectLayoutPage';
import DynaFieldsProjectLayoutPage from '../components/cb_components/DynaFieldsPage/DynaFieldsProjectLayoutPage';
import SingleStaffinfoPage from '../components/cb_components/StaffinfoPage/SingleStaffinfoPage';

import JobQueProjectLayoutPage from '../components/cb_components/JobQuesPage/JobQueProjectLayoutPage';
import SingleEmployeesPage from '../components/cb_components/EmployeesPage/SingleEmployeesPage';
import EmployeeProjectLayoutPage from '../components/cb_components/EmployeesPage/EmployeeProjectLayoutPage';
import SingleMailQuesPage from '../components/cb_components/MailQuesPage/SingleMailQuesPage';
import MailQueProjectLayoutPage from '../components/cb_components/MailQuesPage/MailQueProjectLayoutPage';
import SingleSuperiorPage from '../components/cb_components/SuperiorPage/SingleSuperiorPage';
import SuperiorProjectLayoutPage from '../components/cb_components/SuperiorPage/SuperiorProjectLayoutPage';

import SingleDepartmentAdminPage from '../components/cb_components/DepartmentAdminPage/SingleDepartmentAdminPage';
import DepartmentAdminProjectLayoutPage from '../components/cb_components/DepartmentAdminPage/DepartmentAdminProjectLayoutPage';
import SingleDepartmentHODPage from '../components/cb_components/DepartmentHODPage/SingleDepartmentHODPage';
import DepartmentHODProjectLayoutPage from '../components/cb_components/DepartmentHODPage/DepartmentHODProjectLayoutPage';
import SingleDepartmentHOSPage from '../components/cb_components/DepartmentHOSPage/SingleDepartmentHOSPage';
import DepartmentHOProjectLayoutPage from '../components/cb_components/DepartmentHOSPage/DepartmentHOProjectLayoutPage';
import SingleInboxPage from '../components/cb_components/InboxPage/SingleInboxPage';
import InboxProjectLayoutPage from '../components/cb_components/InboxPage/InboxProjectLayoutPage';
import SingleNotificationsPage from '../components/cb_components/NotificationsPage/SingleNotificationsPage';
import NotificationProjectLayoutPage from '../components/cb_components/NotificationsPage/NotificationProjectLayoutPage';

import SingleDocumentStoragesPage from '../components/cb_components/DocumentStoragesPage/SingleDocumentStoragesPage';
import DocumentStorageProjectLayoutPage from '../components/cb_components/DocumentStoragesPage/DocumentStorageProjectLayoutPage';
import SingleErrorLogsPage from '../components/cb_components/ErrorLogsPage/SingleErrorLogsPage';
import ErrorLogProjectLayoutPage from '../components/cb_components/ErrorLogsPage/ErrorLogProjectLayoutPage';

import SingleUserLoginPage from '../components/cb_components/UserLoginPage/SingleUserLoginPage';
import UserLoginProjectLayoutPage from '../components/cb_components/UserLoginPage/UserLoginProjectLayoutPage';
import UserChangePasswordProjectLayoutPage from '../components/cb_components/UserChangePasswordPage/UserChangePasswordProjectLayoutPage';
import TestProjectLayoutPage from '../components/cb_components/TestsPage/TestProjectLayoutPage';
import SingleTestsPage from '../components/cb_components/TestsPage/SingleTestsPage';

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
import SingleNotificationTemplatesPage from "../components/app_components/NotificationTemplatesPage/SingleNotificationTemplatesPage";
import NotificationTemplateProjectLayoutPage from "../components/app_components/NotificationTemplatesPage/NotificationTemplateProjectLayoutPage";
import SingleVmListsPage from "../components/app_components/VmListsPage/SingleVmListsPage";
import VmListProjectLayoutPage from "../components/app_components/VmListsPage/VmListProjectLayoutPage";
//  ~cb-add-import~

const MyRouter = (props) => {
    return (
        <Routes>
            <Route path="/" exact element={props.isLoggedIn ? <DashboardAdminControl /> : <LoginPage />} />
            <Route path="/login" exact element={props.isLoggedIn === true ? <DashboardAdminControl /> : <LoginPage />} />
            <Route path="/reset/:singleChangeForgotPasswordId" exact element={<ResetPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />
            <Route path="/maintenance" exact element={<MaintenancePage />} />
            <Route path="/login-faq" exact element={<LoginFaqPage />} />

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
            <Route path="/project" exact element={<DashboardAdminControl />} />
                // user details
                <Route path="/account" exact element={<Account />} />
                <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                <Route path="/users" exact element={<UserProjectLayoutPage />} />

                // myapp
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
<Route path="/notificationTemplates/:singleNotificationTemplatesId" exact element={<SingleNotificationTemplatesPage />} />
<Route path="/notificationTemplates" exact element={<NotificationTemplateProjectLayoutPage />} />
<Route path="/vmLists/:singleVmListsId" exact element={<SingleVmListsPage />} />
<Route path="/vmLists" exact element={<VmListProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}

                // dashboards
                <Route path="/dashboard" exact element={<Dashboard />} />
                <Route path="/DashboardAdminControl" exact element={<DashboardAdminControl />} />
                <Route path="/DashboardCompanyData" exact element={<DashboardCompanyData />} />
                <Route path="/DashboardDataManagement" exact element={<DashboardDataManagement />} />
                <Route path="/DashboardErrors" exact element={<DashboardErrors />} />
                <Route path="/DashboardMessaging" exact element={<DashboardMessaging />} />
                <Route path="/DashboardUserManagement" exact element={<DashboardUserManagement />} />

                // user details
                <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                <Route path="/users" exact element={<UserProjectLayoutPage />} />
                <Route path="/userInvites/:singleUserInvitesId" exact element={<SingleUserInvitesPage />} />
                <Route path="/userInvites" exact element={<UserInvitesProjectLayoutPage />} />
                <Route path="/userLogin/:singleUserLoginId" exact element={<SingleUserLoginPage />} />
                <Route path="/userLogin" exact element={<UserLoginProjectLayoutPage />} />
                <Route path="/userAddresses/:singleUserAddressesId" exact element={<SingleUserAddressesPage />} />
                <Route path="/userAddresses" exact element={<UserAddressProjectLayoutPage />} />
                <Route path="/userPhones/:singleUserPhonesId" exact element={<SingleUserPhonesPage />} />
                <Route path="/userPhones" exact element={<UserPhoneProjectLayoutPage />} />
                <Route path="/userChangePassword/:singleUserChangePasswordId" exact element={<SingleUserChangePasswordPage />} />
                <Route path="/userChangePassword" exact element={<UserChangePasswordProjectLayoutPage />} />
                // user management
                <Route path="/roles/:singleRolesId" exact element={<SingleRolesPage />} />
                <Route path="/roles" exact element={<RoleProjectLayoutPage />} />
                <Route path="/positions/:singlePositionsId" exact element={<SinglePositionsPage />} />
                <Route path="/positions" exact element={<PositionProjectLayoutPage />} />
                <Route path="/profiles/:singleProfilesId" exact element={<SingleProfilesPage />} />
                <Route path="/profiles" exact element={<ProfileProjectLayoutPage />} />
                // company data
                <Route path="/companies/:singleCompaniesId" exact element={<SingleCompaniesPage />} />
                <Route path="/companies" exact element={<CompanyProjectLayoutPage />} />
                <Route path="/branches/:singleBranchesId" exact element={<SingleBranchesPage />} />
                <Route path="/branches" exact element={<BranchProjectLayoutPage />} />
                <Route path="/departments/:singleDepartmentsId" exact element={<SingleDepartmentsPage />} />
                <Route path="/departments" exact element={<DepartmentProjectLayoutPage />} />
                <Route path="/sections/:singleSectionsId" exact element={<SingleSectionsPage />} />
                <Route path="/sections" exact element={<SectionProjectLayoutPage />} />
                <Route path="/companyAddresses/:singleCompanyAddressesId" exact element={<SingleCompanyAddressesPage />} />
                <Route path="/companyAddresses" exact element={<CompanyAddressProjectLayoutPage />} />
                <Route path="/companyPhones/:singleCompanyPhonesId" exact element={<SingleCompanyPhonesPage />} />
                <Route path="/companyPhones" exact element={<CompanyPhoneProjectLayoutPage />} />
                // admin controls
                <Route path="/permissionServices/:singlePermissionServicesId" exact element={<SinglePermissionServicesPage />} />
                <Route path="/permissionServices" exact element={<PermissionServiceProjectLayoutPage />} />
                <Route path="/permissionFields/:singlePermissionFieldsId" exact element={<SinglePermissionFieldsPage />} />
                <Route path="/permissionFields" exact element={<PermissionFieldProjectLayoutPage />} />
                <Route path="/superior/:singleSuperiorId" exact element={<SingleSuperiorPage />} />
                <Route path="/superior" exact element={<SuperiorProjectLayoutPage />} />
                <Route path="/departmentAdmin/:singleDepartmentAdminId" exact element={<SingleDepartmentAdminPage />} />
                <Route path="/departmentAdmin" exact element={<DepartmentAdminProjectLayoutPage />} />
                <Route path="/departmentHOD/:singleDepartmentHODId" exact element={<SingleDepartmentHODPage />} />
                <Route path="/departmentHOD" exact element={<DepartmentHODProjectLayoutPage />} />
                <Route path="/departmentHOS/:singleDepartmentHOSId" exact element={<SingleDepartmentHOSPage />} />
                <Route path="/departmentHOS" exact element={<DepartmentHOProjectLayoutPage />} />
                <Route path="/employees/:singleEmployeesId" exact element={<SingleEmployeesPage />} />
                <Route path="/employees" exact element={<EmployeeProjectLayoutPage />} />
                <Route path="/staffinfo/:singleStaffinfoId" exact element={<SingleStaffinfoPage />} />
                <Route path="/staffinfo" exact element={<StaffinfoProjectLayoutPage />} />
                <Route path="/tests/:singleTestsId" exact element={<SingleTestsPage />} />
                <Route path="/tests" exact element={<TestProjectLayoutPage />} />
                // notifications and messaging
                <Route path="/notifications/:singleNotificationsId" exact element={<SingleNotificationsPage />} />
                <Route path="/notifications" exact element={<NotificationProjectLayoutPage />} />
                <Route path="/inbox/:singleInboxId" exact element={<SingleInboxPage />} />
                <Route path="/inbox" exact element={<InboxProjectLayoutPage />} />
                <Route path="/templates/:singleTemplatesId" exact element={<SingleTemplatesPage />} />
                <Route path="/templates" exact element={<TemplateProjectLayoutPage />} />
                <Route path="/mails/:singleMailsId" exact element={<SingleMailsPage />} />
                <Route path="/mails" exact element={<MailProjectLayoutPage />} />
                // document storage
                <Route path="/documentStorages/:singleDocumentStoragesId" exact element={<SingleDocumentStoragesPage />} />
                <Route path="/documentStorages" exact element={<DocumentStorageProjectLayoutPage />} />
                // data loader
                <Route path="/dynaLoader/:singleDynaLoaderId" exact element={<SingleDynaLoaderPage />} />
                <Route path="/dynaLoader" exact element={<DynaLoaderProjectLayoutPage />} />
                <Route path="/dynaFields" exact element={<DynaFieldsProjectLayoutPage />} />
                // jobs and ques
                <Route path="/jobQues" exact element={<JobQueProjectLayoutPage />} />
                <Route path="/mailQues/:singleMailQuesId" exact element={<SingleMailQuesPage />} />
                <Route path="/mailQues" exact element={<MailQueProjectLayoutPage />} />
                // gen ai
                <Route path="/chataiProject" element={<ChataiProjectLayoutPage />} />
                <Route path="/chataiProject/:promptId" element={<ChataiProjectLayoutPage />} />
                <Route path="/prompts" exact element={<PromptsUserLayoutPage />} />
                <Route path="/prompts/:singlePromptsId" exact element={<SinglePromptsPage />} />
                <Route path="/chataiUsage" exact element={<ChatAiUsageLayoutPage />} />
                // bugs and errors
                <Route path="/errorLogs/:singleErrorLogsId" exact element={<SingleErrorLogsPage />} />
                <Route path="/errorLogs" exact element={<ErrorLogProjectLayoutPage />} />

            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
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

export default connect(mapState, mapDispatch)(MyRouter);
