import React from "react";
import { render, screen } from "@testing-library/react";

import PartsMasterRawCreateDialogComponent from "../PartsMasterRawCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partsMasterRaw create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartsMasterRawCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partsMasterRaw-create-dialog-component")).toBeInTheDocument();
});
