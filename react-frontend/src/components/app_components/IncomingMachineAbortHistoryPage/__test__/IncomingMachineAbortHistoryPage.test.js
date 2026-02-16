import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineAbortHistoryPage from "../IncomingMachineAbortHistoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineAbortHistory page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineAbortHistoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineAbortHistory-datatable")).toBeInTheDocument();
    expect(screen.getByRole("incomingMachineAbortHistory-add-button")).toBeInTheDocument();
});
