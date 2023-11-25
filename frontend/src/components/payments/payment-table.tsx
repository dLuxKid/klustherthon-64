import { useEffect, useState } from "react";

import { toast } from "sonner";

import { DeleteBtn, UpdateBtn } from "../buttons";
import Loader from "../loader";

export default function PaymentTable() {

    const [payments, setPayments] = useState<{ _id: string, name: string, notes: string, amount: number, __v: number }[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
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
        })()
    }, [])

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                {
                    loading &&
                    <div className="w-full flex items-center justify-center pt-20">
                        <Loader dark />
                    </div>
                }

                {payments && !loading &&
                    <div className="rounded-lg bg-background p-2 md:pt-0">
                        <div className="md:hidden">
                            {payments?.map((payment) => (
                                <div
                                    key={payment._id}
                                    className="mb-2 w-full rounded-md bg-white p-4"
                                >
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{payment.name}</p>
                                            </div>
                                            <p className="text-sm text-text">{payment.notes}</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between pt-4">
                                        <p className="text-xl font-medium tex-text">
                                            {payment.amount}
                                        </p>
                                        <div className="flex justify-end gap-2">
                                            <UpdateBtn id={payment._id} />
                                            <DeleteBtn id={payment._id} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className="rounded-lg text-left text-sm font-normal">
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        About
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {payments?.map((payment, idx) => (
                                    <tr
                                        key={idx}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{payment.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {payment.notes}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {payment.amount}
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex justify-end gap-3">
                                                <UpdateBtn id={payment._id} />
                                                <DeleteBtn id={payment._id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}
