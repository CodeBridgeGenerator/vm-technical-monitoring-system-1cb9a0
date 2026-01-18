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


const SingleExternalPartRequestsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [partName, setPartName] = useState([]);
const [externalTicket, setExternalTicket] = useState([]);
const [technician, setTechnician] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("externalPartRequests")
            .get(urlParams.singleExternalPartRequestsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"partName","externalTicket","technician"] }})
            .then((res) => {
                set_entity(res || {});
                const partName = Array.isArray(res.partName)
            ? res.partName.map((elem) => ({ _id: elem._id, itemNo: elem.itemNo }))
            : res.partName
                ? [{ _id: res.partName._id, itemNo: res.partName.itemNo }]
                : [];
        setPartName(partName);
const externalTicket = Array.isArray(res.externalTicket)
            ? res.externalTicket.map((elem) => ({ _id: elem._id, machineId: elem.machineId }))
            : res.externalTicket
                ? [{ _id: res.externalTicket._id, machineId: res.externalTicket.machineId }]
                : [];
        setExternalTicket(externalTicket);
const technician = Array.isArray(res.technician)
            ? res.technician.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.technician
                ? [{ _id: res.technician._id, name: res.technician.name }]
                : [];
        setTechnician(technician);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ExternalPartRequests", type: "error", message: error.message || "Failed get externalPartRequests" });
            });
    }, [props,urlParams.singleExternalPartRequestsId]);


    const goBack = () => {
        navigate("/externalPartRequests");
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
                    <h3 className="m-0">ExternalPartRequests</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>externalPartRequests/{urlParams.singleExternalPartRequestsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quantity</label><p className="m-0 ml-3" >{Number(_entity?.quantity)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Comment</label><p className="m-0 ml-3" >{_entity?.comment}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Requested Date</label><p id="requestedDate" className="m-0 ml-3" >{_entity?.requestedDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Approved Date</label><p id="approvedDate" className="m-0 ml-3" >{_entity?.approvedDate}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Part Name</label>
                    {partName.map((elem) => (
                        <Link key={elem._id} to={`/partsMaster/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.itemNo}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">External Ticket</label>
                    {externalTicket.map((elem) => (
                        <Link key={elem._id} to={`/externalTickets/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.machineId}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Technician</label>
                    {technician.map((elem) => (
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
        recordId={urlParams.singleExternalPartRequestsId}
        user={props.user}
        alert={props.alert}
        serviceName="externalPartRequests"
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

export default connect(mapState, mapDispatch)(SingleExternalPartRequestsPage);
