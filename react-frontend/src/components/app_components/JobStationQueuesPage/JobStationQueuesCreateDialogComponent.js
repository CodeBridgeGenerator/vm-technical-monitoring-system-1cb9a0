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
import { InputNumber } from "primereact/inputnumber";


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

const JobStationQueuesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [incomingMachineTicketId, setIncomingMachineTicketId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [incomingMachineTicketId], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            incomingMachineTicketId: _entity?.incomingMachineTicketId?._id,selectedJobStations: _entity?.selectedJobStations,status: _entity?.status,priority: _entity?.priority,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("jobStationQueues").create(_data);
        const eagerResult = await client
            .service("jobStationQueues")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "incomingMachineTicketId",
                    service : "incomingMachineTickets",
                    select:["machineId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info JobStation Queues updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in JobStation Queues" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount incomingMachineTickets
                    client
                        .service("incomingMachineTickets")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleIncomingMachineTicketsId } })
                        .then((res) => {
                            setIncomingMachineTicketId(res.data.map((e) => { return { name: e['machineId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "IncomingMachineTickets", type: "error", message: error.message || "Failed get incomingMachineTickets" });
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

    const incomingMachineTicketIdOptions = incomingMachineTicketId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create JobStation Queues" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="jobStationQueues-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="incomingMachineTicketId">Incoming Machine Ticket Id:</label>
                <Dropdown id="incomingMachineTicketId" value={_entity?.incomingMachineTicketId?._id} optionLabel="name" optionValue="value" options={incomingMachineTicketIdOptions} onChange={(e) => setValByKey("incomingMachineTicketId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["incomingMachineTicketId"]) ? (
              <p className="m-0" key="error-incomingMachineTicketId">
                {error["incomingMachineTicketId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="selectedJobStations">Selected Job Stations:</label>
                <InputText id="selectedJobStations" className="w-full mb-3 p-inputtext-sm" value={_entity?.selectedJobStations} onChange={(e) => setValByKey("selectedJobStations", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["selectedJobStations"]) ? (
              <p className="m-0" key="error-selectedJobStations">
                {error["selectedJobStations"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
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
                <label htmlFor="priority">Priority:</label>
                <InputNumber id="priority" className="w-full mb-3 p-inputtext-sm" value={_entity?.priority} onChange={(e) => setValByKey("priority", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["priority"]) ? (
              <p className="m-0" key="error-priority">
                {error["priority"]}
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

export default connect(mapState, mapDispatch)(JobStationQueuesCreateDialogComponent);
