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

const IrmsDeliveryOrdersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [purchaseOrder, setPurchaseOrder] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount customerPurchaseOrders
                    client
                        .service("customerPurchaseOrders")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCustomerPurchaseOrdersId } })
                        .then((res) => {
                            setPurchaseOrder(res.data.map((e) => { return { name: e['purchaseOrderId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CustomerPurchaseOrders", type: "error", message: error.message || "Failed get customerPurchaseOrders" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            purchaseOrder: _entity?.purchaseOrder?._id,
deliveryOrderId: _entity?.deliveryOrderId,
        };

        setLoading(true);
        try {
            
        await client.service("irmsDeliveryOrders").patch(_entity._id, _data);
        const eagerResult = await client
            .service("irmsDeliveryOrders")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "purchaseOrder",
                    service : "customerPurchaseOrders",
                    select:["purchaseOrderId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info irmsDeliveryOrders updated successfully" });
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

    const purchaseOrderOptions = purchaseOrder.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Delivery Orders" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="irmsDeliveryOrders-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchaseOrder">PurchaseOrder:</label>
                <Dropdown id="purchaseOrder" value={_entity?.purchaseOrder?._id} optionLabel="name" optionValue="value" options={purchaseOrderOptions} onChange={(e) => setValByKey("purchaseOrder", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseOrder"]) && (
              <p className="m-0" key="error-purchaseOrder">
                {error["purchaseOrder"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="deliveryOrderId">Delivery Order Id:</label>
                <InputText id="deliveryOrderId" className="w-full mb-3 p-inputtext-sm" value={_entity?.deliveryOrderId} onChange={(e) => setValByKey("deliveryOrderId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["deliveryOrderId"]) && (
              <p className="m-0" key="error-deliveryOrderId">
                {error["deliveryOrderId"]}
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

export default connect(mapState, mapDispatch)(IrmsDeliveryOrdersCreateDialogComponent);
