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

const SupervisorChecksCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [supervisorCheckListId, setSupervisorCheckListId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [supervisorCheckListId], setError);
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
            supervisorCheckListId: _entity?.supervisorCheckListId?._id,name: _entity?.name,description: _entity?.description,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("supervisorChecks").create(_data);
        const eagerResult = await client
            .service("supervisorChecks")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "supervisorCheckListId",
                    service : "externalChecklists",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Supervisor Checks updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Supervisor Checks" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount externalChecklists
                    client
                        .service("externalChecklists")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleExternalChecklistsId } })
                        .then((res) => {
                            setSupervisorCheckListId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "ExternalChecklists", type: "error", message: error.message || "Failed get externalChecklists" });
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

    const supervisorCheckListIdOptions = supervisorCheckListId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Supervisor Checks" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="supervisorChecks-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="supervisorCheckListId">Supervisor Check List Id:</label>
                <Dropdown id="supervisorCheckListId" value={_entity?.supervisorCheckListId?._id} optionLabel="name" optionValue="value" options={supervisorCheckListIdOptions} onChange={(e) => setValByKey("supervisorCheckListId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["supervisorCheckListId"]) ? (
              <p className="m-0" key="error-supervisorCheckListId">
                {error["supervisorCheckListId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) ? (
              <p className="m-0" key="error-description">
                {error["description"]}
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

export default connect(mapState, mapDispatch)(SupervisorChecksCreateDialogComponent);
