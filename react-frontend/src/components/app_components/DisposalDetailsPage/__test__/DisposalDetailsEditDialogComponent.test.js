import React from "react";
import { render, screen } from "@testing-library/react";

import DisposalDetailsEditDialogComponent from "../DisposalDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders disposalDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DisposalDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("disposalDetails-edit-dialog-component")).toBeInTheDocument();
});
