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
import { Editor } from 'primereact/editor';


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

const QuotationDeliveryDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [quotationIndex, setQuotationIndex] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount irmsQuotations
                    client
                        .service("irmsQuotations")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleIrmsQuotationsId } })
                        .then((res) => {
                            setQuotationIndex(res.data.map((e) => { return { name: e['quotationIndex'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "IrmsQuotations", type: "error", message: error.message || "Failed get irmsQuotations" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            quotationIndex: _entity?.quotationIndex?._id,
description: _entity?.description,
        };

        setLoading(true);
        try {
            
        await client.service("quotationDeliveryDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("quotationDeliveryDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "quotationIndex",
                    service : "irmsQuotations",
                    select:["quotationIndex"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info quotationDeliveryDetails updated successfully" });
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

    const quotationIndexOptions = quotationIndex.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit QuotationDeliveryDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="quotationDeliveryDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quotationIndex">Quotation Index:</label>
                <Dropdown id="quotationIndex" value={_entity?.quotationIndex?._id} optionLabel="name" optionValue="value" options={quotationIndexOptions} onChange={(e) => setValByKey("quotationIndex", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quotationIndex"]) && (
              <p className="m-0" key="error-quotationIndex">
                {error["quotationIndex"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="description">Description:</label>
                    <Editor id="description" value={_entity?.description} onTextChange={(e) => setValByKey("description", e.htmlValue)} style={{ height: '320px' }} />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["description"]) && (
                  <p className="m-0" key="error-description">
                    {error["description"]}
                  </p>
                ) }
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

export default connect(mapState, mapDispatch)(QuotationDeliveryDetailsCreateDialogComponent);
