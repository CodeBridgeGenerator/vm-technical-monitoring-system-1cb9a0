import React from "react";
import { render, screen } from "@testing-library/react";

import MemTransferItemsEditDialogComponent from "../MemTransferItemsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memTransferItems edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemTransferItemsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memTransferItems-edit-dialog-component")).toBeInTheDocument();
});
