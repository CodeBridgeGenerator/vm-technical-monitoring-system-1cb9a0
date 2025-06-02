import React from "react";
import { render, screen } from "@testing-library/react";

import TechnicianChecklistsPage from "../TechnicianChecklistsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders technicianChecklists page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TechnicianChecklistsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("technicianChecklists-datatable")).toBeInTheDocument();
    expect(screen.getByRole("technicianChecklists-add-button")).toBeInTheDocument();
});
