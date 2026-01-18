import React from "react";
import { render, screen } from "@testing-library/react";

import PartRequestDetailsPage from "../PartRequestDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partRequestDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartRequestDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partRequestDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("partRequestDetails-add-button")).toBeInTheDocument();
});
