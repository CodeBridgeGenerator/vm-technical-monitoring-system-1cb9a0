import React from "react";
import { render, screen } from "@testing-library/react";

import PartRequestDetailsCreateDialogComponent from "../PartRequestDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partRequestDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartRequestDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partRequestDetails-create-dialog-component")).toBeInTheDocument();
});
