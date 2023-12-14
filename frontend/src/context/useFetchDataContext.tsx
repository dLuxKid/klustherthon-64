import { createContext, useContext, useEffect, useState } from "react"

import { useAuthContext } from "./useAuthContext"

import { businessStaffType, clientsType, dataContextType, invoiceType, paymentType } from "../utils/types"
import { clientUrl, invoiceUrl, paymentsUrl, usersUrl } from "../utils/urls"

export const DataContext = createContext({} as dataContextType)

export const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [payments, setPayments] = useState<paymentType[]>([])
    const [isLoadingPayments, setIsLoadingPayments] = useState<boolean>(false)
    const [paymentsErrMsg, setPaymentsErrMsg] = useState<string>('')

    const [clients, setClients] = useState<clientsType[]>([])
    const [isLoadingClients, setIsLoadingClients] = useState<boolean>(false)
    const [clientsErrMsg, setClientsErrMsg] = useState<string>('')

    const [invoices, setInvoices] = useState<invoiceType[]>([])
    const [isLoadingInvoices, setIsLoadingInvoices] = useState<boolean>(false)
    const [invoicesErrMsg, setInvoicesErrMsg] = useState<string>('')

    const [businessStaffs, setBusinessStaffs] = useState<businessStaffType[]>([]);
    const [isLoadingBusinessStaffs, setIsLoadingBusinessStaffs] =
        useState<boolean>(false);
    const [businessStaffsErrMsg, setBusinessStaffsErrMsg] = useState<string>("");

    const { user } = useAuthContext()

    const fetchStaffs = async () => {
        setIsLoadingBusinessStaffs(true);
        setBusinessStaffs([]);
        try {
            const res = await fetch(
                `${usersUrl}/business/all-staff/${user.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            const data = await res.json();
            if (res.ok) {
                setBusinessStaffs(data);
                setIsLoadingBusinessStaffs(false);
            } else {
                setBusinessStaffsErrMsg(data.message);
                setIsLoadingBusinessStaffs(false);
            }
        } catch (error: any) {
            setBusinessStaffsErrMsg(error.message);
            setIsLoadingBusinessStaffs(false);
        }
    };

    const fetchInvoices = async () => {
        setIsLoadingInvoices(true)
        setInvoices([])
        try {
            const res = await fetch(`${invoiceUrl}/all-business/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await res.json()
            if (res.ok) {
                setInvoices(data)
                setIsLoadingInvoices(false)
            } else {
                setInvoicesErrMsg(data.message)
                setIsLoadingInvoices(false)
            }
        } catch (error) {
            setInvoicesErrMsg('Error fetching invoices')
            setIsLoadingInvoices(false)
        }
    }

    const fetchClients = async () => {
        setIsLoadingClients(true)
        setClients([])
        try {
            const res = await fetch(`${clientUrl}/all-business/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await res.json()

            if (res.ok) {
                setClients(data)
                setIsLoadingClients(false)
            } else {
                setClientsErrMsg(data.message)
                setIsLoadingClients(false)
            }
        } catch (error) {
            setClientsErrMsg('Error fetching clients')
            setIsLoadingClients(false)
        }
    }

    const fetchPayments = async () => {
        setIsLoadingPayments(true)
        setPayments([])
        try {
            const res = await fetch(`${paymentsUrl}/all-business/${user.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                })
            const data = await res.json()
            if (res.ok) {
                setPayments(data)
                setIsLoadingPayments(false);
            } else {
                setPaymentsErrMsg(data.message)
                setIsLoadingPayments(false);
            }
        } catch (error) {
            setPaymentsErrMsg('Error fetching payments')
            setIsLoadingPayments(false)
        }
    }

    useEffect(() => {
        if (user) {
            fetchClients()
            fetchInvoices()
            fetchPayments()
            fetchStaffs()
        }
    }, [user])

    return <DataContext.Provider
        value={{
            payments,
            invoices,
            clients,
            businessStaffs,
            isLoadingPayments,
            isLoadingInvoices,
            isLoadingClients,
            isLoadingBusinessStaffs,
            paymentsErrMsg,
            invoicesErrMsg,
            clientsErrMsg,
            businessStaffsErrMsg,
            fetchPayments,
            fetchInvoices,
            fetchClients,
            fetchStaffs
        }}
    >
        {children}
    </DataContext.Provider>
}

export const useDataContext = () => useContext(DataContext)
