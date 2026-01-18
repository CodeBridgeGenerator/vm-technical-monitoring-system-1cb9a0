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

const MemWarehousePartsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [part, setPart] = useState([])
const [warehouse, setWarehouse] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [part,warehouse], setError);
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
            part: _entity?.part?._id,warehouse: _entity?.warehouse?._id,quantity: _entity?.quantity,costAmount: _entity?.costAmount,reorderingQuantity: _entity?.reorderingQuantity,reorderingPoint: _entity?.reorderingPoint,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("memWarehouseParts").create(_data);
        const eagerResult = await client
            .service("memWarehouseParts")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "part",
                    service : "memParts",
                    select:["item"]},{
                    path : "warehouse",
                    service : "warehouseMaster",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Mem Warehouse Parts updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Mem Warehouse Parts" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount memParts
                    client
                        .service("memParts")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMemPartsId } })
                        .then((res) => {
                            setPart(res.data.map((e) => { return { name: e['item'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MemParts", type: "error", message: error.message || "Failed get memParts" });
                        });
                }, []);

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

    const partOptions = part.map((elem) => ({ name: elem.name, value: elem.value }));
const warehouseOptions = warehouse.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Mem Warehouse Parts" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="memWarehouseParts-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="part">Part:</label>
                <Dropdown id="part" value={_entity?.part?._id} optionLabel="name" optionValue="value" options={partOptions} onChange={(e) => setValByKey("part", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["part"]) ? (
              <p className="m-0" key="error-part">
                {error["part"]}
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
                <label htmlFor="costAmount">Cost Amount:</label>
                <InputNumber id="costAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.costAmount} onChange={(e) => setValByKey("costAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["costAmount"]) ? (
              <p className="m-0" key="error-costAmount">
                {error["costAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reorderingQuantity">Reordering Quantity:</label>
                <InputNumber id="reorderingQuantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.reorderingQuantity} onChange={(e) => setValByKey("reorderingQuantity", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reorderingQuantity"]) ? (
              <p className="m-0" key="error-reorderingQuantity">
                {error["reorderingQuantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reorderingPoint">Reordering Point:</label>
                <InputNumber id="reorderingPoint" className="w-full mb-3 p-inputtext-sm" value={_entity?.reorderingPoint} onChange={(e) => setValByKey("reorderingPoint", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reorderingPoint"]) ? (
              <p className="m-0" key="error-reorderingPoint">
                {error["reorderingPoint"]}
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

export default connect(mapState, mapDispatch)(MemWarehousePartsCreateDialogComponent);
