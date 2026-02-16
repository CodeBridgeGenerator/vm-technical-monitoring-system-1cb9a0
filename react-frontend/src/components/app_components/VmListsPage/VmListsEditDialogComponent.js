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

const VmListsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [vmCode, setVmCode] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount atlasMachines
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

    const onSave = async () => {
        let _data = {
            vmCode: _entity?.vmCode?._id,
vmLocation: _entity?.vmLocation,
locationDescription: _entity?.locationDescription,
        };

        setLoading(true);
        try {
            
        await client.service("vmLists").patch(_entity._id, _data);
        const eagerResult = await client
            .service("vmLists")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "vmCode",
                    service : "atlasMachines",
                    select:["vendingMachineCode"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info vmLists updated successfully" });
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

    const vmCodeOptions = vmCode.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit VM List" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="vmLists-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vmCode">VM Code:</label>
                <Dropdown id="vmCode" value={_entity?.vmCode?._id} optionLabel="name" optionValue="value" options={vmCodeOptions} onChange={(e) => setValByKey("vmCode", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vmCode"]) && (
              <p className="m-0" key="error-vmCode">
                {error["vmCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="vmLocation">VM Location:</label>
                <InputText id="vmLocation" className="w-full mb-3 p-inputtext-sm" value={_entity?.vmLocation} onChange={(e) => setValByKey("vmLocation", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["vmLocation"]) && (
              <p className="m-0" key="error-vmLocation">
                {error["vmLocation"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="locationDescription">LocationDescription:</label>
                <InputText id="locationDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.locationDescription} onChange={(e) => setValByKey("locationDescription", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["locationDescription"]) && (
              <p className="m-0" key="error-locationDescription">
                {error["locationDescription"]}
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

export default connect(mapState, mapDispatch)(VmListsCreateDialogComponent);
