import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import SupervisorChecksPage from "./SupervisorChecksPage";

const SupervisorCheckProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <SupervisorChecksPage />
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

export default connect(mapState, mapDispatch)(SupervisorCheckProjectLayoutPage);