import React from "react";
import { render, screen } from "@testing-library/react";

import AtlasTicketsPage from "../AtlasTicketsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders atlasTickets page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AtlasTicketsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("atlasTickets-datatable")).toBeInTheDocument();
    expect(screen.getByRole("atlasTickets-add-button")).toBeInTheDocument();
});
