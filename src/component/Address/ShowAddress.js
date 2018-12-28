import React, { Fragment } from "react";
import { PropTypes } from "prop-types";

const ShowAddress = ({ address }) => {
  return (
    <Fragment>
      <div className="fields">
        <div className="field">
          <h4>Name</h4>
        </div>
        <div className="field">{address.name}</div>
      </div>
      <div className="fields">
        <div className="field">
          <h4>Address Line 1</h4>
        </div>
        <div className="field">{address.address1}</div>
      </div>
      <div className="fields">
        <div className="field">
          <h4>Address Line 2</h4>
        </div>
        <div className="field">{address.address2}</div>
      </div>
      <div className="fields">
        <div className="field">
          <h4>City</h4>
        </div>
        <div className="field">{address.city}</div>
      </div>
      <div className="fields">
        <div className="field">
          <h4>State</h4>
        </div>
        <div className="field">{address.state}</div>
      </div>
      <div className="fields">
        <div className="field">
          <h4>Country</h4>
        </div>
        <div className="field">{address.country}</div>
      </div>
      <div className="fields">
        <div className="field">
          <h4>Pincode</h4>
        </div>
        <div className="field">{address.pin}</div>
      </div>
    </Fragment>
  );
};

ShowAddress.propTypes = {
  address: PropTypes.object.isRequired
};
export default ShowAddress;
