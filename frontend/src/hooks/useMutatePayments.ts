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
      const response = await fetch(paymentsUrl + "/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name,
          notes: state.notes,
          amount: state.amount,
          businessId: user.id,
        }),
      });

      if (response.ok) {
        toast.success("Payment successfully created");
        fetchPayments();
        setLoading(false);
        setOpenModal(false);
      } else {
        console.error("Failed to send data to the server");
        toast.error("Error creating payment");
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
        toast.success("Payment successfully updated");
        fetchPayments();
        setLoading(false);
        setOpenEditModal(false);
      } else {
        console.error("Failed to send data to the server");
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

  return { editPayments, createPayments, loading };
}
