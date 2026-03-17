import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


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

const QontakWhatsappRecordsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
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
            channelRoomId: _entity?.channelRoomId,qrText: _entity?.qrText,extractedMachineId: _entity?.extractedMachineId,vmCode: _entity?.vmCode,accountUniqueId: _entity?.accountUniqueId,customerPhoneNo: _entity?.customerPhoneNo,refNo: _entity?.refNo,status: _entity?.status,landingUrl: _entity?.landingUrl,source: _entity?.source,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("qontakWhatsappRecords").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Qontak Whatsapp Records created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Qontak Whatsapp Records" });
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
        <Dialog header="Create Qontak Whatsapp Records" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="qontakWhatsappRecords-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="channelRoomId">Channel Room Id:</label>
                <InputText id="channelRoomId" className="w-full mb-3 p-inputtext-sm" value={_entity?.channelRoomId} onChange={(e) => setValByKey("channelRoomId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["channelRoomId"]) ? (
              <p className="m-0" key="error-channelRoomId">
                {error["channelRoomId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="qrText">QR Text:</label>
                <InputText id="qrText" className="w-full mb-3 p-inputtext-sm" value={_entity?.qrText} onChange={(e) => setValByKey("qrText", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["qrText"]) ? (
              <p className="m-0" key="error-qrText">
                {error["qrText"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="extractedMachineId">Extracted Machine Id:</label>
                <InputText id="extractedMachineId" className="w-full mb-3 p-inputtext-sm" value={_entity?.extractedMachineId} onChange={(e) => setValByKey("extractedMachineId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["extractedMachineId"]) ? (
              <p className="m-0" key="error-extractedMachineId">
                {error["extractedMachineId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vmCode">VM Code:</label>
                <InputText id="vmCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.vmCode} onChange={(e) => setValByKey("vmCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vmCode"]) ? (
              <p className="m-0" key="error-vmCode">
                {error["vmCode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="accountUniqueId">Account Unique Id:</label>
                <InputText id="accountUniqueId" className="w-full mb-3 p-inputtext-sm" value={_entity?.accountUniqueId} onChange={(e) => setValByKey("accountUniqueId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["accountUniqueId"]) ? (
              <p className="m-0" key="error-accountUniqueId">
                {error["accountUniqueId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerPhoneNo">Customer Phone No:</label>
                <InputText id="customerPhoneNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerPhoneNo} onChange={(e) => setValByKey("customerPhoneNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerPhoneNo"]) ? (
              <p className="m-0" key="error-customerPhoneNo">
                {error["customerPhoneNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refNo">Ref No:</label>
                <InputText id="refNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.refNo} onChange={(e) => setValByKey("refNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refNo"]) ? (
              <p className="m-0" key="error-refNo">
                {error["refNo"]}
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
                <label htmlFor="landingUrl">Landing Url:</label>
                <InputText id="landingUrl" className="w-full mb-3 p-inputtext-sm" value={_entity?.landingUrl} onChange={(e) => setValByKey("landingUrl", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["landingUrl"]) ? (
              <p className="m-0" key="error-landingUrl">
                {error["landingUrl"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="source">Source:</label>
                <InputText id="source" className="w-full mb-3 p-inputtext-sm" value={_entity?.source} onChange={(e) => setValByKey("source", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["source"]) ? (
              <p className="m-0" key="error-source">
                {error["source"]}
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

export default connect(mapState, mapDispatch)(QontakWhatsappRecordsCreateDialogComponent);
