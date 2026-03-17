import React from "react";
import { render, screen } from "@testing-library/react";

import AtlasChecklistsCreateDialogComponent from "../AtlasChecklistsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders atlasChecklists create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AtlasChecklistsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("atlasChecklists-create-dialog-component")).toBeInTheDocument();
});
