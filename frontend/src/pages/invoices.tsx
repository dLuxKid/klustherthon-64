import { useEffect, useState } from "react";

import { CreateBtn } from "../components/buttons";
import InvoicesTable from "../components/invoices/invoice-table";
import Search from "../components/search";
import CreateNewInvoice from "../components/invoices/create-invoice";
import { useAuthContext } from "../context/useAuthContext";
import { toast } from "sonner";


export default function Invoices() {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const [allInvoices, setAllInvoices] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { user } = useAuthContext()

    const fetchInvoices = async () => {
        setLoading(true)
        setAllInvoices([])
        try {
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
                setLoading(false)
            } else {
                toast.error('Error fetching invoices')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Error fetching invoices')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchInvoices()
    }, [])


    return (
        <main>
            <h1 className={'text-black text-2xl font-semibold uppercase'}>Invoices</h1>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateBtn setOpenModal={setOpenModal} text="Create Invoice" />
            </div>
            <InvoicesTable loading={loading} allInvoices={allInvoices} fetchInvoices={fetchInvoices} />
            {openModal && <CreateNewInvoice setOpenModal={setOpenModal} fetchInvoices={fetchInvoices} />}
        </main>

    )
}
