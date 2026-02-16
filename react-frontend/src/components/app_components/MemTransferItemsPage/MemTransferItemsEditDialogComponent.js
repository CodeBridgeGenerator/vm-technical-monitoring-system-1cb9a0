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

const MemTransferItemsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [transferDate, setTransferDate] = useState([])
const [part, setPart] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount memTransferDetails
                    client
                        .service("memTransferDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMemTransferDetailsId } })
                        .then((res) => {
                            setTransferDate(res.data.map((e) => { return { name: e['transferDate'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MemTransferDetails", type: "error", message: error.message || "Failed get memTransferDetails" });
                        });
                }, []);
 useEffect(() => {
                    //on mount memWarehouseParts
                    client
                        .service("memWarehouseParts")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMemWarehousePartsId } })
                        .then((res) => {
                            setPart(res.data.map((e) => { return { name: e['part'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MemWarehouseParts", type: "error", message: error.message || "Failed get memWarehouseParts" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            transferDate: _entity?.transferDate?._id,
part: _entity?.part?._id,
quantity: _entity?.quantity,
        };

        setLoading(true);
        try {
            
        await client.service("memTransferItems").patch(_entity._id, _data);
        const eagerResult = await client
            .service("memTransferItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "transferDate",
                    service : "memTransferDetails",
                    select:["transferDate"]},{
                    path : "part",
                    service : "memWarehouseParts",
                    select:["part"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info memTransferItems updated successfully" });
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

    const transferDateOptions = transferDate.map((elem) => ({ name: elem.name, value: elem.value }));
const partOptions = part.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Mem Transfer Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="memTransferItems-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transferDate">Transfer Date:</label>
                <Dropdown id="transferDate" value={_entity?.transferDate?._id} optionLabel="name" optionValue="value" options={transferDateOptions} onChange={(e) => setValByKey("transferDate", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transferDate"]) && (
              <p className="m-0" key="error-transferDate">
                {error["transferDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="part">Part:</label>
                <Dropdown id="part" value={_entity?.part?._id} optionLabel="name" optionValue="value" options={partOptions} onChange={(e) => setValByKey("part", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["part"]) && (
              <p className="m-0" key="error-part">
                {error["part"]}
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

export default connect(mapState, mapDispatch)(MemTransferItemsCreateDialogComponent);
