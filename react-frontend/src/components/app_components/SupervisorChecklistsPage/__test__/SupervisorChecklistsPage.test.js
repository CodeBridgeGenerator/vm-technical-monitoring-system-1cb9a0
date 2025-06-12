import React from "react";
import { render, screen } from "@testing-library/react";

import SupervisorChecklistsPage from "../SupervisorChecklistsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders supervisorChecklists page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SupervisorChecklistsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("supervisorChecklists-datatable")).toBeInTheDocument();
    expect(screen.getByRole("supervisorChecklists-add-button")).toBeInTheDocument();
});
