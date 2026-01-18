import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalChecklistsPage from "../ExternalChecklistsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalChecklists page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalChecklistsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalChecklists-datatable")).toBeInTheDocument();
    expect(screen.getByRole("externalChecklists-add-button")).toBeInTheDocument();
});
