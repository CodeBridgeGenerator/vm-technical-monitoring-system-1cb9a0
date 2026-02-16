import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";


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

const StockInDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [warehouse, setWarehouse] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [warehouse], setError);
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
            model: _entity?.model,serialNo: _entity?.serialNo,partNo: _entity?.partNo,pricing: _entity?.pricing,quantity: _entity?.quantity,purchaseDate: _entity?.purchaseDate,partDescription: _entity?.partDescription,poNumber: _entity?.poNumber,doNumber: _entity?.doNumber,category: _entity?.category,unitOfMeasurement: _entity?.unitOfMeasurement,conditionOfTerms: _entity?.conditionOfTerms,warehouse: _entity?.warehouse?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("stockInDetails").create(_data);
        const eagerResult = await client
            .service("stockInDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "warehouse",
                    service : "warehouseMaster",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Stock-In Details updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Stock-In Details" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount warehouseMaster
                    client
                        .service("warehouseMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleWarehouseMasterId } })
                        .then((res) => {
                            setWarehouse(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "WarehouseMaster", type: "error", message: error.message || "Failed get warehouseMaster" });
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

    const warehouseOptions = warehouse.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Stock-In Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="stockInDetails-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="model">Model:</label>
                <InputText id="model" className="w-full mb-3 p-inputtext-sm" value={_entity?.model} onChange={(e) => setValByKey("model", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["model"]) ? (
              <p className="m-0" key="error-model">
                {error["model"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serialNo">Serial No:</label>
                <InputText id="serialNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.serialNo} onChange={(e) => setValByKey("serialNo", e.target.value)}  />
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
                <label htmlFor="partNo">Part No:</label>
                <InputText id="partNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.partNo} onChange={(e) => setValByKey("partNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["partNo"]) ? (
              <p className="m-0" key="error-partNo">
                {error["partNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="pricing">Pricing:</label>
                <InputNumber id="pricing" className="w-full mb-3 p-inputtext-sm" value={_entity?.pricing} onChange={(e) => setValByKey("pricing", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["pricing"]) ? (
              <p className="m-0" key="error-pricing">
                {error["pricing"]}
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
                <label htmlFor="purchaseDate">Purchase Date:</label>
                <Calendar id="purchaseDate"  value={_entity?.purchaseDate ? new Date(_entity?.purchaseDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("purchaseDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseDate"]) ? (
              <p className="m-0" key="error-purchaseDate">
                {error["purchaseDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="partDescription">Part Description:</label>
                <InputTextarea id="partDescription" rows={5} cols={30} value={_entity?.partDescription} onChange={ (e) => setValByKey("partDescription", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["partDescription"]) ? (
              <p className="m-0" key="error-partDescription">
                {error["partDescription"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="poNumber">PO Number:</label>
                <InputText id="poNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.poNumber} onChange={(e) => setValByKey("poNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["poNumber"]) ? (
              <p className="m-0" key="error-poNumber">
                {error["poNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="doNumber">DO Number:</label>
                <InputText id="doNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.doNumber} onChange={(e) => setValByKey("doNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["doNumber"]) ? (
              <p className="m-0" key="error-doNumber">
                {error["doNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="category">Category:</label>
                <InputText id="category" className="w-full mb-3 p-inputtext-sm" value={_entity?.category} onChange={(e) => setValByKey("category", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["category"]) ? (
              <p className="m-0" key="error-category">
                {error["category"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unitOfMeasurement">Unit of Measurement:</label>
                <InputText id="unitOfMeasurement" className="w-full mb-3 p-inputtext-sm" value={_entity?.unitOfMeasurement} onChange={(e) => setValByKey("unitOfMeasurement", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitOfMeasurement"]) ? (
              <p className="m-0" key="error-unitOfMeasurement">
                {error["unitOfMeasurement"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="conditionOfTerms">Condition of Terms:</label>
                <InputText id="conditionOfTerms" className="w-full mb-3 p-inputtext-sm" value={_entity?.conditionOfTerms} onChange={(e) => setValByKey("conditionOfTerms", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["conditionOfTerms"]) ? (
              <p className="m-0" key="error-conditionOfTerms">
                {error["conditionOfTerms"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="warehouse">Warehouse:</label>
                <Dropdown id="warehouse" value={_entity?.warehouse?._id} optionLabel="name" optionValue="value" options={warehouseOptions} onChange={(e) => setValByKey("warehouse", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["warehouse"]) ? (
              <p className="m-0" key="error-warehouse">
                {error["warehouse"]}
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

export default connect(mapState, mapDispatch)(StockInDetailsCreateDialogComponent);
