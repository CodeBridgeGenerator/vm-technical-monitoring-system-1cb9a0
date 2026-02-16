import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingUsedPartsQuotationsCreateDialogComponent from "../IncomingUsedPartsQuotationsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingUsedPartsQuotations create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingUsedPartsQuotationsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingUsedPartsQuotations-create-dialog-component")).toBeInTheDocument();
});
