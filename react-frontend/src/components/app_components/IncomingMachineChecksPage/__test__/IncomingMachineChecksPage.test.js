import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineChecksPage from "../IncomingMachineChecksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineChecks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineChecksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineChecks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("incomingMachineChecks-add-button")).toBeInTheDocument();
});
