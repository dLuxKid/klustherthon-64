import { useState } from "react";

import { toast } from "sonner";

import { useAuthContext } from "../context/useAuthContext";
import { useDataContext } from "../context/useFetchDataContext";

import { invoiceUrl } from "../utils/urls";
import { invoiceType } from "../utils/types";

type editInvoiceType = {
  name: string;
  email: string;
  amount: string;
  paymentStatus: string;
  paymentType: number;
  paymentInterval: number;
  installmentalPaymentAmount: number;
};

export default function useMutateInvoice() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchInvoices } = useDataContext();

  const createInvoice = async (
    state: editInvoiceType,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);

    if (
      !state.amount ||
      !state.email ||
      !state.name ||
      !state.paymentStatus ||
      !state.paymentType
    ) {
      setLoading(false);
      return toast.error("Please fill all values");
    }

    try {
      const response = await fetch(invoiceUrl + "/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title: state.name,
          email: state.email,
          amount: Number(state.amount),
          paymentStatus: state.paymentStatus === "paid" ? true : false,
          paymentType: state.paymentType,
          installmentalAmount: Number(state.installmentalPaymentAmount),
          paymentInterval: Number(state.paymentInterval),
          staff: user.bid,
          business: user.id,
        }),
      });

      if (response.ok) {
        toast.success("invoice successfully created");
        setOpenModal(false);
        fetchInvoices();
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Error creating invoice");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error creating invoice");
      setLoading(false);
    }
  };

  const editInvoice = async (
    state: Pick<editInvoiceType, "amount" | "email" | "name" | "paymentStatus">,
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    invoice: invoiceType
  ) => {
    setLoading(true);
    if (!state.amount || !state.email || !state.name || !state.paymentStatus) {
      setLoading(false);
      return toast.error("Please fill all values");
    }

    try {
      const response = await fetch(`${invoiceUrl}/update/${invoice._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id: invoice._id,
          title: state.name,
          clientid: invoice.client,
          email: invoice.clientEmail,
          amount: Number(state.amount),
          paymentStatus: state.paymentStatus === "paid" ? true : false,
          paymentType: invoice.paymentType,
          installmentalAmount: Number(invoice.installmentAmount),
          paymentInterval: Number(invoice.paymentInterval),
          staff: user.bid,
          business: user.id,
        }),
      });

      if (response.ok) {
        toast.success("invoice successfully updated");
        setOpenEditModal(false);
        fetchInvoices();
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Error updating invoice");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error updating invoice");
      setLoading(false);
    }
  };

  return { createInvoice, editInvoice, loading };
}
