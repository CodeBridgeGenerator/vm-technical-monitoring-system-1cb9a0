import React from "react";
import { render, screen } from "@testing-library/react";

import JobStationQueuesCreateDialogComponent from "../JobStationQueuesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobStationQueues create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobStationQueuesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobStationQueues-create-dialog-component")).toBeInTheDocument();
});
