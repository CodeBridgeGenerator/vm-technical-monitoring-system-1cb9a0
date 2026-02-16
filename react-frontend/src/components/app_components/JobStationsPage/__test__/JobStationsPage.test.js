import React from "react";
import { render, screen } from "@testing-library/react";

import JobStationsPage from "../JobStationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders jobStations page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <JobStationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("jobStations-datatable")).toBeInTheDocument();
    expect(screen.getByRole("jobStations-add-button")).toBeInTheDocument();
});
