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


const SingleIrmsMachinesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [ownership, setOwnership] = useState([]);
const [vendingMachineType, setVendingMachineType] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("irmsMachines")
            .get(urlParams.singleIrmsMachinesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"ownership","vendingMachineType"] }})
            .then((res) => {
                set_entity(res || {});
                const ownership = Array.isArray(res.ownership)
            ? res.ownership.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.ownership
                ? [{ _id: res.ownership._id, name: res.ownership.name }]
                : [];
        setOwnership(ownership);
const vendingMachineType = Array.isArray(res.vendingMachineType)
            ? res.vendingMachineType.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.vendingMachineType
                ? [{ _id: res.vendingMachineType._id, name: res.vendingMachineType.name }]
                : [];
        setVendingMachineType(vendingMachineType);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "IrmsMachines", type: "error", message: error.message || "Failed get irmsMachines" });
            });
    }, [props,urlParams.singleIrmsMachinesId]);


    const goBack = () => {
        navigate("/irmsMachines");
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
                    <h3 className="m-0">Irms Machines</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>irmsMachines/{urlParams.singleIrmsMachinesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Vending Machine Code</label><p className="m-0 ml-3" >{_entity?.vendingMachineCode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Model No</label><p className="m-0 ml-3" >{_entity?.modelNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Serial Number</label><p className="m-0 ml-3" >{_entity?.serialNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Commission Date</label><p id="commissionDate" className="m-0 ml-3" >{_entity?.commissionDate}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Ownership</label>
                    {ownership.map((elem) => (
                        <Link key={elem._id} to={`/branches/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Vending Machine Type</label>
                    {vendingMachineType.map((elem) => (
                        <Link key={elem._id} to={`/vendingMachines/${elem._id}`}>
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
        recordId={urlParams.singleIrmsMachinesId}
        user={props.user}
        alert={props.alert}
        serviceName="irmsMachines"
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

export default connect(mapState, mapDispatch)(SingleIrmsMachinesPage);
