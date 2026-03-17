import React from "react";
import { render, screen } from "@testing-library/react";

import DisposalItemsEditDialogComponent from "../DisposalItemsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders disposalItems edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DisposalItemsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("disposalItems-edit-dialog-component")).toBeInTheDocument();
});
