import { createContext, useContext, useEffect, useState } from "react"
import { paymentType } from "../pages/payments"
import { paymentsUrl } from "../utils/urls"
import { useAuthContext } from "./useAuthContext"

type paymentContextType = {
    payments: paymentType[]
    loading: boolean
    fetchPayments: () => void
    error: string
}

export const PaymentContext = createContext({} as paymentContextType)

export const PaymentContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [payments, setPayments] = useState<paymentType[]>([])

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const { user } = useAuthContext()

    const fetchPayments = async () => {
        setLoading(true)
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
                setLoading(false);
            } else {
                setError('Error fetching payments')
                setLoading(false);
            }
        } catch (error) {
            setError('Error fetching payments')
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) fetchPayments()
    }, [user])

    return <PaymentContext.Provider value={{ payments, loading, fetchPayments, error }}>
        {children}
    </PaymentContext.Provider>
}

export const usePaymentContext = () => useContext(PaymentContext)
