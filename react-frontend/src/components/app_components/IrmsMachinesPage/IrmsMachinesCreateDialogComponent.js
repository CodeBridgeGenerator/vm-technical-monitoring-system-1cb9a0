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

const IrmsMachinesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [ownership, setOwnership] = useState([])
const [vendingMachineType, setVendingMachineType] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [ownership,vendingMachineType], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.vendingMachineCode)) {
                error["vendingMachineCode"] = `Vending Machine Code field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.modelNo)) {
                error["modelNo"] = `Model No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.serialNumber)) {
                error["serialNumber"] = `Serial Number field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            ownership: _entity?.ownership?._id,vendingMachineCode: _entity?.vendingMachineCode,modelNo: _entity?.modelNo,serialNumber: _entity?.serialNumber,vendingMachineType: _entity?.vendingMachineType?._id,commissionDate: _entity?.commissionDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("irmsMachines").create(_data);
        const eagerResult = await client
            .service("irmsMachines")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "ownership",
                    service : "branches",
                    select:["name"]},{
                    path : "vendingMachineType",
                    service : "vendingMachines",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Irms Machines updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Irms Machines" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount branches
                    client
                        .service("branches")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleBranchesId } })
                        .then((res) => {
                            setOwnership(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Branches", type: "error", message: error.message || "Failed get branches" });
                        });
                }, []);

useEffect(() => {
                    // on mount vendingMachines
                    client
                        .service("vendingMachines")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleVendingMachinesId } })
                        .then((res) => {
                            setVendingMachineType(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "VendingMachines", type: "error", message: error.message || "Failed get vendingMachines" });
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

    const ownershipOptions = ownership.map((elem) => ({ name: elem.name, value: elem.value }));
const vendingMachineTypeOptions = vendingMachineType.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Irms Machines" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="irmsMachines-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownership">Ownership:</label>
                <Dropdown id="ownership" value={_entity?.ownership?._id} optionLabel="name" optionValue="value" options={ownershipOptions} onChange={(e) => setValByKey("ownership", {_id : e.value})}  />
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
                <label htmlFor="vendingMachineCode">Vending Machine Code:</label>
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
                <label htmlFor="serialNumber">Serial Number:</label>
                <InputText id="serialNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.serialNumber} onChange={(e) => setValByKey("serialNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serialNumber"]) ? (
              <p className="m-0" key="error-serialNumber">
                {error["serialNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vendingMachineType">Vending Machine Type:</label>
                <Dropdown id="vendingMachineType" value={_entity?.vendingMachineType?._id} optionLabel="name" optionValue="value" options={vendingMachineTypeOptions} onChange={(e) => setValByKey("vendingMachineType", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vendingMachineType"]) ? (
              <p className="m-0" key="error-vendingMachineType">
                {error["vendingMachineType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="commissionDate">Commission Date:</label>
                <Calendar id="commissionDate"  value={_entity?.commissionDate ? new Date(_entity?.commissionDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("commissionDate", new Date(e.target.value))} showIcon showButtonBar  />
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

export default connect(mapState, mapDispatch)(IrmsMachinesCreateDialogComponent);
