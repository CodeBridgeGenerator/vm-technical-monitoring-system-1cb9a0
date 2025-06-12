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

const MachineMasterRawCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.ownership)) {
                error["ownership"] = `Ownership field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.vendingMachineCode)) {
                error["vendingMachineCode"] = `VendingMachineCode field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.modelNo)) {
                error["modelNo"] = `Model No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.serialNo)) {
                error["serialNo"] = `Serial No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.commissionDate)) {
                error["commissionDate"] = `CommissionDate field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            ownership: _entity?.ownership,vendingMachineCode: _entity?.vendingMachineCode,modelNo: _entity?.modelNo,serialNo: _entity?.serialNo,commissionDate: _entity?.commissionDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("machineMasterRaw").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Machine Master Raw created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Machine Master Raw" });
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
        <Dialog header="Create Machine Master Raw" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="machineMasterRaw-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownership">Ownership:</label>
                <InputText id="ownership" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownership} onChange={(e) => setValByKey("ownership", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownership"]) ? (
              <p className="m-0" key="error-ownership">
                {error["ownership"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vendingMachineCode">VendingMachineCode:</label>
                <InputText id="vendingMachineCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.vendingMachineCode} onChange={(e) => setValByKey("vendingMachineCode", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vendingMachineCode"]) ? (
              <p className="m-0" key="error-vendingMachineCode">
                {error["vendingMachineCode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="modelNo">Model No:</label>
                <InputText id="modelNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.modelNo} onChange={(e) => setValByKey("modelNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["modelNo"]) ? (
              <p className="m-0" key="error-modelNo">
                {error["modelNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serialNo">Serial No:</label>
                <InputText id="serialNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.serialNo} onChange={(e) => setValByKey("serialNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serialNo"]) ? (
              <p className="m-0" key="error-serialNo">
                {error["serialNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="commissionDate">CommissionDate:</label>
                <InputText id="commissionDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.commissionDate} onChange={(e) => setValByKey("commissionDate", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["commissionDate"]) ? (
              <p className="m-0" key="error-commissionDate">
                {error["commissionDate"]}
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

export default connect(mapState, mapDispatch)(MachineMasterRawCreateDialogComponent);
