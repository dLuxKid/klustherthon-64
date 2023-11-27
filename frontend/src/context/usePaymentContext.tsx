import { createContext, useContext, useEffect, useState } from "react"
import { paymentType } from "../pages/payments"
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
            const res = await fetch('http://localhost:5000/api/payments/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}`
                },
                // body: JSON.stringify({
                //     'businessId': user.id
                // })
            })
            const data = await res.json()
            console.log(data)
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
        fetchPayments()
    }, [])

    return <PaymentContext.Provider value={{ payments, loading, fetchPayments, error }}>
        {children}
    </PaymentContext.Provider>
}

export const usePaymentContext = () => useContext(PaymentContext)
