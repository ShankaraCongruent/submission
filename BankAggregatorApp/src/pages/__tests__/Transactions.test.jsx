import React from "react";
import { render, screen, fireEvent, waitFor, act, within } from "@testing-library/react";
import Transactions from '../Transactions';
import axios from '../../api/Authapi';

jest.mock('../../api/Authapi');

describe("Transactions Component", () => {
  const mockTxns = [
    { transactionId: 1, accountId: 1, transactionType: "Deposit", amount: 1000, transactionDate: new Date().toISOString() },
    { transactionId: 2, accountId: 2, transactionType: "Withdraw", amount: 500, transactionDate: new Date().toISOString() },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockTxns });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders transactions table", async () => {
    await act(async () => render(<Transactions />));

    expect(screen.getByText(/Transaction History/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Deposit")).toBeInTheDocument();
      expect(screen.getByText("Withdraw")).toBeInTheDocument();
    });
  });

  test("opens transaction modal on View click", async () => {
    await act(async () => render(<Transactions />));

    const rows = await screen.findAllByRole("row");
    const firstRow = rows[1]; // skip header
    const viewBtn = within(firstRow).getByRole("button");

    await act(async () => fireEvent.click(viewBtn));

    expect(screen.getByText(/Transaction ID:/i)).toBeInTheDocument();
  });

  test("closes transaction modal", async () => {
    await act(async () => render(<Transactions />));

    const rows = await screen.findAllByRole("row");
    const firstRow = rows[1];
    const viewBtn = within(firstRow).getByRole("button");

    await act(async () => {
      fireEvent.click(viewBtn);
      fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    });

    await waitFor(() => {
      expect(screen.queryByText(/Transaction ID:/i)).not.toBeInTheDocument();
    });
  });
});
