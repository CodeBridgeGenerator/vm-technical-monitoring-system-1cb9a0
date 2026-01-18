import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import { Calendar } from 'primereact/calendar';

const SingleEtikaTicketsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [machineId, setMachineId] = useState([]);
const [etikaRequestor, setEtikaRequestor] = useState([]);
const [assignedSupervisor, setAssignedSupervisor] = useState([]);
const [assignedTechnician, setAssignedTechnician] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("etikaTickets")
            .get(urlParams.singleEtikaTicketsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"machineId","etikaRequestor","assignedSupervisor","assignedTechnician"] }})
            .then((res) => {
                set_entity(res || {});
                const machineId = Array.isArray(res.machineId)
            ? res.machineId.map((elem) => ({ _id: elem._id, serialNumber: elem.serialNumber }))
            : res.machineId
                ? [{ _id: res.machineId._id, serialNumber: res.machineId.serialNumber }]
                : [];
        setMachineId(machineId);
const etikaRequestor = Array.isArray(res.etikaRequestor)
            ? res.etikaRequestor.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.etikaRequestor
                ? [{ _id: res.etikaRequestor._id, name: res.etikaRequestor.name }]
                : [];
        setEtikaRequestor(etikaRequestor);
const assignedSupervisor = Array.isArray(res.assignedSupervisor)
            ? res.assignedSupervisor.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.assignedSupervisor
                ? [{ _id: res.assignedSupervisor._id, name: res.assignedSupervisor.name }]
                : [];
        setAssignedSupervisor(assignedSupervisor);
const assignedTechnician = Array.isArray(res.assignedTechnician)
            ? res.assignedTechnician.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.assignedTechnician
                ? [{ _id: res.assignedTechnician._id, name: res.assignedTechnician.name }]
                : [];
        setAssignedTechnician(assignedTechnician);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "EtikaTickets", type: "error", message: error.message || "Failed get etikaTickets" });
            });
    }, [props,urlParams.singleEtikaTicketsId]);


    const goBack = () => {
        navigate("/etikaTickets");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Etika Tickets</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>etikaTickets/{urlParams.singleEtikaTicketsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Checklist Response</label><p className="m-0 ml-3" >{_entity?.checklistResponse}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Start Time</label><p className="m-0 ml-3" ><Calendar id="startTime" value={new Date(_entity?.startTime)} disabled={true} hourFormat="24"  /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">End Time</label><p className="m-0 ml-3" ><Calendar id="endTime" value={new Date(_entity?.endTime)} disabled={true} hourFormat="24"  /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supervisor Start Time</label><p className="m-0 ml-3" ><Calendar id="supervisorStartTime" value={new Date(_entity?.supervisorStartTime)} disabled={true} hourFormat="24"  /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supervisor End Time</label><p className="m-0 ml-3" ><Calendar id="supervisorEndTime" value={new Date(_entity?.supervisorEndTime)} disabled={true} hourFormat="24"  /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Technician Start Time</label><p className="m-0 ml-3" ><Calendar id="technicianStartTime" value={new Date(_entity?.technicianStartTime)} disabled={true} hourFormat="24"  /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Technician End Time</label><p className="m-0 ml-3" ><Calendar id="technicianEndTime" value={new Date(_entity?.technicianEndTime)} disabled={true} hourFormat="24"  /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Comments</label><p className="m-0 ml-3" >{_entity?.comments}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Machine Image</label><p className="m-0 ml-3" >{_entity?.machineImage}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Machine Id</label>
                    {machineId.map((elem) => (
                        <Link key={elem._id} to={`/machineMaster/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.serialNumber}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Etika Requestor</label>
                    {etikaRequestor.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Assigned Supervisor</label>
                    {assignedSupervisor.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Assigned Technician</label>
                    {assignedTechnician.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="col-12 mt-2">
            <TabView>
                
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleEtikaTicketsId}
        user={props.user}
        alert={props.alert}
        serviceName="etikaTickets"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleEtikaTicketsPage);
