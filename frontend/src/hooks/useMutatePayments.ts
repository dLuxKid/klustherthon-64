import { useState } from "react";

import { toast } from "sonner";

import { useAuthContext } from "../context/useAuthContext";
import { useDataContext } from "../context/useFetchDataContext";

import { paymentsUrl } from "../utils/urls";
import { paymentType } from "../utils/types";

export default function useMutatePayments() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchPayments } = useDataContext();

  const createPayments = async (
    state: Omit<paymentType, "_id" | "__v">,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);

    if (!state.amount || !state.notes || !state.name) {
      setLoading(false);
      return toast.error("Please fill all values");
    }

    try {
      const response = await fetch(`${paymentsUrl}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: state.name,
          notes: state.notes,
          amount: state.amount,
          businessId: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchPayments();
        setLoading(false);
        setOpenModal(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error creating invoice");
      setLoading(false);
    }
  };

  const editPayments = async (
    id: string,
    state: Omit<paymentType, "_id" | "__v">,
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);

    if (!state.amount || !state.notes || !state.name) {
      setLoading(false);
      return toast.error("Please fill all values");
    }

    try {
      const response = await fetch(paymentsUrl + `/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: state.name,
          notes: state.notes,
          amount: state.amount,
          businessId: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchPayments();
        setLoading(false);
        setOpenEditModal(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error updating payment");
      setLoading(false);
    }
    setLoading(false);
  };

  const deletePayment = async (id: string) => {
    try {
      const res = await fetch(`${paymentsUrl}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          paymentId: id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchPayments();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { editPayments, createPayments, deletePayment, loading };
}
