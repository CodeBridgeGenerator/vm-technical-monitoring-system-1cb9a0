import React from "react";
import { render, screen } from "@testing-library/react";

import AtlasTicketsCreateDialogComponent from "../AtlasTicketsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders atlasTickets create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AtlasTicketsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("atlasTickets-create-dialog-component")).toBeInTheDocument();
});
