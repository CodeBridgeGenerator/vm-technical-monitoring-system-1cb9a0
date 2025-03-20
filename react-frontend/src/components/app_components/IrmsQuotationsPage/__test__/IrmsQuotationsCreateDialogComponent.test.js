import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsQuotationsCreateDialogComponent from "../IrmsQuotationsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsQuotations create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsQuotationsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsQuotations-create-dialog-component")).toBeInTheDocument();
});
