import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import WarantyPeriodDetailsPage from "./WarantyPeriodDetailsPage";

const WarantyPeriodDetailProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <WarantyPeriodDetailsPage />
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(WarantyPeriodDetailProjectLayoutPage);