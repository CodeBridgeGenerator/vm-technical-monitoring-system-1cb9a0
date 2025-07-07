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

const IncomingUsedPartsQuotationsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [quotation, setQuotation] = useState([])
const [incomingMachineTicket, setIncomingMachineTicket] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount irmsQuotations
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
 useEffect(() => {
                    //on mount incomingMachineTickets
                    client
                        .service("incomingMachineTickets")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleIncomingMachineTicketsId } })
                        .then((res) => {
                            setIncomingMachineTicket(res.data.map((e) => { return { name: e['machineId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "IncomingMachineTickets", type: "error", message: error.message || "Failed get incomingMachineTickets" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            quotation: _entity?.quotation?._id,
incomingMachineTicket: _entity?.incomingMachineTicket?._id,
        };

        setLoading(true);
        try {
            
        await client.service("incomingUsedPartsQuotations").patch(_entity._id, _data);
        const eagerResult = await client
            .service("incomingUsedPartsQuotations")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "quotation",
                    service : "irmsQuotations",
                    select:["quotationIndex"]},{
                    path : "incomingMachineTicket",
                    service : "incomingMachineTickets",
                    select:["machineId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info incomingUsedPartsQuotations updated successfully" });
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

    const quotationOptions = quotation.map((elem) => ({ name: elem.name, value: elem.value }));
const incomingMachineTicketOptions = incomingMachineTicket.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Incoming Used Parts Quotations" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="incomingUsedPartsQuotations-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quotation">Quotation:</label>
                <Dropdown id="quotation" value={_entity?.quotation?._id} optionLabel="name" optionValue="value" options={quotationOptions} onChange={(e) => setValByKey("quotation", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quotation"]) && (
              <p className="m-0" key="error-quotation">
                {error["quotation"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="incomingMachineTicket">IncomingMachineTicket:</label>
                <Dropdown id="incomingMachineTicket" value={_entity?.incomingMachineTicket?._id} optionLabel="name" optionValue="value" options={incomingMachineTicketOptions} onChange={(e) => setValByKey("incomingMachineTicket", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["incomingMachineTicket"]) && (
              <p className="m-0" key="error-incomingMachineTicket">
                {error["incomingMachineTicket"]}
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

export default connect(mapState, mapDispatch)(IncomingUsedPartsQuotationsCreateDialogComponent);
