import React, { useEffect, useReducer, useState } from "react"

import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import { usePaymentContext } from "../../context/usePaymentContext";
import Loader from "../loader";
import { useAuthContext } from "../../context/useAuthContext";
import { invoiceUrl } from "../../utils/urls";

const initialState = {
    name: '',
    email: '',
    amount: '',
    paymentStatus: '',
    paymentType: 1,
    paymentInterval: 0,
    installmentalPaymentAmount: 0
}

const paymentStatus_options: Array<{ value: string, label: string }> = [
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
];

const paymentType_options: Array<{ value: number, label: string }> = [
    { value: 1, label: 'Single' },
    { value: 2, label: 'Installmentally' },
    { value: 3, label: 'Reoccurring' },
];

const invoiceReducer = (state: typeof initialState, action: { name: string, value: string | number }) => {
    return { ...state, [action.name]: action.value }
}

export default function CreateNewInvoice(
    { setOpenModal, fetchInvoices }:
        { setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, fetchInvoices: () => void }
) {
    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const { payments } = usePaymentContext()
    const { user } = useAuthContext()

    const createInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        if (!state.amount || !state.email || !state.name || !state.paymentStatus || !state.paymentType) {
            setLoading(false)
            return toast.error('Please fill all values')
        }

        try {
            const response = await fetch(invoiceUrl + '/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    "title": state.name,
                    "email": state.email,
                    "amount": Number(state.amount),
                    "paymentStatus": state.paymentStatus === 'paid' ? true : false,
                    "paymentType": (state.paymentType),
                    'installmentalAmount': Number(state.installmentalPaymentAmount),
                    'paymentInterval': Number(state.paymentInterval),
                    'staff': user.bid,
                    'business': user.id
                }),
            });

            if (response.ok) {
                toast.success('invoice successfully created')
                setOpenModal(false)
                fetchInvoices()
                setLoading(false)
            } else {
                setLoading(false)
                toast.error('Error creating invoice');
            }
        } catch (error) {
            console.error('Error sending data:', error);
            toast.error('Error creating invoice');
            setLoading(false)
        }
    };

    useEffect(() => {
        const amount = payments.find(i => i.name === state.name)?.amount.toString()
        dispatch({ name: 'amount', value: amount as string })
    }, [state.name])

    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/20 z-50 backdrop-blur-sm">
            <form onSubmit={createInvoice} className="form relative">
                <div className="absolute top-0 right-0 text-primary text-2xl cursor-pointer" onClick={() => setOpenModal(false)}>
                    <MdCancel />
                </div>
                <label>
                    <p>Name</p>
                    <select name="name" className="w-full" onChange={handleChange}>
                        <option value="">Select product..</option>
                        {payments.map((payment) => (
                            <option key={payment._id} value={payment.name} className="capitalize">
                                {payment.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <p>Customer email</p>
                    <input
                        required
                        type="email"
                        onChange={handleChange}
                        value={state.email}
                        name="email"
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
                        readOnly={state.paymentType !== 2}
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
                <label>
                    <p>Payment type</p>
                    <div className="flex items-start gap-2">
                        {
                            paymentType_options.map((item, i) => (
                                <div key={i} className="flex items-center justify-start gap-1">
                                    <div className="rounded-full w-4 h-4 overflow-hidden border border-black">
                                        <input
                                            type="radio"
                                            value={item.value}
                                            checked={state.paymentType === item.value}
                                            onChange={() => {
                                                dispatch({ name: 'paymentType', value: item.value })
                                                if (state.paymentType !== 1) dispatch({ name: 'paymentInterval', value: 1 })
                                            }}
                                            className="cursor-pointer appearance-none checked:bg-black checked:border-none focus:outline-none"
                                        />
                                    </div>
                                    <p className=" text-pure-black">{item.label}</p>
                                </div>

                            ))}
                    </div>
                    <div className="flex gap-4 items-center justify-start">
                        {state.paymentType !== 1 &&
                            <select value={state.paymentInterval} onChange={handleChange} name="paymentInterval" >
                                <option value={1}>Daily</option>
                                <option value={2}>Weekly</option>
                                <option value={3}>Monthly</option>
                                <option value={4}>Yearly</option>
                            </select>
                        }
                        {state.paymentType === 2 &&
                            <input
                                required
                                type="number"
                                onChange={handleChange}
                                value={state.installmentalPaymentAmount}
                                name="installmentalPaymentAmount"
                            />
                        }
                    </div>
                </label>

                <button
                    type="submit"
                    className="w-full bg-primary flex items-center justify-center hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
                    onClick={createInvoice}
                    disabled={loading}
                >
                    {loading ? <Loader /> : 'Create Invoice'}
                </button>
            </form>
        </div>
    )
}
