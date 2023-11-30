import { createContext, useContext, useEffect, useState } from "react"

import { useAuthContext } from "./useAuthContext"

import { clientUrl, invoiceUrl, paymentsUrl } from "../utils/urls"
import { clientsType, invoiceType, dataContextType, paymentType } from "../utils/types"

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

    const { user } = useAuthContext()

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
            console.log(error)
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
            console.log(error)
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
        }
    }, [user])

    return <DataContext.Provider
        value={{
            payments,
            invoices,
            clients,
            isLoadingPayments,
            isLoadingInvoices,
            isLoadingClients,
            paymentsErrMsg,
            invoicesErrMsg,
            clientsErrMsg,
            fetchPayments,
            fetchInvoices,
            fetchClients
        }}
    >
        {children}
    </DataContext.Provider>
}

export const useDataContext = () => useContext(DataContext)
