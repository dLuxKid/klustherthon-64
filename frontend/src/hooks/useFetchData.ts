import useSWR from "swr";
import { useAuthContext } from "../context/useAuthContext";
import {
  businessStaffType,
  clientsType,
  invoiceType,
  paymentType,
} from "../utils/types";
import { clientUrl, invoiceUrl, paymentsUrl, usersUrl } from "../utils/urls";

export default function useFetchData() {
  const { user } = useAuthContext();

  const fetcher = async (url: string) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const fetchStaffs = () => {
    const { data, error, isLoading, mutate } = useSWR<
      businessStaffType[],
      string
    >(`${usersUrl}/business/all-staff/${user.id}`, fetcher);

    return { data, error, isLoading, mutate };
  };

  const fetchInvoices = () => {
    const { data, error, isLoading, mutate } = useSWR<invoiceType[], string>(
      `${invoiceUrl}/all-business/${user.id}`,
      fetcher
    );

    return { data, error, isLoading, mutate };
  };

  const fetchClients = () => {
    const { data, error, isLoading, mutate } = useSWR<clientsType[], string>(
      `${clientUrl}/all-business/${user.id}`,
      fetcher
    );

    return { data, error, isLoading, mutate };
  };

  const fetchPayments = () => {
    const { data, error, isLoading, mutate } = useSWR<paymentType[], string>(
      `${paymentsUrl}/all-business/${user.id}`,
      fetcher
    );

    return { data, error, isLoading, mutate };
  };

  return { fetchStaffs, fetchInvoices, fetchPayments, fetchClients };
}
