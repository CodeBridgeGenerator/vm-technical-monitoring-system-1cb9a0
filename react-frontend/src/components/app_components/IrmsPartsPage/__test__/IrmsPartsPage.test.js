import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsPartsPage from "../IrmsPartsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsParts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsPartsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsParts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("irmsParts-add-button")).toBeInTheDocument();
});
