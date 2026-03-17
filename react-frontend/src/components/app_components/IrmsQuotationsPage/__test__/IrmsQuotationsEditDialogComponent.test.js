import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsQuotationsEditDialogComponent from "../IrmsQuotationsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsQuotations edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsQuotationsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsQuotations-edit-dialog-component")).toBeInTheDocument();
});
