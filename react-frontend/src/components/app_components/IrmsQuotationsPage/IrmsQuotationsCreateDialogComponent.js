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

const IrmsQuotationsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [salesOrder, setSalesOrder] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [salesOrder], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.quotationIndex)) {
                error["quotationIndex"] = `Quotation Index field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            salesOrder: _entity?.salesOrder?._id,validDate: _entity?.validDate,quotationIndex: _entity?.quotationIndex,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("irmsQuotations").create(_data);
        const eagerResult = await client
            .service("irmsQuotations")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "salesOrder",
                    service : "customerSalesOrders",
                    select:["salesOrderId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info IRMS Quotations updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in IRMS Quotations" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount customerSalesOrders
                    client
                        .service("customerSalesOrders")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCustomerSalesOrdersId } })
                        .then((res) => {
                            setSalesOrder(res.data.map((e) => { return { name: e['salesOrderId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CustomerSalesOrders", type: "error", message: error.message || "Failed get customerSalesOrders" });
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

    const salesOrderOptions = salesOrder.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create IRMS Quotations" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="irmsQuotations-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="salesOrder">Sales Order:</label>
                <Dropdown id="salesOrder" value={_entity?.salesOrder?._id} optionLabel="name" optionValue="value" options={salesOrderOptions} onChange={(e) => setValByKey("salesOrder", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["salesOrder"]) ? (
              <p className="m-0" key="error-salesOrder">
                {error["salesOrder"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="validDate">Valid Date:</label>
                <Calendar id="validDate"  value={_entity?.validDate ? new Date(_entity?.validDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("validDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["validDate"]) ? (
              <p className="m-0" key="error-validDate">
                {error["validDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quotationIndex">Quotation Index:</label>
                <InputText id="quotationIndex" className="w-full mb-3 p-inputtext-sm" value={_entity?.quotationIndex} onChange={(e) => setValByKey("quotationIndex", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quotationIndex"]) ? (
              <p className="m-0" key="error-quotationIndex">
                {error["quotationIndex"]}
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

export default connect(mapState, mapDispatch)(IrmsQuotationsCreateDialogComponent);
