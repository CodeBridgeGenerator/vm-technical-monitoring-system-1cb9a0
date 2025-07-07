import React from "react";
import { render, screen } from "@testing-library/react";

import AtlasMachinesCreateDialogComponent from "../AtlasMachinesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders atlasMachines create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AtlasMachinesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("atlasMachines-create-dialog-component")).toBeInTheDocument();
});
