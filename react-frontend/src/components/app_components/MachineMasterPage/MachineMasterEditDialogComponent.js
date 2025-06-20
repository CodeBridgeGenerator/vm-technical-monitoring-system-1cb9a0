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

const MachineMasterCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [ownership, setOwnership] = useState([])
const [vendingMachineType, setVendingMachineType] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setOwnership(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);
 useEffect(() => {
                    //on mount vendingMachines
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

    const onSave = async () => {
        let _data = {
            ownership: _entity?.ownership?._id,
vendingMachineCode: _entity?.vendingMachineCode,
modelNo: _entity?.modelNo,
serialNumber: _entity?.serialNumber,
vendingMachineType: _entity?.vendingMachineType?._id,
comissionDate: _entity?.comissionDate,
        };

        setLoading(true);
        try {
            
        await client.service("machineMaster").patch(_entity._id, _data);
        const eagerResult = await client
            .service("machineMaster")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "ownership",
                    service : "users",
                    select:["name"]},{
                    path : "vendingMachineType",
                    service : "vendingMachines",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info machineMaster updated successfully" });
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

    const ownershipOptions = ownership.map((elem) => ({ name: elem.name, value: elem.value }));
const vendingMachineTypeOptions = vendingMachineType.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Machine Master" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="machineMaster-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ownership">Ownership:</label>
                <Dropdown id="ownership" value={_entity?.ownership?._id} optionLabel="name" optionValue="value" options={ownershipOptions} onChange={(e) => setValByKey("ownership", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownership"]) && (
              <p className="m-0" key="error-ownership">
                {error["ownership"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vendingMachineCode">VendingMachineCode:</label>
                <InputText id="vendingMachineCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.vendingMachineCode} onChange={(e) => setValByKey("vendingMachineCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vendingMachineCode"]) && (
              <p className="m-0" key="error-vendingMachineCode">
                {error["vendingMachineCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="modelNo">Model No:</label>
                <InputText id="modelNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.modelNo} onChange={(e) => setValByKey("modelNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["modelNo"]) && (
              <p className="m-0" key="error-modelNo">
                {error["modelNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serialNumber">Serial Number:</label>
                <InputNumber id="serialNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.serialNumber} onChange={(e) => setValByKey("serialNumber", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serialNumber"]) && (
              <p className="m-0" key="error-serialNumber">
                {error["serialNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vendingMachineType">VendingMachineType:</label>
                <Dropdown id="vendingMachineType" value={_entity?.vendingMachineType?._id} optionLabel="name" optionValue="value" options={vendingMachineTypeOptions} onChange={(e) => setValByKey("vendingMachineType", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vendingMachineType"]) && (
              <p className="m-0" key="error-vendingMachineType">
                {error["vendingMachineType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="comissionDate">Comission Date:</label>
                <Calendar id="comissionDate" value={_entity?.comissionDate ? new Date(_entity?.comissionDate) : null} onChange={ (e) => setValByKey("comissionDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["comissionDate"]) && (
              <p className="m-0" key="error-comissionDate">
                {error["comissionDate"]}
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

export default connect(mapState, mapDispatch)(MachineMasterCreateDialogComponent);
