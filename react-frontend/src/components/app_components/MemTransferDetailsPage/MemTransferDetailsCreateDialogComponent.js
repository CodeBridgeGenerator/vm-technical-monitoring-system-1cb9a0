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

const MemTransferDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [sourceWarehouse, setSourceWarehouse] = useState([])
const [destinationWarehouse, setDestinationWarehouse] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [sourceWarehouse,destinationWarehouse], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.transferStatus)) {
                error["transferStatus"] = `Transfer Status field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.deliveryAddress)) {
                error["deliveryAddress"] = `Delivery Address field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.transferDocuments)) {
                error["transferDocuments"] = `Transfer Documents field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            sourceWarehouse: _entity?.sourceWarehouse?._id,destinationWarehouse: _entity?.destinationWarehouse?._id,transferDate: _entity?.transferDate,transferStatus: _entity?.transferStatus,deliveryAddress: _entity?.deliveryAddress,transferDocuments: _entity?.transferDocuments,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("memTransferDetails").create(_data);
        const eagerResult = await client
            .service("memTransferDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "sourceWarehouse",
                    service : "memWarehouses",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Mem Transfer Details updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Mem Transfer Details" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount memWarehouses
                    client
                        .service("memWarehouses")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMemWarehousesId } })
                        .then((res) => {
                            setSourceWarehouse(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const sourceWarehouseOptions = sourceWarehouse.map((elem) => ({ name: elem.name, value: elem.value }));
const destinationWarehouseOptions = destinationWarehouse.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Mem Transfer Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="memTransferDetails-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sourceWarehouse">Source Warehouse:</label>
                <Dropdown id="sourceWarehouse" value={_entity?.sourceWarehouse?._id} optionLabel="name" optionValue="value" options={sourceWarehouseOptions} onChange={(e) => setValByKey("sourceWarehouse", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sourceWarehouse"]) ? (
              <p className="m-0" key="error-sourceWarehouse">
                {error["sourceWarehouse"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="destinationWarehouse">Destination Warehouse:</label>
                <Dropdown id="destinationWarehouse" value={_entity?.destinationWarehouse?._id} optionLabel="name" optionValue="value" options={destinationWarehouseOptions} onChange={(e) => setValByKey("destinationWarehouse", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["destinationWarehouse"]) ? (
              <p className="m-0" key="error-destinationWarehouse">
                {error["destinationWarehouse"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transferDate">Transfer Date:</label>
                <Calendar id="transferDate"  value={_entity?.transferDate ? new Date(_entity?.transferDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("transferDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transferDate"]) ? (
              <p className="m-0" key="error-transferDate">
                {error["transferDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transferStatus">Transfer Status:</label>
                <InputText id="transferStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.transferStatus} onChange={(e) => setValByKey("transferStatus", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transferStatus"]) ? (
              <p className="m-0" key="error-transferStatus">
                {error["transferStatus"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="deliveryAddress">Delivery Address:</label>
                <InputText id="deliveryAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.deliveryAddress} onChange={(e) => setValByKey("deliveryAddress", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["deliveryAddress"]) ? (
              <p className="m-0" key="error-deliveryAddress">
                {error["deliveryAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transferDocuments">Transfer Documents:</label>
                <InputText id="transferDocuments" className="w-full mb-3 p-inputtext-sm" value={_entity?.transferDocuments} onChange={(e) => setValByKey("transferDocuments", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transferDocuments"]) ? (
              <p className="m-0" key="error-transferDocuments">
                {error["transferDocuments"]}
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

export default connect(mapState, mapDispatch)(MemTransferDetailsCreateDialogComponent);
