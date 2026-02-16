import React from "react";
import { render, screen } from "@testing-library/react";

import JobStationQueuesPage from "../JobStationQueuesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobStationQueues page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobStationQueuesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobStationQueues-datatable")).toBeInTheDocument();
    expect(screen.getByRole("jobStationQueues-add-button")).toBeInTheDocument();
});
