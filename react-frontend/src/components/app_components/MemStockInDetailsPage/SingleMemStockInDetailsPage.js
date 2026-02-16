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


const SingleMemStockInDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [vmCode, setVmCode] = useState([]);
const [warehouse, setWarehouse] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("memStockInDetails")
            .get(urlParams.singleMemStockInDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"vmCode","warehouse"] }})
            .then((res) => {
                set_entity(res || {});
                const vmCode = Array.isArray(res.vmCode)
            ? res.vmCode.map((elem) => ({ _id: elem._id, vendingMachineCode: elem.vendingMachineCode }))
            : res.vmCode
                ? [{ _id: res.vmCode._id, vendingMachineCode: res.vmCode.vendingMachineCode }]
                : [];
        setVmCode(vmCode);
const warehouse = Array.isArray(res.warehouse)
            ? res.warehouse.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.warehouse
                ? [{ _id: res.warehouse._id, name: res.warehouse.name }]
                : [];
        setWarehouse(warehouse);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "MemStockInDetails", type: "error", message: error.message || "Failed get memStockInDetails" });
            });
    }, [props,urlParams.singleMemStockInDetailsId]);


    const goBack = () => {
        navigate("/memStockInDetails");
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
                    <h3 className="m-0">Mem Stock In Details</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>memStockInDetails/{urlParams.singleMemStockInDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Pricing</label><p className="m-0 ml-3" >{Number(_entity?.pricing)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quantity</label><p className="m-0 ml-3" >{Number(_entity?.quantity)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Part Description</label><p className="m-0 ml-3" >{_entity?.partDescription}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">PO Number</label><p className="m-0 ml-3" >{_entity?.poNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">DO Number</label><p className="m-0 ml-3" >{_entity?.doNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Category</label><p className="m-0 ml-3" >{_entity?.category}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Unit of Measurement</label><p className="m-0 ml-3" >{_entity?.unitOfMeasurement}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Condition of Terms</label><p className="m-0 ml-3" >{_entity?.conditionOfTerms}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">VmCode</label>
                    {vmCode.map((elem) => (
                        <Link key={elem._id} to={`/atlasMachines/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.vendingMachineCode}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Warehouse</label>
                    {warehouse.map((elem) => (
                        <Link key={elem._id} to={`/memWarehouses/${elem._id}`}>
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
        recordId={urlParams.singleMemStockInDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="memStockInDetails"
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

export default connect(mapState, mapDispatch)(SingleMemStockInDetailsPage);
