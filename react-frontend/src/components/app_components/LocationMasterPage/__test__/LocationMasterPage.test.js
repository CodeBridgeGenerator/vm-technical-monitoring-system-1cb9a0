import React from "react";
import { render, screen } from "@testing-library/react";

import LocationMasterPage from "../LocationMasterPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders locationMaster page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LocationMasterPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("locationMaster-datatable")).toBeInTheDocument();
    expect(screen.getByRole("locationMaster-add-button")).toBeInTheDocument();
});
