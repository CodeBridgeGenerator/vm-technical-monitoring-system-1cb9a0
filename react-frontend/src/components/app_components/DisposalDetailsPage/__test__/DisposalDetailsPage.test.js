import React from "react";
import { render, screen } from "@testing-library/react";

import DisposalDetailsPage from "../DisposalDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders disposalDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DisposalDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("disposalDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("disposalDetails-add-button")).toBeInTheDocument();
});
