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

const PartRequestDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [partName, setPartName] = useState([])
const [jobId, setJobId] = useState([])
const [Technician, setTechnician] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount partsMaster
                    client
                        .service("partsMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePartsMasterId } })
                        .then((res) => {
                            setPartName(res.data.map((e) => { return { name: e['description'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PartsMaster", type: "error", message: error.message || "Failed get partsMaster" });
                        });
                }, []);
 useEffect(() => {
                    //on mount jobStations
                    client
                        .service("jobStations")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleJobStationsId } })
                        .then((res) => {
                            setJobId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "JobStations", type: "error", message: error.message || "Failed get jobStations" });
                        });
                }, []);
 useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setTechnician(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            partName: _entity?.partName?._id,
quantity: _entity?.quantity,
status: _entity?.status,
comment: _entity?.comment,
requestedDate: _entity?.requestedDate,
jobId: _entity?.jobId?._id,
Technician: _entity?.Technician?._id,
        };

        setLoading(true);
        try {
            
        await client.service("partRequestDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("partRequestDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "partName",
                    service : "partsMaster",
                    select:["description"]},{
                    path : "jobId",
                    service : "jobStations",
                    select:["name"]},{
                    path : "Technician",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info partRequestDetails updated successfully" });
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
const jobIdOptions = jobId.map((elem) => ({ name: elem.name, value: elem.value }));
const TechnicianOptions = Technician.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Part Request Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="partRequestDetails-edit-dialog-component">
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
                <Calendar id="requestedDate" value={_entity?.requestedDate ? new Date(_entity?.requestedDate) : null} onChange={ (e) => setValByKey("requestedDate", e.value)} showTime hourFormat="12"  />
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
                <label htmlFor="jobId">Job Id:</label>
                <Dropdown id="jobId" value={_entity?.jobId?._id} optionLabel="name" optionValue="value" options={jobIdOptions} onChange={(e) => setValByKey("jobId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["jobId"]) && (
              <p className="m-0" key="error-jobId">
                {error["jobId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Technician">Technician:</label>
                <Dropdown id="Technician" value={_entity?.Technician?._id} optionLabel="name" optionValue="value" options={TechnicianOptions} onChange={(e) => setValByKey("Technician", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Technician"]) && (
              <p className="m-0" key="error-Technician">
                {error["Technician"]}
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

export default connect(mapState, mapDispatch)(PartRequestDetailsCreateDialogComponent);
