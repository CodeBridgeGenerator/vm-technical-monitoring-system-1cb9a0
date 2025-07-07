import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const EtikaTicketsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [machineId, setMachineId] = useState([])
const [etikaRequestor, setEtikaRequestor] = useState([])
const [assignedSupervisor, setAssignedSupervisor] = useState([])
const [assignedTechnician, setAssignedTechnician] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [machineId,etikaRequestor,assignedSupervisor,assignedTechnician], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.checklistResponse)) {
                error["checklistResponse"] = `Checklist Response field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.status)) {
                error["status"] = `Status field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.comments)) {
                error["comments"] = `Comments field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.machineImage)) {
                error["machineImage"] = `Machine Image field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            machineId: _entity?.machineId?._id,checklistResponse: _entity?.checklistResponse,etikaRequestor: _entity?.etikaRequestor?._id,assignedSupervisor: _entity?.assignedSupervisor?._id,assignedTechnician: _entity?.assignedTechnician?._id,status: _entity?.status,startTime: _entity?.startTime,endTime: _entity?.endTime,supervisorStartTime: _entity?.supervisorStartTime,supervisorEndTime: _entity?.supervisorEndTime,technicianStartTime: _entity?.technicianStartTime,technicianEndTime: _entity?.technicianEndTime,comments: _entity?.comments,machineImage: _entity?.machineImage,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("etikaTickets").create(_data);
        const eagerResult = await client
            .service("etikaTickets")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "machineId",
                    service : "machineMaster",
                    select:["serialNumber"]},{
                    path : "etikaRequestor",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Etika Tickets updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Etika Tickets" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount machineMaster
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

useEffect(() => {
                    // on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setEtikaRequestor(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

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
const etikaRequestorOptions = etikaRequestor.map((elem) => ({ name: elem.name, value: elem.value }));
const assignedSupervisorOptions = assignedSupervisor.map((elem) => ({ name: elem.name, value: elem.value }));
const assignedTechnicianOptions = assignedTechnician.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Etika Tickets" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="etikaTickets-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="machineId">Machine Id:</label>
                <Dropdown id="machineId" value={_entity?.machineId?._id} optionLabel="name" optionValue="value" options={machineIdOptions} onChange={(e) => setValByKey("machineId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["machineId"]) ? (
              <p className="m-0" key="error-machineId">
                {error["machineId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checklistResponse">Checklist Response:</label>
                <InputText id="checklistResponse" className="w-full mb-3 p-inputtext-sm" value={_entity?.checklistResponse} onChange={(e) => setValByKey("checklistResponse", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checklistResponse"]) ? (
              <p className="m-0" key="error-checklistResponse">
                {error["checklistResponse"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="etikaRequestor">Etika Requestor:</label>
                <Dropdown id="etikaRequestor" value={_entity?.etikaRequestor?._id} optionLabel="name" optionValue="value" options={etikaRequestorOptions} onChange={(e) => setValByKey("etikaRequestor", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["etikaRequestor"]) ? (
              <p className="m-0" key="error-etikaRequestor">
                {error["etikaRequestor"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assignedSupervisor">Assigned Supervisor:</label>
                <Dropdown id="assignedSupervisor" value={_entity?.assignedSupervisor?._id} optionLabel="name" optionValue="value" options={assignedSupervisorOptions} onChange={(e) => setValByKey("assignedSupervisor", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assignedSupervisor"]) ? (
              <p className="m-0" key="error-assignedSupervisor">
                {error["assignedSupervisor"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assignedTechnician">Assigned Technician:</label>
                <Dropdown id="assignedTechnician" value={_entity?.assignedTechnician?._id} optionLabel="name" optionValue="value" options={assignedTechnicianOptions} onChange={(e) => setValByKey("assignedTechnician", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assignedTechnician"]) ? (
              <p className="m-0" key="error-assignedTechnician">
                {error["assignedTechnician"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="startTime">Start Time:</label>
                <Calendar id="startTime" value={_entity?.startTime ? new Date(_entity?.startTime) : null} onChange={ (e) => setValByKey("startTime", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startTime"]) ? (
              <p className="m-0" key="error-startTime">
                {error["startTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="endTime">End Time:</label>
                <Calendar id="endTime" value={_entity?.endTime ? new Date(_entity?.endTime) : null} onChange={ (e) => setValByKey("endTime", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["endTime"]) ? (
              <p className="m-0" key="error-endTime">
                {error["endTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="supervisorStartTime">Supervisor Start Time:</label>
                <Calendar id="supervisorStartTime" value={_entity?.supervisorStartTime ? new Date(_entity?.supervisorStartTime) : null} onChange={ (e) => setValByKey("supervisorStartTime", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["supervisorStartTime"]) ? (
              <p className="m-0" key="error-supervisorStartTime">
                {error["supervisorStartTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="supervisorEndTime">Supervisor End Time:</label>
                <Calendar id="supervisorEndTime" value={_entity?.supervisorEndTime ? new Date(_entity?.supervisorEndTime) : null} onChange={ (e) => setValByKey("supervisorEndTime", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["supervisorEndTime"]) ? (
              <p className="m-0" key="error-supervisorEndTime">
                {error["supervisorEndTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="technicianStartTime">Technician Start Time:</label>
                <Calendar id="technicianStartTime" value={_entity?.technicianStartTime ? new Date(_entity?.technicianStartTime) : null} onChange={ (e) => setValByKey("technicianStartTime", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["technicianStartTime"]) ? (
              <p className="m-0" key="error-technicianStartTime">
                {error["technicianStartTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="technicianEndTime">Technician End Time:</label>
                <Calendar id="technicianEndTime" value={_entity?.technicianEndTime ? new Date(_entity?.technicianEndTime) : null} onChange={ (e) => setValByKey("technicianEndTime", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["technicianEndTime"]) ? (
              <p className="m-0" key="error-technicianEndTime">
                {error["technicianEndTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="comments">Comments:</label>
                <InputText id="comments" className="w-full mb-3 p-inputtext-sm" value={_entity?.comments} onChange={(e) => setValByKey("comments", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["comments"]) ? (
              <p className="m-0" key="error-comments">
                {error["comments"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="machineImage">Machine Image:</label>
                <InputText id="machineImage" className="w-full mb-3 p-inputtext-sm" value={_entity?.machineImage} onChange={(e) => setValByKey("machineImage", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["machineImage"]) ? (
              <p className="m-0" key="error-machineImage">
                {error["machineImage"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(EtikaTicketsCreateDialogComponent);
