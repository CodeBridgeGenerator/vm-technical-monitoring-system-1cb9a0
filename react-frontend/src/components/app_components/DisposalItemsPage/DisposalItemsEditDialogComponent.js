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

const DisposalItemsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [associatedNo, setAssociatedNo] = useState([])
const [part, setPart] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount disposalDetails
                    client
                        .service("disposalDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDisposalDetailsId } })
                        .then((res) => {
                            setAssociatedNo(res.data.map((e) => { return { name: e['associatedNumber'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "DisposalDetails", type: "error", message: error.message || "Failed get disposalDetails" });
                        });
                }, []);
 useEffect(() => {
                    //on mount partsMaster
                    client
                        .service("partsMaster")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePartsMasterId } })
                        .then((res) => {
                            setPart(res.data.map((e) => { return { name: e['description'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PartsMaster", type: "error", message: error.message || "Failed get partsMaster" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            associatedNo: _entity?.associatedNo?._id,
part: _entity?.part?._id,
quantity: _entity?.quantity,
        };

        setLoading(true);
        try {
            
        await client.service("disposalItems").patch(_entity._id, _data);
        const eagerResult = await client
            .service("disposalItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "associatedNo",
                    service : "disposalDetails",
                    select:["associatedNumber"]},{
                    path : "part",
                    service : "partsMaster",
                    select:["description"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info disposalItems updated successfully" });
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

    const associatedNoOptions = associatedNo.map((elem) => ({ name: elem.name, value: elem.value }));
const partOptions = part.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Disposal Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="disposalItems-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="associatedNo">AssociatedNo:</label>
                <Dropdown id="associatedNo" value={_entity?.associatedNo?._id} optionLabel="name" optionValue="value" options={associatedNoOptions} onChange={(e) => setValByKey("associatedNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["associatedNo"]) && (
              <p className="m-0" key="error-associatedNo">
                {error["associatedNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="part">Part Name:</label>
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

export default connect(mapState, mapDispatch)(DisposalItemsCreateDialogComponent);
