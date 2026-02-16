import React from "react";
import { render, screen } from "@testing-library/react";

import VmListsPage from "../VmListsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vmLists page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VmListsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("vmLists-datatable")).toBeInTheDocument();
    expect(screen.getByRole("vmLists-add-button")).toBeInTheDocument();
});
