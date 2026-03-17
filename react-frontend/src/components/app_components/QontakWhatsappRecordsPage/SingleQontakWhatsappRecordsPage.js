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


const SingleQontakWhatsappRecordsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    

    useEffect(() => {
        //on mount
        client
            .service("qontakWhatsappRecords")
            .get(urlParams.singleQontakWhatsappRecordsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "QontakWhatsappRecords", type: "error", message: error.message || "Failed get qontakWhatsappRecords" });
            });
    }, [props,urlParams.singleQontakWhatsappRecordsId]);


    const goBack = () => {
        navigate("/app/qontakWhatsappRecords");
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
                    <h3 className="m-0">Qontak Whatsapp Records</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>qontakWhatsappRecords/{urlParams.singleQontakWhatsappRecordsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Channel Room Id</label><p className="m-0 ml-3" >{_entity?.channelRoomId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">QR Text</label><p className="m-0 ml-3" >{_entity?.qrText}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Extracted Machine Id</label><p className="m-0 ml-3" >{_entity?.extractedMachineId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">VM Code</label><p className="m-0 ml-3" >{_entity?.vmCode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Account Unique Id</label><p className="m-0 ml-3" >{_entity?.accountUniqueId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Customer Phone No</label><p className="m-0 ml-3" >{_entity?.customerPhoneNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Ref No</label><p className="m-0 ml-3" >{_entity?.refNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Landing Url</label><p className="m-0 ml-3" >{_entity?.landingUrl}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Source</label><p className="m-0 ml-3" >{_entity?.source}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singleQontakWhatsappRecordsId}
        user={props.user}
        alert={props.alert}
        serviceName="qontakWhatsappRecords"
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

export default connect(mapState, mapDispatch)(SingleQontakWhatsappRecordsPage);
