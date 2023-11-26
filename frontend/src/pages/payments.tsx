import { useEffect, useState } from "react";

import { CreateBtn } from "../components/buttons";
import CreateNewPayment from "../components/payments/create-payment";
import PaymentTable from "../components/payments/payment-table";
import Search from "../components/search";
import { toast } from "sonner";

export type paymentType = { _id: string, name: string, notes: string, amount: number, __v: number }

export default function Payments() {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const [payments, setPayments] = useState<paymentType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchPayments = async () => {
        setLoading(true)
        setPayments([])
        try {
            const res = await fetch('http://localhost:5000/api/payments/all')
            if (res.ok) {
                setPayments(await res.json())
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            } else {
                toast.error('Error fetching payments')
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            }
        } catch (error) {
            toast.error('Error fetching payments')
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    return (
        <div className="w-full">
            <div className="w-full" >
                <div className="flex w-full items-center justify-between">
                    <h1 className={'text-black text-2xl font-semibold uppercase'}>Payments</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search Payments..." />
                    <CreateBtn setOpenModal={setOpenModal} text="Create Payment" />
                </div>
                {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                        <Table query={query} currentPage={currentPage} />
                    </Suspense> */}
            </div >

            <PaymentTable payments={payments} loading={loading} fetchPayments={fetchPayments} />

            {openModal && <CreateNewPayment setOpenModal={setOpenModal} fetchPayments={fetchPayments} />}
        </div >
    )
}
