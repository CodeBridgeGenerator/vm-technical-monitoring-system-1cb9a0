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

const MemStockOutDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [partName, setPartName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [partName], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.stockOutType)) {
                error["stockOutType"] = `Stock Out Type field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.conditionOfItems)) {
                error["conditionOfItems"] = `Condition of Items field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            partName: _entity?.partName?._id,quantity: _entity?.quantity,stockOutType: _entity?.stockOutType,associatedOrderNumber: _entity?.associatedOrderNumber,conditionOfItems: _entity?.conditionOfItems,stockOutDate: _entity?.stockOutDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("memStockOutDetails").create(_data);
        const eagerResult = await client
            .service("memStockOutDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "partName",
                    service : "memParts",
                    select:["item"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Mem Stock Out Details updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Mem Stock Out Details" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount memParts
                    client
                        .service("memParts")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMemPartsId } })
                        .then((res) => {
                            setPartName(res.data.map((e) => { return { name: e['item'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MemParts", type: "error", message: error.message || "Failed get memParts" });
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

    const partNameOptions = partName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Mem Stock Out Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="memStockOutDetails-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="partName">Part Name:</label>
                <Dropdown id="partName" value={_entity?.partName?._id} optionLabel="name" optionValue="value" options={partNameOptions} onChange={(e) => setValByKey("partName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["partName"]) ? (
              <p className="m-0" key="error-partName">
                {error["partName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantity">Quantity:</label>
                <InputNumber id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) ? (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stockOutType">Stock Out Type:</label>
                <InputText id="stockOutType" className="w-full mb-3 p-inputtext-sm" value={_entity?.stockOutType} onChange={(e) => setValByKey("stockOutType", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stockOutType"]) ? (
              <p className="m-0" key="error-stockOutType">
                {error["stockOutType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="associatedOrderNumber">Associated Order Number:</label>
                <InputText id="associatedOrderNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.associatedOrderNumber} onChange={(e) => setValByKey("associatedOrderNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["associatedOrderNumber"]) ? (
              <p className="m-0" key="error-associatedOrderNumber">
                {error["associatedOrderNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="conditionOfItems">Condition of Items:</label>
                <InputText id="conditionOfItems" className="w-full mb-3 p-inputtext-sm" value={_entity?.conditionOfItems} onChange={(e) => setValByKey("conditionOfItems", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["conditionOfItems"]) ? (
              <p className="m-0" key="error-conditionOfItems">
                {error["conditionOfItems"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stockOutDate">Stock Out Date:</label>
                <Calendar id="stockOutDate"  value={_entity?.stockOutDate ? new Date(_entity?.stockOutDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("stockOutDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stockOutDate"]) ? (
              <p className="m-0" key="error-stockOutDate">
                {error["stockOutDate"]}
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

export default connect(mapState, mapDispatch)(MemStockOutDetailsCreateDialogComponent);
