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

const AtlasMachinesCreateDialogComponent = (props) => {
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
                    //on mount branches
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
commissionDate: _entity?.commissionDate,
        };

        setLoading(true);
        try {
            
        await client.service("atlasMachines").patch(_entity._id, _data);
        const eagerResult = await client
            .service("atlasMachines")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "ownership",
                    service : "branches",
                    select:["name"]},{
                    path : "vendingMachineType",
                    service : "vendingMachines",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info atlasMachines updated successfully" });
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
        <Dialog header="Edit Atlas Machines" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="atlasMachines-edit-dialog-component">
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
                <label htmlFor="vendingMachineCode">Vending Machine Code:</label>
                <InputText id="vendingMachineCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.vendingMachineCode} onChange={(e) => setValByKey("vendingMachineCode", e.target.value)}  required  />
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
                <InputText id="modelNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.modelNo} onChange={(e) => setValByKey("modelNo", e.target.value)}  required  />
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
                <InputText id="serialNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.serialNumber} onChange={(e) => setValByKey("serialNumber", e.target.value)}  required  />
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
                <label htmlFor="vendingMachineType">Vending Machine Type:</label>
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
                <label htmlFor="commissionDate">Commission Date:</label>
                <Calendar id="commissionDate" value={_entity?.commissionDate ? new Date(_entity?.commissionDate) : null} onChange={ (e) => setValByKey("commissionDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["commissionDate"]) && (
              <p className="m-0" key="error-commissionDate">
                {error["commissionDate"]}
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

export default connect(mapState, mapDispatch)(AtlasMachinesCreateDialogComponent);
