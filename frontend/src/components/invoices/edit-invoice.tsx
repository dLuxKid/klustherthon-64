import React, { useReducer, useState } from "react";

import { MdCancel } from "react-icons/md";

import { toast } from "sonner";

import { invoiceType } from "./invoice-table";

import Loader from "../loader";

type initialStateType = {
    name: string
    email: string,
    amount: string,
    paymentStatus: string
}

const invoiceReducer = (state: initialStateType, action: { name: string, value: string }) => {
    return { ...state, [action.name]: action.value }
}

type Props = {
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
    fetchPayments?: () => void
    invoice: invoiceType
}

const paymentStatus_options: Array<{ value: string, label: string }> = [
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
];

export default function EditInvoice({ setOpenEditModal, fetchPayments, invoice }: Props) {

    const [state, dispatch] = useReducer(invoiceReducer, {
        name: invoice.name,
        email: invoice.email,
        amount: invoice.amount.toString(),
        paymentStatus: invoice.status
    })

    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const editInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true)

        // if (!state.amount || !state.description || !state.name) {
        //     setLoading(false)
        //     return toast.error('Please fill all values')
        // }

        // const apiUrl = `http://localhost:5000/api/payments/${payment._id}/update`

        // try {
        //     const response = await fetch(apiUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             "name": state.name,
        //             "notes": state.description,
        //             "amount": Number(state.amount),
        //         }),
        //     });

        //     const data = await response.json()
        //     console.log(data)


        //     if (response.ok) {
        //         toast.success('Payment successfully updated')
        //         fetchPayments()
        //         setTimeout(() => {
        //             setLoading(false)
        //             setOpenEditModal(false)
        //         }, 500);
        //     } else {
        //         console.error('Failed to send data to the server');
        //         toast.error('Error updating payment');
        //         setTimeout(() => {
        //             setLoading(false)
        //         }, 500);
        //     }
        // } catch (error) {
        //     console.error('Error sending data:', error);
        //     toast.error('Error updating payment');
        //     setTimeout(() => {
        //         setLoading(false)
        //     }, 500);
        // }

        // setTimeout(() => {
        //     setLoading(false)
        // }, 500);
    };

    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/20 z-50 backdrop-blur-sm">
            <form onSubmit={editInvoice} className="form relative">
                <div className="absolute top-0 right-0 text-primary text-2xl cursor-pointer" onClick={() => setOpenEditModal(false)}>
                    <MdCancel />
                </div>
                <label>
                    <p>Name</p>
                    <input
                        required
                        type="name"
                        onChange={handleChange}
                        value={state.name}
                        name="name"
                        readOnly
                    />
                </label>
                <label>
                    <p>Email</p>
                    <input
                        required
                        type="email"
                        onChange={handleChange}
                        value={state.email}
                        name="email"
                        readOnly
                    />
                </label>
                <label >
                    <p>Amount</p>
                    <input
                        required
                        type="number"
                        onChange={handleChange}
                        value={state.amount}
                        name="amount"
                    />
                </label>
                <label>
                    <p>Payment status</p>
                    <div className="flex items-start gap-2">
                        {
                            paymentStatus_options.map((item, i) => (
                                <div key={i} className="flex items-center justify-start gap-1">
                                    <div className="rounded-full w-4 h-4 overflow-hidden border border-black">
                                        <input
                                            type="radio"
                                            value={item.value}
                                            checked={state.paymentStatus === item.value}
                                            onChange={() => dispatch({ name: 'paymentStatus', value: item.value })}
                                            className="cursor-pointer appearance-none checked:bg-black checked:border-none focus:outline-none"
                                        />
                                    </div>
                                    <p className=" text-pure-black">{item.label}</p>
                                </div>
                            ))}
                    </div>
                </label>
                <button type="submit" className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4" onClick={editInvoice}>Update Invoice</button>
            </form>
        </div>
    )
}
