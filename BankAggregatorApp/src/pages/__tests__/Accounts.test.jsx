import React from "react";
import { render, screen, fireEvent, waitFor, act, within } from "@testing-library/react";
import Accounts from '../Accounts';
import axios from '../../api/Authapi';

jest.mock('../../api/Authapi');

describe("Accounts Component", () => {
  const mockAccounts = [
    { accountId: 1, balance: 1000, limitAmount: 5000, branchId: 101, currencyId: "INR" },
    { accountId: 2, balance: 2000, limitAmount: 10000, branchId: 102, currencyId: "USD" },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockAccounts });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders accounts table", async () => {
    await act(async () => render(<Accounts />));

    expect(screen.getByText(/Your Accounts/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("1000")).toBeInTheDocument();
      expect(screen.getByText("2000")).toBeInTheDocument();
    });
  });

  test("opens Deposit/Withdraw modal when button clicked", async () => {
    await act(async () => render(<Accounts />));

    const rows = await screen.findAllByRole("row");
    const firstRow = rows[1]; // skip header row
    const depositBtn = within(firstRow).getAllByRole("button")[0];

    await act(async () => fireEvent.click(depositBtn));

    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
  });

  test("closes modal when Cancel clicked", async () => {
    await act(async () => render(<Accounts />));

    const rows = await screen.findAllByRole("row");
    const firstRow = rows[1];
    const depositBtn = within(firstRow).getAllByRole("button")[0];

    await act(async () => {
      fireEvent.click(depositBtn);
      fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    });

    await waitFor(() => {
      expect(screen.queryByLabelText(/Amount/i)).not.toBeInTheDocument();
    });
  });

  test("close account button calls API and removes account", async () => {
    window.confirm = jest.fn(() => true);
    axios.delete.mockResolvedValue({});

    await act(async () => render(<Accounts />));

    const rows = await screen.findAllByRole("row");
    const firstRow = rows[1];
    const closeBtn = within(firstRow).getAllByRole("button")[1];

    await act(async () => fireEvent.click(closeBtn));

    await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));
  });
});
