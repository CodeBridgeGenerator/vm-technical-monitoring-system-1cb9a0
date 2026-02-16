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

const MemStockInDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [vmCode, setVmCode] = useState([])
const [warehouse, setWarehouse] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [vmCode,warehouse], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.partDescription)) {
                error["partDescription"] = `Part Description field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.poNumber)) {
                error["poNumber"] = `PO Number field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.doNumber)) {
                error["doNumber"] = `DO Number field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.category)) {
                error["category"] = `Category field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.unitOfMeasurement)) {
                error["unitOfMeasurement"] = `Unit of Measurement field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.conditionOfTerms)) {
                error["conditionOfTerms"] = `Condition of Terms field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            vmCode: _entity?.vmCode?._id,pricing: _entity?.pricing,quantity: _entity?.quantity,purchaseDate: _entity?.purchaseDate,partDescription: _entity?.partDescription,poNumber: _entity?.poNumber,doNumber: _entity?.doNumber,category: _entity?.category,unitOfMeasurement: _entity?.unitOfMeasurement,conditionOfTerms: _entity?.conditionOfTerms,warehouse: _entity?.warehouse?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("memStockInDetails").create(_data);
        const eagerResult = await client
            .service("memStockInDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "vmCode",
                    service : "atlasMachines",
                    select:["vendingMachineCode"]},{
                    path : "warehouse",
                    service : "memWarehouses",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Mem Stock In Details updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Mem Stock In Details" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount atlasMachines
                    client
                        .service("atlasMachines")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleAtlasMachinesId } })
                        .then((res) => {
                            setVmCode(res.data.map((e) => { return { name: e['vendingMachineCode'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "AtlasMachines", type: "error", message: error.message || "Failed get atlasMachines" });
                        });
                }, []);

useEffect(() => {
                    // on mount memWarehouses
                    client
                        .service("memWarehouses")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMemWarehousesId } })
                        .then((res) => {
                            setWarehouse(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MemWarehouses", type: "error", message: error.message || "Failed get memWarehouses" });
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

    const vmCodeOptions = vmCode.map((elem) => ({ name: elem.name, value: elem.value }));
const warehouseOptions = warehouse.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Mem Stock In Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="memStockInDetails-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vmCode">VmCode:</label>
                <Dropdown id="vmCode" value={_entity?.vmCode?._id} optionLabel="name" optionValue="value" options={vmCodeOptions} onChange={(e) => setValByKey("vmCode", {_id : e.value})}  />
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
                <InputText id="partDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.partDescription} onChange={(e) => setValByKey("partDescription", e.target.value)}  required  />
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
                <InputText id="poNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.poNumber} onChange={(e) => setValByKey("poNumber", e.target.value)}  required  />
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
                <InputText id="doNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.doNumber} onChange={(e) => setValByKey("doNumber", e.target.value)}  required  />
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
                <InputText id="category" className="w-full mb-3 p-inputtext-sm" value={_entity?.category} onChange={(e) => setValByKey("category", e.target.value)}  required  />
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
                <InputText id="unitOfMeasurement" className="w-full mb-3 p-inputtext-sm" value={_entity?.unitOfMeasurement} onChange={(e) => setValByKey("unitOfMeasurement", e.target.value)}  required  />
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
                <InputText id="conditionOfTerms" className="w-full mb-3 p-inputtext-sm" value={_entity?.conditionOfTerms} onChange={(e) => setValByKey("conditionOfTerms", e.target.value)}  required  />
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

export default connect(mapState, mapDispatch)(MemStockInDetailsCreateDialogComponent);
