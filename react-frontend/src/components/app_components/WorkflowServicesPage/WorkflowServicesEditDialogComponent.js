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
import { InputNumber } from 'primereact/inputnumber';


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

const WorkflowServicesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            queueName: _entity?.queueName,
type: _entity?.type,
data: _entity?.data,
status: _entity?.status,
jobId: _entity?.jobId,
attemptsMade: _entity?.attemptsMade,
error: _entity?.error,
        };

        setLoading(true);
        try {
            
        const result = await client.service("workflowServices").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info workflowServices updated successfully" });
        props.onEditResult(result);
        
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

    

    return (
        <Dialog header="Edit WorkflowServices" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="workflowServices-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="queueName">Queue Name:</label>
                <InputText id="queueName" className="w-full mb-3 p-inputtext-sm" value={_entity?.queueName} onChange={(e) => setValByKey("queueName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["queueName"]) && (
              <p className="m-0" key="error-queueName">
                {error["queueName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="type">Type:</label>
                <InputText id="type" className="w-full mb-3 p-inputtext-sm" value={_entity?.type} onChange={(e) => setValByKey("type", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["type"]) && (
              <p className="m-0" key="error-type">
                {error["type"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="data">Data:</label>
                <InputText id="data" className="w-full mb-3 p-inputtext-sm" value={_entity?.data} onChange={(e) => setValByKey("data", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["data"]) && (
              <p className="m-0" key="error-data">
                {error["data"]}
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
                <label htmlFor="jobId">Job Id:</label>
                <InputText id="jobId" className="w-full mb-3 p-inputtext-sm" value={_entity?.jobId} onChange={(e) => setValByKey("jobId", e.target.value)}  required  />
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
                <label htmlFor="attemptsMade">Attempts Made:</label>
                <InputNumber id="attemptsMade" className="w-full mb-3 p-inputtext-sm" value={_entity?.attemptsMade} onChange={(e) => setValByKey("attemptsMade", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["attemptsMade"]) && (
              <p className="m-0" key="error-attemptsMade">
                {error["attemptsMade"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="error">Error:</label>
                <InputText id="error" className="w-full mb-3 p-inputtext-sm" value={_entity?.error} onChange={(e) => setValByKey("error", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["error"]) && (
              <p className="m-0" key="error-error">
                {error["error"]}
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

export default connect(mapState, mapDispatch)(WorkflowServicesCreateDialogComponent);
