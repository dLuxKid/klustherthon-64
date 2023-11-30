import { useState } from "react";

import { toast } from "sonner";

import { useAuthContext } from "../context/useAuthContext";
import { useDataContext } from "../context/useFetchDataContext";

import { clientUrl } from "../utils/urls";
import { clientsType } from "../utils/types";

export default function useMutateClient() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchClients } = useDataContext();

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

      if (response.ok) {
        toast.success("Client successfully registered");
        setOpenModal(false);
        fetchClients();
        setLoading(false);
      } else {
        console.error("Failed to send data to the server");
        toast.error("Error registering client");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error registering client");
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

      if (response.ok) {
        toast.success("Client successfully saved");
        fetchClients();
        setLoading(false);
        setOpenEditModal(false);
      } else {
        toast.error("Error updating client");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating client");
      setLoading(false);
    }
  };

  return { loading, createClient, editClient };
}
