import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ExternalPartRequestsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [partName, setPartName] = useState([])
const [externalTicket, setExternalTicket] = useState([])
const [technician, setTechnician] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount partsMaster
                    client
                        .service("partsMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePartsMasterId } })
                        .then((res) => {
                            setPartName(res.data.map((e) => { return { name: e['itemNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PartsMaster", type: "error", message: error.message || "Failed get partsMaster" });
                        });
                }, []);
 useEffect(() => {
                    //on mount externalTickets
                    client
                        .service("externalTickets")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleExternalTicketsId } })
                        .then((res) => {
                            setExternalTicket(res.data.map((e) => { return { name: e['machineId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "ExternalTickets", type: "error", message: error.message || "Failed get externalTickets" });
                        });
                }, []);
 useEffect(() => {
                    //on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setTechnician(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            partName: _entity?.partName?._id,
quantity: _entity?.quantity,
status: _entity?.status,
comment: _entity?.comment,
requestedDate: _entity?.requestedDate,
externalTicket: _entity?.externalTicket?._id,
technician: _entity?.technician?._id,
approvedDate: _entity?.approvedDate,
        };

        setLoading(true);
        try {
            
        await client.service("externalPartRequests").patch(_entity._id, _data);
        const eagerResult = await client
            .service("externalPartRequests")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "partName",
                    service : "partsMaster",
                    select:["itemNo"]},{
                    path : "externalTicket",
                    service : "externalTickets",
                    select:["machineId"]},{
                    path : "technician",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info externalPartRequests updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const partNameOptions = partName.map((elem) => ({ name: elem.name, value: elem.value }));
const externalTicketOptions = externalTicket.map((elem) => ({ name: elem.name, value: elem.value }));
const technicianOptions = technician.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit ExternalPartRequests" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="externalPartRequests-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="partName">Part Name:</label>
                <Dropdown id="partName" value={_entity?.partName?._id} optionLabel="name" optionValue="value" options={partNameOptions} onChange={(e) => setValByKey("partName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["partName"]) && (
              <p className="m-0" key="error-partName">
                {error["partName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantity">Quantity:</label>
                <InputNumber id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) && (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="comment">Comment:</label>
                <InputText id="comment" className="w-full mb-3 p-inputtext-sm" value={_entity?.comment} onChange={(e) => setValByKey("comment", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["comment"]) && (
              <p className="m-0" key="error-comment">
                {error["comment"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="requestedDate">Requested Date:</label>
                <Calendar id="requestedDate" value={_entity?.requestedDate ? new Date(_entity?.requestedDate) : null} onChange={ (e) => setValByKey("requestedDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["requestedDate"]) && (
              <p className="m-0" key="error-requestedDate">
                {error["requestedDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="externalTicket">External Ticket:</label>
                <Dropdown id="externalTicket" value={_entity?.externalTicket?._id} optionLabel="name" optionValue="value" options={externalTicketOptions} onChange={(e) => setValByKey("externalTicket", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["externalTicket"]) && (
              <p className="m-0" key="error-externalTicket">
                {error["externalTicket"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="technician">Technician:</label>
                <Dropdown id="technician" value={_entity?.technician?._id} optionLabel="name" optionValue="value" options={technicianOptions} onChange={(e) => setValByKey("technician", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["technician"]) && (
              <p className="m-0" key="error-technician">
                {error["technician"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="approvedDate">Approved Date:</label>
                <Calendar id="approvedDate" value={_entity?.approvedDate ? new Date(_entity?.approvedDate) : null} onChange={ (e) => setValByKey("approvedDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approvedDate"]) && (
              <p className="m-0" key="error-approvedDate">
                {error["approvedDate"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ExternalPartRequestsCreateDialogComponent);
