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

const CustomerPurchaseOrdersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [quotation, setQuotation] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [quotation], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.purchaseOrderId)) {
                error["purchaseOrderId"] = `PurchaseOrderId field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            quotation: _entity?.quotation?._id,purchaseOrderDate: _entity?.purchaseOrderDate,deliveryDate: _entity?.deliveryDate,purchaseOrderId: _entity?.purchaseOrderId,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("customerPurchaseOrders").create(_data);
        const eagerResult = await client
            .service("customerPurchaseOrders")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "quotation",
                    service : "irmsQuotations",
                    select:["quotationIndex"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Purchase Orders updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Purchase Orders" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount irmsQuotations
                    client
                        .service("irmsQuotations")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleIrmsQuotationsId } })
                        .then((res) => {
                            setQuotation(res.data.map((e) => { return { name: e['quotationIndex'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "IrmsQuotations", type: "error", message: error.message || "Failed get irmsQuotations" });
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

    const quotationOptions = quotation.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Purchase Orders" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="customerPurchaseOrders-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quotation">Quotation:</label>
                <Dropdown id="quotation" value={_entity?.quotation?._id} optionLabel="name" optionValue="value" options={quotationOptions} onChange={(e) => setValByKey("quotation", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quotation"]) ? (
              <p className="m-0" key="error-quotation">
                {error["quotation"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchaseOrderDate">Purchase Order Date:</label>
                <Calendar id="purchaseOrderDate"  value={_entity?.purchaseOrderDate ? new Date(_entity?.purchaseOrderDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("purchaseOrderDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseOrderDate"]) ? (
              <p className="m-0" key="error-purchaseOrderDate">
                {error["purchaseOrderDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="deliveryDate">Delivery Date:</label>
                <Calendar id="deliveryDate"  value={_entity?.deliveryDate ? new Date(_entity?.deliveryDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("deliveryDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["deliveryDate"]) ? (
              <p className="m-0" key="error-deliveryDate">
                {error["deliveryDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="purchaseOrderId">PurchaseOrderId:</label>
                <InputText id="purchaseOrderId" className="w-full mb-3 p-inputtext-sm" value={_entity?.purchaseOrderId} onChange={(e) => setValByKey("purchaseOrderId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["purchaseOrderId"]) ? (
              <p className="m-0" key="error-purchaseOrderId">
                {error["purchaseOrderId"]}
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

export default connect(mapState, mapDispatch)(CustomerPurchaseOrdersCreateDialogComponent);
