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

const DisposalDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [sourceWarehouse, setSourceWarehouse] = useState([])
const [partNumber, setPartNumber] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount warehouseMaster
                    client
                        .service("warehouseMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleWarehouseMasterId } })
                        .then((res) => {
                            setSourceWarehouse(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "WarehouseMaster", type: "error", message: error.message || "Failed get warehouseMaster" });
                        });
                }, []);
 useEffect(() => {
                    //on mount partsMaster
                    client
                        .service("partsMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePartsMasterId } })
                        .then((res) => {
                            setPartNumber(res.data.map((e) => { return { name: e['itemNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PartsMaster", type: "error", message: error.message || "Failed get partsMaster" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            sourceWarehouse: _entity?.sourceWarehouse?._id,
partNumber: _entity?.partNumber?._id,
quantity: _entity?.quantity,
associatedNumber: _entity?.associatedNumber,
affectiveDate: _entity?.affectiveDate,
        };

        setLoading(true);
        try {
            
        await client.service("disposalDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("disposalDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "sourceWarehouse",
                    service : "warehouseMaster",
                    select:["name"]},{
                    path : "partNumber",
                    service : "partsMaster",
                    select:["itemNo"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info disposalDetails updated successfully" });
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

    const sourceWarehouseOptions = sourceWarehouse.map((elem) => ({ name: elem.name, value: elem.value }));
const partNumberOptions = partNumber.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Disposal Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="disposalDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sourceWarehouse">Source Warehouse:</label>
                <Dropdown id="sourceWarehouse" value={_entity?.sourceWarehouse?._id} optionLabel="name" optionValue="value" options={sourceWarehouseOptions} onChange={(e) => setValByKey("sourceWarehouse", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sourceWarehouse"]) && (
              <p className="m-0" key="error-sourceWarehouse">
                {error["sourceWarehouse"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="partNumber">Part Number:</label>
                <Dropdown id="partNumber" value={_entity?.partNumber?._id} optionLabel="name" optionValue="value" options={partNumberOptions} onChange={(e) => setValByKey("partNumber", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["partNumber"]) && (
              <p className="m-0" key="error-partNumber">
                {error["partNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantity">Quantity:</label>
                <InputNumber id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) && (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="associatedNumber">Associated Number:</label>
                <InputText id="associatedNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.associatedNumber} onChange={(e) => setValByKey("associatedNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["associatedNumber"]) && (
              <p className="m-0" key="error-associatedNumber">
                {error["associatedNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="affectiveDate">Affective Date:</label>
                <Calendar id="affectiveDate" value={_entity?.affectiveDate ? new Date(_entity?.affectiveDate) : null} onChange={ (e) => setValByKey("affectiveDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["affectiveDate"]) && (
              <p className="m-0" key="error-affectiveDate">
                {error["affectiveDate"]}
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

export default connect(mapState, mapDispatch)(DisposalDetailsCreateDialogComponent);
