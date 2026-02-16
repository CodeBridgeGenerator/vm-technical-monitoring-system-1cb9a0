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

import TransferItemsPage from "../TransferItemsPage/TransferItemsPage";

const SingleTransferDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [sourceWarehouse, setSourceWarehouse] = useState([]);
const [destinationWarehouse, setDestinationWarehouse] = useState([]);
const [partNumber, setPartNumber] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("transferDetails")
            .get(urlParams.singleTransferDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"sourceWarehouse","destinationWarehouse","partNumber"] }})
            .then((res) => {
                set_entity(res || {});
                const sourceWarehouse = Array.isArray(res.sourceWarehouse)
            ? res.sourceWarehouse.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.sourceWarehouse
                ? [{ _id: res.sourceWarehouse._id, name: res.sourceWarehouse.name }]
                : [];
        setSourceWarehouse(sourceWarehouse);
const destinationWarehouse = Array.isArray(res.destinationWarehouse)
            ? res.destinationWarehouse.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.destinationWarehouse
                ? [{ _id: res.destinationWarehouse._id, name: res.destinationWarehouse.name }]
                : [];
        setDestinationWarehouse(destinationWarehouse);
const partNumber = Array.isArray(res.partNumber)
            ? res.partNumber.map((elem) => ({ _id: elem._id, itemNo: elem.itemNo }))
            : res.partNumber
                ? [{ _id: res.partNumber._id, itemNo: res.partNumber.itemNo }]
                : [];
        setPartNumber(partNumber);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "TransferDetails", type: "error", message: error.message || "Failed get transferDetails" });
            });
    }, [props,urlParams.singleTransferDetailsId]);


    const goBack = () => {
        navigate("/transferDetails");
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
                    <h3 className="m-0">Transfer Details</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>transferDetails/{urlParams.singleTransferDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quantity</label><p className="m-0 ml-3" >{Number(_entity?.quantity)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Transfer Date</label><p id="transferDate" className="m-0 ml-3" >{_entity?.transferDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Transfer Status</label><p className="m-0 ml-3" >{_entity?.transferStatus}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Source Warehouse</label>
                    {sourceWarehouse.map((elem) => (
                        <Link key={elem._id} to={`/warehouseMaster/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Destination Warehouse</label>
                    {destinationWarehouse.map((elem) => (
                        <Link key={elem._id} to={`/warehouseMaster/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Part Number</label>
                    {partNumber.map((elem) => (
                        <Link key={elem._id} to={`/partsMaster/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.itemNo}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="col-12 mt-2">
            <TabView>
                
                    <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
                    <TransferItemsPage/>
                    </TabPanel>
                    
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleTransferDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="transferDetails"
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

export default connect(mapState, mapDispatch)(SingleTransferDetailsPage);
