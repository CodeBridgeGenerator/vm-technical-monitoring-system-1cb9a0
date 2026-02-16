import React from "react";
import { render, screen } from "@testing-library/react";

import MachineMasterRawPage from "../MachineMasterRawPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders machineMasterRaw page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MachineMasterRawPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("machineMasterRaw-datatable")).toBeInTheDocument();
    expect(screen.getByRole("machineMasterRaw-add-button")).toBeInTheDocument();
});
