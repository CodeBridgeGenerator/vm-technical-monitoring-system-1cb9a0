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

const StockOutDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [partName, setPartName] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount partsMaster
                    client
                        .service("partsMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePartsMasterId } })
                        .then((res) => {
                            setPartName(res.data.map((e) => { return { name: e['description'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PartsMaster", type: "error", message: error.message || "Failed get partsMaster" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            partName: _entity?.partName?._id,
stockOutType: _entity?.stockOutType,
associatedOrderNumber: _entity?.associatedOrderNumber,
conditionOfItems: _entity?.conditionOfItems,
        };

        setLoading(true);
        try {
            
        await client.service("stockOutDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("stockOutDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "partName",
                    service : "partsMaster",
                    select:["description"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info stockOutDetails updated successfully" });
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

    const partNameOptions = partName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Stock Out Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="stockOutDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="partName">PartName:</label>
                <Dropdown id="partName" value={_entity?.partName?._id} optionLabel="name" optionValue="value" options={partNameOptions} onChange={(e) => setValByKey("partName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["partName"]) && (
              <p className="m-0" key="error-partName">
                {error["partName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stockOutType">StockOutType:</label>
                <InputText id="stockOutType" className="w-full mb-3 p-inputtext-sm" value={_entity?.stockOutType} onChange={(e) => setValByKey("stockOutType", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stockOutType"]) && (
              <p className="m-0" key="error-stockOutType">
                {error["stockOutType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="associatedOrderNumber">AssociatedOrderNumber:</label>
                <InputText id="associatedOrderNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.associatedOrderNumber} onChange={(e) => setValByKey("associatedOrderNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["associatedOrderNumber"]) && (
              <p className="m-0" key="error-associatedOrderNumber">
                {error["associatedOrderNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="conditionOfItems">ConditionOfItems:</label>
                <InputText id="conditionOfItems" className="w-full mb-3 p-inputtext-sm" value={_entity?.conditionOfItems} onChange={(e) => setValByKey("conditionOfItems", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["conditionOfItems"]) && (
              <p className="m-0" key="error-conditionOfItems">
                {error["conditionOfItems"]}
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

export default connect(mapState, mapDispatch)(StockOutDetailsCreateDialogComponent);
