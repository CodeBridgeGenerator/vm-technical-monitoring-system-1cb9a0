import React from "react";
import { render, screen } from "@testing-library/react";

import TransferDetailsEditDialogComponent from "../TransferDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders transferDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TransferDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("transferDetails-edit-dialog-component")).toBeInTheDocument();
});
