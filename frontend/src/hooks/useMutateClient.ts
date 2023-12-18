import { useState } from "react";

import { toast } from "sonner";

import { useAuthContext } from "../context/useAuthContext";

import { clientsType } from "../utils/types";
import { clientUrl } from "../utils/urls";
import useFetchData from "./useFetchData";

export default function useMutateClient() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchClients } = useFetchData();
  const { mutate } = fetchClients();

  const createClient = async (
    state: Omit<clientsType, "_id">,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);

    if (!state.email || !state.address || !state.name || !state.phoneNumber) {
      setLoading(false);
      return toast.error("Please fill all values");
    }

    try {
      const response = await fetch(clientUrl + "/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          phoneNumber: state.phoneNumber,
          address: state.address,
          businessId: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setOpenModal(false);
        mutate();
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const editClient = async (
    id: string,
    state: Omit<clientsType, "_id">,
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);

    if (!state.email || !state.address || !state.name || !state.phoneNumber) {
      setLoading(false);
      return toast.error("Please fill all values");
    }

    try {
      const response = await fetch(clientUrl + `/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          phoneNumber: state.phoneNumber,
          address: state.address,
          businessId: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        mutate();
        setLoading(false);
        setOpenEditModal(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return { loading, createClient, editClient };
}
