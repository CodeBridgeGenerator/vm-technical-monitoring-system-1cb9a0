import React from "react";
import { render, screen } from "@testing-library/react";

import SampleDetailsPage from "../SampleDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders sampleDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SampleDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sampleDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("sampleDetails-add-button")).toBeInTheDocument();
});
