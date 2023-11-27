import { useEffect, useState } from "react";
import CardWrapper from "../components/dashboard/card";
import LatestInvoices from "../components/dashboard/latest-invoices";
import { usePaymentContext } from "../context/usePaymentContext";
import { useAuthContext } from "../context/useAuthContext";
import { customerType } from "./customers";
import { invoiceType } from "../components/invoices/invoice-table";
import LatestPayments from "../components/dashboard/latest-payments";

export default function Dashboard() {
    const { payments } = usePaymentContext()

    const [customers, setCustomers] = useState<customerType[]>([])
    const [allInvoices, setAllInvoices] = useState<invoiceType[]>([])

    const { user } = useAuthContext()

    const fetchCustomers = async () => {
        setCustomers([])
        const res = await fetch(`http://localhost:5000/api/clients/all-business/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await res.json()

        if (res.ok) {
            setCustomers(data)
        }
    }

    const fetchInvoices = async () => {
        setAllInvoices([])
        const res = await fetch(`http://localhost:5000/api/invoices/all-business/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await res.json()
        if (res.ok) {
            setAllInvoices(data)
        }
    }

    useEffect(() => {
        fetchCustomers()
        fetchInvoices()
    }, [])

    return (
        <main>
            <h1 className={'text-black text-2xl font-semibold uppercase mb-4'}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <CardWrapper
                    customers={customers.length}
                    invoices={allInvoices.length}
                    payments={payments.length}
                />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <LatestInvoices invoices={allInvoices} />
                <LatestPayments payments={payments} />
            </div>
        </main>
    )
}
