import React from "react";
import { render, screen } from "@testing-library/react";

import OperationCentresPage from "../OperationCentresPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders operationCentres page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OperationCentresPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("operationCentres-datatable")).toBeInTheDocument();
    expect(screen.getByRole("operationCentres-add-button")).toBeInTheDocument();
});
