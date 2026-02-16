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

const AtlasTicketsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [machineId, setMachineId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount machineMaster
                    client
                        .service("machineMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMachineMasterId } })
                        .then((res) => {
                            setMachineId(res.data.map((e) => { return { name: e['serialNumber'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MachineMaster", type: "error", message: error.message || "Failed get machineMaster" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            machineId: _entity?.machineId?._id,
checklistResponse: _entity?.checklistResponse,
assignedSupervisor: _entity?.assignedSupervisor,
assignedTechnician: _entity?.assignedTechnician,
status: _entity?.status,
startTime: _entity?.startTime,
endTime: _entity?.endTime,
        };

        setLoading(true);
        try {
            
        await client.service("atlasTickets").patch(_entity._id, _data);
        const eagerResult = await client
            .service("atlasTickets")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "machineId",
                    service : "machineMaster",
                    select:["serialNumber"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info atlasTickets updated successfully" });
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

    const machineIdOptions = machineId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Atlas Tickets" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="atlasTickets-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="machineId">Machine Id:</label>
                <Dropdown id="machineId" value={_entity?.machineId?._id} optionLabel="name" optionValue="value" options={machineIdOptions} onChange={(e) => setValByKey("machineId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["machineId"]) && (
              <p className="m-0" key="error-machineId">
                {error["machineId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checklistResponse">Checklist Response:</label>
                <InputText id="checklistResponse" className="w-full mb-3 p-inputtext-sm" value={_entity?.checklistResponse} onChange={(e) => setValByKey("checklistResponse", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checklistResponse"]) && (
              <p className="m-0" key="error-checklistResponse">
                {error["checklistResponse"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assignedSupervisor">Assigned Supervisor:</label>
                <InputText id="assignedSupervisor" className="w-full mb-3 p-inputtext-sm" value={_entity?.assignedSupervisor} onChange={(e) => setValByKey("assignedSupervisor", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assignedSupervisor"]) && (
              <p className="m-0" key="error-assignedSupervisor">
                {error["assignedSupervisor"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assignedTechnician">AssignedTechnician:</label>
                <InputText id="assignedTechnician" className="w-full mb-3 p-inputtext-sm" value={_entity?.assignedTechnician} onChange={(e) => setValByKey("assignedTechnician", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assignedTechnician"]) && (
              <p className="m-0" key="error-assignedTechnician">
                {error["assignedTechnician"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
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
                <label htmlFor="startTime">Start Time:</label>
                <Calendar id="startTime" value={_entity?.startTime ? new Date(_entity?.startTime) : null} onChange={ (e) => setValByKey("startTime", e.value)} showTime hourFormat="24"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startTime"]) && (
              <p className="m-0" key="error-startTime">
                {error["startTime"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="endTime">End Time:</label>
                <Calendar id="endTime" value={_entity?.endTime ? new Date(_entity?.endTime) : null} onChange={ (e) => setValByKey("endTime", e.value)} showTime hourFormat="24"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["endTime"]) && (
              <p className="m-0" key="error-endTime">
                {error["endTime"]}
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

export default connect(mapState, mapDispatch)(AtlasTicketsCreateDialogComponent);
