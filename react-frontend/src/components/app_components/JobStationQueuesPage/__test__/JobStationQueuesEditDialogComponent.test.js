import React from "react";
import { render, screen } from "@testing-library/react";

import JobStationQueuesEditDialogComponent from "../JobStationQueuesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobStationQueues edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobStationQueuesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobStationQueues-edit-dialog-component")).toBeInTheDocument();
});
