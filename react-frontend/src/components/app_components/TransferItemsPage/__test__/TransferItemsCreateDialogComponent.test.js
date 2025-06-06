import React from "react";
import { render, screen } from "@testing-library/react";

import TransferItemsCreateDialogComponent from "../TransferItemsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders transferItems create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TransferItemsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("transferItems-create-dialog-component")).toBeInTheDocument();
});
