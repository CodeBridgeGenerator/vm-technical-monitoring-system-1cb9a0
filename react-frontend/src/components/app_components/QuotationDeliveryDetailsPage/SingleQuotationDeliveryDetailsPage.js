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


const SingleQuotationDeliveryDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [quotationIndex, setQuotationIndex] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("quotationDeliveryDetails")
            .get(urlParams.singleQuotationDeliveryDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"quotationIndex"] }})
            .then((res) => {
                set_entity(res || {});
                const quotationIndex = Array.isArray(res.quotationIndex)
            ? res.quotationIndex.map((elem) => ({ _id: elem._id, quotationIndex: elem.quotationIndex }))
            : res.quotationIndex
                ? [{ _id: res.quotationIndex._id, quotationIndex: res.quotationIndex.quotationIndex }]
                : [];
        setQuotationIndex(quotationIndex);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "QuotationDeliveryDetails", type: "error", message: error.message || "Failed get quotationDeliveryDetails" });
            });
    }, [props,urlParams.singleQuotationDeliveryDetailsId]);


    const goBack = () => {
        navigate("/quotationDeliveryDetails");
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
                    <h3 className="m-0">QuotationDeliveryDetails</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>quotationDeliveryDetails/{urlParams.singleQuotationDeliveryDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Description</label><p className="m-0 ml-3"  dangerouslySetInnerHTML={{__html: _entity?.description}}></p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quotation Index</label>
                    {quotationIndex.map((elem) => (
                        <Link key={elem._id} to={`/irmsQuotations/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.quotationIndex}</p>
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
        recordId={urlParams.singleQuotationDeliveryDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="quotationDeliveryDetails"
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

export default connect(mapState, mapDispatch)(SingleQuotationDeliveryDetailsPage);
