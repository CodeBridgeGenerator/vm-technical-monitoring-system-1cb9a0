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

const IncomingMachineAbortHistoryCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [ticketId, setTicketId] = useState([])
const [abortedBy, setAbortedBy] = useState([])
const [machineId, setMachineId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [ticketId,abortedBy,machineId], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.abortReason)) {
                error["abortReason"] = `Abort Reason field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.status)) {
                error["status"] = `Status field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            ticketId: _entity?.ticketId?._id,abortedBy: _entity?.abortedBy?._id,abortReason: _entity?.abortReason,abortedAt: _entity?.abortedAt,machineId: _entity?.machineId?._id,status: _entity?.status,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("incomingMachineAbortHistory").create(_data);
        const eagerResult = await client
            .service("incomingMachineAbortHistory")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "ticketId",
                    service : "incomingMachineTickets",
                    select:["machineId"]},{
                    path : "abortedBy",
                    service : "users",
                    select:["name"]},{
                    path : "machineId",
                    service : "machineMaster",
                    select:["modelNo"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Abort History  updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Abort History " });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount incomingMachineTickets
                    client
                        .service("incomingMachineTickets")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleIncomingMachineTicketsId } })
                        .then((res) => {
                            setTicketId(res.data.map((e) => { return { name: e['machineId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "IncomingMachineTickets", type: "error", message: error.message || "Failed get incomingMachineTickets" });
                        });
                }, []);

useEffect(() => {
                    // on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setAbortedBy(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

useEffect(() => {
                    // on mount machineMaster
                    client
                        .service("machineMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMachineMasterId } })
                        .then((res) => {
                            setMachineId(res.data.map((e) => { return { name: e['modelNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MachineMaster", type: "error", message: error.message || "Failed get machineMaster" });
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

    const ticketIdOptions = ticketId.map((elem) => ({ name: elem.name, value: elem.value }));
const abortedByOptions = abortedBy.map((elem) => ({ name: elem.name, value: elem.value }));
const machineIdOptions = machineId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Abort History " visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="incomingMachineAbortHistory-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ticketId">Ticket Id:</label>
                <Dropdown id="ticketId" value={_entity?.ticketId?._id} optionLabel="name" optionValue="value" options={ticketIdOptions} onChange={(e) => setValByKey("ticketId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ticketId"]) ? (
              <p className="m-0" key="error-ticketId">
                {error["ticketId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="abortedBy">Aborted By:</label>
                <Dropdown id="abortedBy" value={_entity?.abortedBy?._id} optionLabel="name" optionValue="value" options={abortedByOptions} onChange={(e) => setValByKey("abortedBy", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["abortedBy"]) ? (
              <p className="m-0" key="error-abortedBy">
                {error["abortedBy"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="abortReason">Abort Reason:</label>
                <InputText id="abortReason" className="w-full mb-3 p-inputtext-sm" value={_entity?.abortReason} onChange={(e) => setValByKey("abortReason", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["abortReason"]) ? (
              <p className="m-0" key="error-abortReason">
                {error["abortReason"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="abortedAt">Aborted At:</label>
                <Calendar id="abortedAt" value={_entity?.abortedAt ? new Date(_entity?.abortedAt) : null} onChange={ (e) => setValByKey("abortedAt", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["abortedAt"]) ? (
              <p className="m-0" key="error-abortedAt">
                {error["abortedAt"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(IncomingMachineAbortHistoryCreateDialogComponent);
