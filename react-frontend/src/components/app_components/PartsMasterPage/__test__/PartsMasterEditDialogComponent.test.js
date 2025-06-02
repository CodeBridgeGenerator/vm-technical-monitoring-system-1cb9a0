import React from "react";
import { render, screen } from "@testing-library/react";

import PartsMasterEditDialogComponent from "../PartsMasterEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partsMaster edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartsMasterEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partsMaster-edit-dialog-component")).toBeInTheDocument();
});
