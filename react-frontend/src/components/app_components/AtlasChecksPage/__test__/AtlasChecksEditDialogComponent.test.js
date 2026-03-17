import React from "react";
import { render, screen } from "@testing-library/react";

import AtlasChecksEditDialogComponent from "../AtlasChecksEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders atlasChecks edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AtlasChecksEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("atlasChecks-edit-dialog-component")).toBeInTheDocument();
});
