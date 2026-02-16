import React from "react";
import { render, screen } from "@testing-library/react";

import DisposalItemsPage from "../DisposalItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders disposalItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DisposalItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("disposalItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("disposalItems-add-button")).toBeInTheDocument();
});
