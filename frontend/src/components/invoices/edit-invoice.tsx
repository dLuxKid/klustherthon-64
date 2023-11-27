import React, { useReducer, useState } from "react";

import { MdCancel } from "react-icons/md";

import { toast } from "sonner";

import { invoiceType } from "./invoice-table";

import Loader from "../loader";
import { useAuthContext } from "../../context/useAuthContext";

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
    fetchInvoices: () => void
    invoice: invoiceType
}

const paymentStatus_options: Array<{ value: string, label: string }> = [
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
];

export default function EditInvoice({ setOpenEditModal, fetchInvoices, invoice }: Props) {
    const { user } = useAuthContext()

    const [state, dispatch] = useReducer(invoiceReducer, {
        name: invoice.title,
        email: invoice.client,
        amount: invoice.amount.toString(),
        paymentStatus: invoice.paymentStatus ? 'paid' : 'pending'
    })

    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const editInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        console.log(invoice)

        if (!state.amount || !state.email || !state.name || !state.paymentStatus) {
            setLoading(false)
            return toast.error('Please fill all values')
        }

        const apiUrl = `http://localhost:5000/api/invoices/update/${invoice._id}`
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    'id': invoice._id,
                    "title": state.name,
                    "email": state.email,
                    "amount": Number(state.amount),
                    "paymentStatus": state.paymentStatus === 'paid' ? true : false,
                    "paymentType": (invoice.paymentType),
                    'installmentalAmount': Number(invoice.installmentAmount),
                    'paymentInterval': Number(invoice.paymentInterval),
                    'staff': user.bid,
                    'business': user.id
                }),
            });

            if (response.ok) {
                toast.success('invoice successfully updated')
                setOpenEditModal(false)
                fetchInvoices()
                setLoading(false)
            } else {
                setLoading(false)
                toast.error('Error updating invoice');
            }
        } catch (error) {
            console.error('Error sending data:', error);
            toast.error('Error updating invoice');
            setLoading(false)
        }
    }

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
                <button
                    type="submit"
                    className="w-full bg-primary flex items-center justify-center hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
                    onClick={editInvoice}
                    disabled={loading}
                >
                    {loading ? <Loader /> : 'Save Invoice'}
                </button>
            </form>
        </div>
    )
}
