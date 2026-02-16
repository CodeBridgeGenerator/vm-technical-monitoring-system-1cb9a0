import React from "react";
import { render, screen } from "@testing-library/react";

import MemTransferItemsCreateDialogComponent from "../MemTransferItemsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memTransferItems create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemTransferItemsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memTransferItems-create-dialog-component")).toBeInTheDocument();
});
