import React from "react";
import { render, screen } from "@testing-library/react";

import PartRequestDetailsEditDialogComponent from "../PartRequestDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partRequestDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartRequestDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partRequestDetails-edit-dialog-component")).toBeInTheDocument();
});
